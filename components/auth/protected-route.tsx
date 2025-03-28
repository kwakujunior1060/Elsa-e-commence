"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { useAuth } from "./auth-provider"

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [hasCheckedAuth, setHasCheckedAuth] = useState(false)

  useEffect(() => {
    if (pathname === "/admin/login" || pathname === "/admin/reset-password") {
      setHasCheckedAuth(true)
      return
    }

    if (!isAuthenticated && !hasCheckedAuth) {
      setHasCheckedAuth(true)  // Ensures this check runs only once
      router.replace(`/admin/login?redirect=${encodeURIComponent(pathname)}`)
    } else if (isAuthenticated) {
      setHasCheckedAuth(true)
    }
  }, [isAuthenticated, pathname, router, hasCheckedAuth])

  if (!hasCheckedAuth) {
    return null  // Prevent rendering until authentication check is complete
  }

  return <>{children}</>
}
