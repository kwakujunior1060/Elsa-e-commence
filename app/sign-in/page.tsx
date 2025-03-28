"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Sign in form submitted:", formData)
      setIsSubmitting(false)

      // For demo purposes, show an error if the email contains "error"
      if (formData.email.includes("error")) {
        setError("Invalid email or password. Please try again.")
      } else {
        // Redirect would happen here in a real application
        window.location.href = "/"
      }
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-amber-50 to-teal-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid w-full max-w-sm gap-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Image
                src="/elsa logo.png?height=100&width=100"
                width={100}
                height={100}
                alt="Elsa Skincare Logo"
                className="rounded-full"
              />
              <h1 className="text-3xl font-bold text-amber-900">Sign In</h1>
              <p className="text-gray-500">Enter your email and password to access your account</p>
            </div>

            <Card className="w-full bg-mint">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900">Welcome back</CardTitle>
                <CardDescription>Sign in to your Elsa Skincare account</CardDescription>
              </CardHeader>
              <CardContent>
                {error && <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="pl-10 border-amber-200 focus-visible:ring-amber-700"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="password">Password</Label>
                      <Link href="/forgot-password" className="text-xs text-amber-700 hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="pl-10 border-amber-200 focus-visible:ring-amber-700"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-gray-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="remember-me"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, rememberMe: checked === true }))}
                    />
                    <Label htmlFor="remember-me" className="text-sm">
                      Remember me
                    </Label>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-mint"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Signing in..." : "Sign In"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-mint px-2 text-gray-500">Or continue with</span>
                    </div>
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <Button variant="outline" className="border-amber-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=G"
                        width={20}
                        height={20}
                        alt="Google logo"
                        className="mr-2"
                      />
                      Google
                    </Button>
                    <Button variant="outline" className="border-amber-200">
                      <Image
                        src="/placeholder.svg?height=20&width=20&text=F"
                        width={20}
                        height={20}
                        alt="Facebook logo"
                        className="mr-2"
                      />
                      Facebook
                    </Button>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-center">
                <p className="text-sm text-gray-500">
                  Don't have an account?{" "}
                  <Link href="/sign-up" className="font-medium text-amber-700 hover:underline">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>

      <footer className="border-t bg-mint py-6">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Elsa Skincare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

