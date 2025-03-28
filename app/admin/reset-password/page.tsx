"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Mail, AlertCircle, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      // In a real app, this would call your password reset API
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, always succeed
      setIsSubmitted(true)
    } catch (err) {
      setError("An error occurred. Please try again.")
      console.error("Password reset error:", err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-r from-amber-50 to-teal-50">
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md bg-mint shadow-lg">
          <CardHeader className="space-y-2 text-center">
            <div className="flex justify-center mb-2">
              <Image
                src="/placeholder.svg?height=64&width=64"
                width={64}
                height={64}
                alt="Elsa Skincare Logo"
                className="rounded-full"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-amber-900">Reset Password</CardTitle>
            <CardDescription>
              {isSubmitted
                ? "Check your email for reset instructions"
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                <span>{error}</span>
              </div>
            )}

            {isSubmitted ? (
              <div className="flex flex-col items-center justify-center space-y-4 py-4">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-4">
                    We've sent a password reset link to <strong>{email}</strong>. Please check your email and follow the
                    instructions to reset your password.
                  </p>
                  <p className="text-sm text-gray-500">
                    If you don't receive an email within a few minutes, check your spam folder or try again.
                  </p>
                </div>
<Button
  type="button" // Ensure this is a button type to prevent form submission
  className="mt-4 bg-amber-700 hover:bg-amber-800 text-mint"
  onClick={() => setIsSubmitted(false)}
>

                  Try Again
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@elsaskincare.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 border-amber-200 focus-visible:ring-amber-700"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-700 hover:bg-amber-800 text-mint"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Sending..." : "Send Reset Link"}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t p-4">
            <Button variant="ghost" size="sm" className="w-full" asChild>
              <Link href="/admin/login">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
      <footer className="border-t bg-mint py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Elsa Skincare. All rights reserved.
      </footer>
    </div>
  )
}
