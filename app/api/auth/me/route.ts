// app/api/auth/me/route.ts
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET)

export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1] || 
                new URL(request.url).searchParams.get('token')

  if (!token) {
    return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { payload } = await jwtVerify(token, secret)
    return NextResponse.json({ 
      success: true, 
      user: { 
        id: payload.sub, 
        email: payload.email, 
        role: payload.role 
      } 
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Invalid token' }, { status: 401 })
  }
}