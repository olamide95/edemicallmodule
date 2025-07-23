// contexts/auth-provider.tsx
"use client"
import { createContext, useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

type AuthContextType = {
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login with:', { email }) // Log input
      
      const response = await api.login(email, password)
      console.log('Raw API response:', response) // Log entire response
      
      if (!response.success) {
        console.error('Login failed:', response.error)
        throw new Error(response.error || 'Login failed')
      }

      if (!response.data) {
        console.warn('Login successful but no data received')
        throw new Error('No data received from server')
      }

      console.log('Login response data:', response.data) // Log successful data
      
      setIsAuthenticated(true)
      
      // Redirect based on role from the token
      const role = response.data.role
      console.log('Redirecting to:', role === 'admin' ? '/onboarding' : `/onboarding`)
      router.push(role === 'admin' ? '/onboarding' : `/onboarding`)
      
    } catch (error) {
      console.error('Login error:', error)
      throw error // Re-throw to be caught by the login page
    }
  }

  const logout = async () => {
    try {
      console.log('Attempting logout')
      const response = await api.logout()
      console.log('Logout response:', response)
      setIsAuthenticated(false)
      router.push('/login')
    } catch (error) {
      console.error('Logout error:', error)
      throw error
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}