import initSqlJs, { Database, Statement } from 'sql.js'
import { logInfo, logError } from '@/lib/logger'
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

async function persist(db: Database) {
  await ensureDir()
  try {
    const data = db.export()
    await fs.writeFile(DB_PATH, Buffer.from(data))
  } catch (e: any) {
    logError('db.persist.error', { error: String(e?.message || e) })
    throw e
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
  const stmt = db.prepare('INSERT INTO posts(title, content, excerpt, slug, status, published_at, author_id) VALUES(?,?,?,?,?,?,?)')
  stmt.run([title, content, excerpt, slug, status, publishedAt, authorId])
  stmt.free()
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
  logInfo('db.posts.insert.done', { id, slug })
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
