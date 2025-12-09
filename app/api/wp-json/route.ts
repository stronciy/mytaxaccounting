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
    description: 'Your Site',
    url: origin,
    home: origin,
    namespaces: ['blaze/v1'],
    routes: {
      '/blaze/v1': {
        namespace: 'blaze/v1',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'] }],
      },
      '/blaze/v1/token': {
        namespace: 'blaze/v1',
        methods: ['POST'],
        endpoints: [{ methods: ['POST'] }],
      },
      '/blaze/v1/can_publish': {
        namespace: 'blaze/v1',
        methods: ['GET'],
        endpoints: [{ methods: ['GET'] }],
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
