import { NextRequest, NextResponse } from 'next/server'

function getOrigin(req: NextRequest) {
  const forwardedHost = req.headers.get('x-forwarded-host')
  const forwardedProto = req.headers.get('x-forwarded-proto') || 'https'
  return process.env.NEXT_PUBLIC_SITE_URL || (forwardedHost ? `${forwardedProto}://${forwardedHost}` : req.nextUrl.origin)
}

export async function GET(req: NextRequest) {
  const origin = getOrigin(req)
  const body = {
    name: 'My Tax Accounting',
    description: 'Site Description',
    url: origin,
    home: origin,
    namespaces: ['blaze/v1', 'wp/v2', 'batch/v1'],
    routes: {
      '/': {
        namespace: '',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'] }],
        _links: { self: [{ href: `${origin}/wp-json/` }] },
      },
      '/blaze/v1': {
        namespace: 'blaze/v1',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'] }],
        _links: { self: [{ href: `${origin}/wp-json/blaze/v1` }] },
      },
      '/blaze/v1/token': {
        namespace: 'blaze/v1',
        methods: ['POST'],
        endpoints: [{
          methods: ['POST'],
          args: {
            username: { required: true, type: 'string' },
            password: { required: true, type: 'string' },
          }
        }],
        _links: { self: [{ href: `${origin}/wp-json/blaze/v1/token` }] },
      },
      '/blaze/v1/can_publish': {
        namespace: 'blaze/v1',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'] }],
        _links: { self: [{ href: `${origin}/wp-json/blaze/v1/can_publish` }] },
      },
      '/wp/v2/posts': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'] },
          { methods: ['POST'] }
        ],
        _links: { self: [{ href: `${origin}/wp-json/wp/v2/posts` }] },
      },
      '/wp/v2/tags': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'] },
          { methods: ['POST'] }
        ],
        _links: { self: [{ href: `${origin}/wp-json/wp/v2/tags` }] },
      },
      '/wp/v2/categories': {
        namespace: 'wp/v2',
        methods: ['GET', 'POST'],
        endpoints: [
          { methods: ['GET'] },
          { methods: ['POST'] }
        ],
        _links: { self: [{ href: `${origin}/wp-json/wp/v2/categories` }] },
      },
      '/batch/v1': {
        namespace: 'batch/v1',
        methods: ['POST'],
        endpoints: [{ methods: ['POST'] }],
        _links: { self: [{ href: `${origin}/wp-json/batch/v1` }] },
      },
    },
    authentication: {},
  }
  return NextResponse.json(body, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    },
  })
}

export async function HEAD() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
    },
  })
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,HEAD',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-blaze-auth',
      'Access-Control-Max-Age': '86400',
    },
  })
}