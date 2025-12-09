import { randomUUID } from 'crypto'

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
  return randomUUID()
}

export function logInfo(event: string, data: Record<string, any>) {
  const entry = {
    level: 'INFO',
    timestamp: new Date().toISOString(),
    event,
    ...data,
  }
  console.log(JSON.stringify(entry))
}

export function logError(event: string, data: Record<string, any>) {
  const entry = {
    level: 'ERROR',
    timestamp: new Date().toISOString(),
    event,
    ...data,
  }
  console.error(JSON.stringify(entry))
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
