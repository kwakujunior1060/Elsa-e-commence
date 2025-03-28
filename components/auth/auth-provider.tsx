"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"


// Define the authentication context type
interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string, remember: boolean) => Promise<boolean>
  logout: () => void
  resetInactivityTimer: () => void
}

// Define user type
interface User {
  id: number
  name: string
  email: string
  role: string
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  resetInactivityTimer: () => {},
})

// Hook to use the auth context
export const useAuth = () => useContext(AuthContext)

// Mock admin user for demo purposes
const MOCK_ADMIN = {
  id: 1,
  name: "Admin User",
  email: "admin@elsaskincare.com",
  role: "Admin",
}

// Auth provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [inactivityTimeout, setInactivityTimeout] = useState<ReturnType<typeof setTimeout> | null>(null)
  const router = useRouter()

  // Session timeout in milliseconds (30 minutes)
  const SESSION_TIMEOUT = 30 * 60 * 1000

  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("auth_token")
      const userData = localStorage.getItem("auth_user")

      if (token) {
        setIsAuthenticated(true)
        setUser(userData ? JSON.parse(userData) : MOCK_ADMIN)
        resetInactivityTimer()
      }
    }

    checkAuth()
  }, [])

  // Set up event listeners for user activity
  useEffect(() => {
    if (isAuthenticated) {
      const activityEvents = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

      const handleUserActivity = () => resetInactivityTimer()

      activityEvents.forEach(event => window.addEventListener(event, handleUserActivity))

      return () => {
        activityEvents.forEach(event => window.removeEventListener(event, handleUserActivity))
        if (inactivityTimeout) clearTimeout(inactivityTimeout)
      }
    }
  }, [isAuthenticated, inactivityTimeout])

  // Reset inactivity timer
  const resetInactivityTimer = () => {
    if (inactivityTimeout) clearTimeout(inactivityTimeout)

    const newTimeout = setTimeout(() => {
      logout()
      router.push("/admin/login?timeout=true")
    }, SESSION_TIMEOUT)

    setInactivityTimeout(newTimeout)
  }

  // Login function
  const login = async (email: string, password: string, remember: boolean): Promise<boolean> => {
    if (email === MOCK_ADMIN.email && password === "admin123") {
      setIsAuthenticated(true)
      setUser(MOCK_ADMIN)

      const expiryTime = remember ? 30 : 1
      const expiryDate = new Date()
      expiryDate.setDate(expiryDate.getDate() + expiryTime)

      localStorage.setItem("auth_token", "mock_jwt_token")
      localStorage.setItem("auth_user", JSON.stringify(MOCK_ADMIN))
      localStorage.setItem("auth_expiry", expiryDate.toISOString())

      resetInactivityTimer()
      return true
    }

    return false
  }

  // Logout function
  const logout = () => {
    setIsAuthenticated(false)
    setUser(null)

    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_expiry")

    if (inactivityTimeout) {
      clearTimeout(inactivityTimeout)
      setInactivityTimeout(null)
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, resetInactivityTimer }}>
      {children}
    </AuthContext.Provider>
  )
}
