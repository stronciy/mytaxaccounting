import initSqlJs, { Database, Statement } from 'sql.js'
import { logInfo, logError, logDebug, logWarn } from '@/lib/logger'
import { promises as fs } from 'fs'
import path from 'path'

const DB_PATH = path.join(process.cwd(), 'data', 'app.sqlite')
let dbPromise: Promise<Database> | null = null

function resolveDistFile(rel: string) {
  try {
    // Prefer absolute path from node_modules
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return require.resolve(rel)
  } catch {
    return path.join(process.cwd(), 'node_modules', rel)
  }
}

async function ensureDir() {
  await fs.mkdir(path.dirname(DB_PATH), { recursive: true })
}

async function pathExists(p: string) {
  try {
    await fs.stat(p)
    return true
  } catch {
    return false
  }
}

export async function getStorageHealth() {
  const dir = path.dirname(DB_PATH)
  const dirExists = await pathExists(dir)
  let canWriteDir = false
  try {
    await fs.access(dir, (fs as any).constants.W_OK)
    canWriteDir = true
  } catch {
    canWriteDir = false
  }
  const fileExists = await pathExists(DB_PATH)
  let canWriteFile = false
  try {
    if (fileExists) await fs.access(DB_PATH, (fs as any).constants.W_OK)
    canWriteFile = fileExists ? true : canWriteDir
  } catch {
    canWriteFile = false
  }
  const tmpPath = path.join(dir, '.healthcheck.tmp')
  let tempWriteOk = false
  let tempWriteError: string | undefined
  try {
    await fs.writeFile(tmpPath, Buffer.from('ok'), { flag: 'w' })
    tempWriteOk = true
  } catch (e: any) {
    tempWriteError = String(e?.message || e)
  } finally {
    try { await fs.unlink(tmpPath) } catch {}
  }
  const snapshot = { dir, dirExists, canWriteDir, file: DB_PATH, fileExists, canWriteFile, tempWriteOk, tempWriteError }
  logInfo('db.storage.health', snapshot)
  return snapshot
}

async function persist(db: Database) {
  await ensureDir()
  await getStorageHealth()
  const data = db.export()
  const buf = Buffer.from(data)
  const MAX = 3
  let attempt = 0
  while (true) {
    try {
      await fs.writeFile(DB_PATH, buf)
      if (attempt > 0) logInfo('db.persist.retry_success', { attempts: attempt })
      break
    } catch (e: any) {
      const code = e?.code
      logError('db.persist.error', { error: e, code, attempt })
      if (attempt >= MAX) throw e
      const delay = Math.pow(3, attempt) * 100
      logWarn('db.persist.retry', { attempt: attempt + 1, delay })
      await new Promise((r) => setTimeout(r, delay))
      attempt++
      continue
    }
  }
}

export async function getDb() {
  if (!dbPromise) {
    dbPromise = (async () => {
      const SQL = await initSqlJs({ locateFile: (file) => resolveDistFile(`sql.js/dist/${file}`) })
      let db: Database
      try {
        const file = await fs.readFile(DB_PATH)
        db = new SQL.Database(file)
      } catch {
        db = new SQL.Database()
      }
      db.exec(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS posts (
          id INTEGER PRIMARY KEY,
          slug TEXT UNIQUE,
          title TEXT,
          content TEXT,
          excerpt TEXT,
          status TEXT,
          published_at TEXT,
          author_id INTEGER
        );
        CREATE TABLE IF NOT EXISTS tags (
          id INTEGER PRIMARY KEY,
          name TEXT,
          slug TEXT UNIQUE,
          description TEXT
        );
        CREATE TABLE IF NOT EXISTS categories (
          id INTEGER PRIMARY KEY,
          name TEXT,
          slug TEXT UNIQUE,
          description TEXT
        );
        CREATE TABLE IF NOT EXISTS post_tags (
          post_id INTEGER,
          tag_id INTEGER,
          PRIMARY KEY(post_id, tag_id)
        );
        CREATE TABLE IF NOT EXISTS post_categories (
          post_id INTEGER,
          category_id INTEGER,
          PRIMARY KEY(post_id, category_id)
        );
      `)
      await persist(db)
      return db
    })()
  }
  return dbPromise!
}

export async function upsertTag({ name, slug, description = '' }: { name: string; slug: string; description?: string }) {
  const db = await getDb()
  logInfo('db.tags.upsert.start', { name, slug })
  const select = db.prepare('SELECT id FROM tags WHERE slug = ?')
  select.bind([slug])
  const row = select.step() ? select.getAsObject() : null
  select.free()
  if (row && typeof row.id === 'number') return row.id as number
  const insert = db.prepare('INSERT INTO tags(name, slug, description) VALUES(?,?,?)')
  insert.run([name, slug, description])
  insert.free()
  const lastIdStmt = db.prepare('SELECT last_insert_rowid() AS id')
  lastIdStmt.step()
  const id = (lastIdStmt.getAsObject().id as number) || 0
  lastIdStmt.free()
  await persist(db)
  logInfo('db.tags.upsert.done', { id, slug })
  return id
}

export async function upsertCategory({ name, slug, description = '' }: { name: string; slug: string; description?: string }) {
  const db = await getDb()
  logInfo('db.categories.upsert.start', { name, slug })
  const select = db.prepare('SELECT id FROM categories WHERE slug = ?')
  select.bind([slug])
  const row = select.step() ? select.getAsObject() : null
  select.free()
  if (row && typeof row.id === 'number') return row.id as number
  const insert = db.prepare('INSERT INTO categories(name, slug, description) VALUES(?,?,?)')
  insert.run([name, slug, description])
  insert.free()
  const lastIdStmt = db.prepare('SELECT last_insert_rowid() AS id')
  lastIdStmt.step()
  const id = (lastIdStmt.getAsObject().id as number) || 0
  lastIdStmt.free()
  await persist(db)
  logInfo('db.categories.upsert.done', { id, slug })
  return id
}

export async function insertPost({ title, content, excerpt = '', slug, status = 'publish', publishedAt, authorId = 1, tagsIds = [], categoriesIds = [] }: {
  title: string
  content: string
  excerpt?: string
  slug: string
  status?: string
  publishedAt: string
  authorId?: number
  tagsIds?: number[]
  categoriesIds?: number[]
}) {
  const db = await getDb()
  logInfo('db.posts.insert.start', { slug, status, tagsCount: tagsIds.length, categoriesCount: categoriesIds.length })
  let currentSlug = slug
  let inserted = false
  while (!inserted) {
    try {
      const stmt = db.prepare('INSERT INTO posts(title, content, excerpt, slug, status, published_at, author_id) VALUES(?,?,?,?,?,?,?)')
      stmt.run([title, content, excerpt, currentSlug, status, publishedAt, authorId])
      stmt.free()
      inserted = true
    } catch (e: any) {
      const msg = String(e?.message || e)
      logError('db.posts.insert.error', { slug: currentSlug, error: e })
      if (msg.includes('UNIQUE') && msg.toLowerCase().includes('posts.slug')) {
        currentSlug = `${slug}-${Math.random().toString(36).slice(2, 6)}`
        continue
      }
      throw e
    }
  }
  const lastIdStmt = db.prepare('SELECT last_insert_rowid() AS id')
  lastIdStmt.step()
  const id = (lastIdStmt.getAsObject().id as number) || 0
  lastIdStmt.free()

  if (Array.isArray(tagsIds) && tagsIds.length) {
    const tStmt = db.prepare('INSERT OR IGNORE INTO post_tags(post_id, tag_id) VALUES(?, ?)')
    for (const tid of tagsIds) tStmt.run([id, tid])
    tStmt.free()
    logInfo('db.posts.link.tags', { postId: id, tagsIds })
  }
  if (Array.isArray(categoriesIds) && categoriesIds.length) {
    const cStmt = db.prepare('INSERT OR IGNORE INTO post_categories(post_id, category_id) VALUES(?, ?)')
    for (const cid of categoriesIds) cStmt.run([id, cid])
    cStmt.free()
    logInfo('db.posts.link.categories', { postId: id, categoriesIds })
  }

  await persist(db)
  logInfo('db.posts.insert.done', { id, slug: currentSlug })
  return id
}

export async function getPostsFromDb({ page = 1, perPage = 10, slug }: { page?: number; perPage?: number; slug?: string | null }) {
  const db = await getDb()
  const offset = (page - 1) * perPage
  let rows: Array<{ id: number; title: string; content: string; excerpt: string; slug: string; status: string; published_at: string }>
  if (slug) {
    const stmt = db.prepare('SELECT id, title, content, excerpt, slug, status, published_at FROM posts WHERE slug = ? ORDER BY published_at DESC LIMIT ? OFFSET ?')
    stmt.bind([slug, perPage, offset])
    rows = []
    while (stmt.step()) rows.push(stmt.getAsObject() as any)
    stmt.free()
  } else {
    const stmt = db.prepare('SELECT id, title, content, excerpt, slug, status, published_at FROM posts ORDER BY published_at DESC LIMIT ? OFFSET ?')
    stmt.bind([perPage, offset])
    rows = []
    while (stmt.step()) rows.push(stmt.getAsObject() as any)
    stmt.free()
  }
  return rows
}
