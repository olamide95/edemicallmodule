import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { authenticateUser } from '@/lib/api'

export async function POST(request: Request) {
  try {
    const { email, password, role } = await request.json()

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      )
    }

    // Authenticate user
    const user = await authenticateUser(email, password)
    
    // Verify role matches
    if (user.role !== role) {
      return NextResponse.json(
        { success: false, message: `Please login using the ${user.role} tab` },
        { status: 403 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: user.id,
        tenantId: user.tenantId,
        role: user.role,
      },
      process.env.JWT_SECRET!,
      { expiresIn: '1d' }
    )

    const response = NextResponse.json({
      success: true,
      message: 'Login successful'
    })

    // Set secure cookies
    response.cookies.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    response.cookies.set({
      name: 'tenantId',
      value: user.tenantId,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24,
      path: '/',
    })

    return response

  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Authentication failed'
      },
      { status: 401 }
    )
  }
}