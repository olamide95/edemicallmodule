// contexts/auth-provider.tsx
"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api } from '@/lib/api'

type User = {
  id: string
  email: string
  role: string
  tenantId?: string
}

type AuthContextType = {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const validateSession = async () => {
      try {
        const response = await api.getCurrentUser()
        if (response.success) {
          setUser(response.data.user)
        }
      } catch (error) {
        // Silent error - just means user isn't logged in
      } finally {
        setIsLoading(false)
      }
    }

    validateSession()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await api.login(email, password)
    if (!response.success) throw new Error(response.error || 'Login failed')
    setUser(response.data.user)
    router.push(response.data.user.role === 'admin' ? '/onboarding' : `/${response.data.user.role}/dashboard`)
  }

  const logout = async () => {
    await api.logout()
    setUser(null)
    router.push('/login')
  }

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout
    }}>
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