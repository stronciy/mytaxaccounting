function makeId() {
  const g: any = globalThis as any
  if (g?.crypto && typeof g.crypto.randomUUID === 'function') return g.crypto.randomUUID()
  const rnd = Math.random().toString(36).slice(2)
  return `req_${Date.now()}_${rnd}`
}

function redactHeaders(headers: Headers) {
  const out: Record<string, string> = {}
  headers.forEach((v, k) => {
    const key = k.toLowerCase()
    if (key === 'authorization' || key === 'x-blaze-auth') {
      out[k] = 'REDACTED'
    } else {
      out[k] = v
    }
  })
  return out
}

export function makeRequestId() {
  return makeId()
}

function levelValue(l: string) {
  const map: Record<string, number> = { debug: 10, info: 20, warn: 30, error: 40 }
  return map[l.toLowerCase()] ?? 20
}

function currentLevel() {
  const lvl = (process.env.LOG_LEVEL || 'info').toLowerCase()
  if (lvl === 'verbose') return 'debug'
  return lvl
}

function serializeError(err: any) {
  if (!err) return undefined
  if (err instanceof Error) {
    return { type: err.name, message: err.message, stack: err.stack }
  }
  if (typeof err === 'object') {
    const type = err?.name || typeof err
    const message = typeof err?.message === 'string' ? err.message : String(err)
    const stack = typeof err?.stack === 'string' ? err.stack : undefined
    return { type, message, stack }
  }
  return { type: typeof err, message: String(err) }
}

function emit(level: 'DEBUG' | 'INFO' | 'WARN' | 'ERROR', event: string, data: Record<string, any>) {
  const cfgLevel = currentLevel()
  const shouldLog = levelValue(level.toLowerCase()) >= levelValue('error') || levelValue(level.toLowerCase()) >= levelValue(cfgLevel)
  if (!shouldLog) return
  const base: Record<string, any> = { level, timestamp: new Date().toISOString(), event }
  const entry: Record<string, any> = { ...base, ...data }
  const err = data?.error
  if (err && !data.stack) {
    const ser = serializeError(err)
    if (ser) {
      entry.error = ser.message
      if (ser.stack) entry.stack = ser.stack
      entry.errorType = ser.type
    }
  }
  const line = JSON.stringify(entry)
  if (level === 'ERROR') console.error(line)
  else if (level === 'WARN') console.warn(line)
  else console.log(line)
}

export function logDebug(event: string, data: Record<string, any>) {
  emit('DEBUG', event, data)
}

export function logInfo(event: string, data: Record<string, any>) {
  emit('INFO', event, data)
}

export function logWarn(event: string, data: Record<string, any>) {
  emit('WARN', event, data)
}

export function logError(event: string, data: Record<string, any>) {
  emit('ERROR', event, data)
}

export function sanitizeRequest(req: { method: string; url: string; headers: Headers }) {
  const url = new URL(req.url)
  return {
    method: req.method,
    path: url.pathname,
    search: url.search,
    headers: redactHeaders(req.headers),
  }
}
