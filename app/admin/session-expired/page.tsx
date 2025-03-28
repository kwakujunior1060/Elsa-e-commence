"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Clock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function SessionExpiredPage() {
  // Clear any remaining auth data on mount
  useEffect(() => {
    localStorage.removeItem("auth_token")
    localStorage.removeItem("auth_user")
    localStorage.removeItem("auth_expiry")
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-amber-50 to-teal-50">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md bg-mint shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <div className="rounded-full bg-amber-100 p-4">
                <Clock className="h-8 w-8 text-amber-700" />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-amber-900">Session Expired</CardTitle>
            <CardDescription>Your session has expired due to inactivity</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600 mb-6">
              For your security, we automatically log you out after 30 minutes of inactivity. Please log in again to
              continue managing your store.
            </p>
            <Button className="w-full bg-amber-700 hover:bg-amber-800 text-mint" asChild>
              <Link href="/admin/login">Log In Again</Link>
            </Button>
          </CardContent>
          <CardFooter className="border-t p-4 text-center text-sm text-gray-500">
            <p>
              Return to{" "}
              <Link href="/" className="font-medium text-amber-700 hover:underline">
                Website
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
      <footer className="border-t bg-mint py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Elsa Skincare. All rights reserved.
      </footer>
    </div>
  )
}

