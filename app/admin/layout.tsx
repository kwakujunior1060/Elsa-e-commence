"use client"

import type React from "react"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import { AuthProvider } from "@/components/auth/auth-provider"
import ProtectedRoute from "@/components/auth/protected-route"
import { useAuth } from "@/components/auth/auth-provider"

// Session activity tracker component
function SessionTracker() {
  const { resetInactivityTimer } = useAuth()
  const pathname = usePathname()

  // Reset inactivity timer on route changes
  useEffect(() => {
    resetInactivityTimer()
  }, [pathname, resetInactivityTimer])

  return null
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ProtectedRoute>
        <SessionTracker />
        {children}
      </ProtectedRoute>
    </AuthProvider>
  )
}

