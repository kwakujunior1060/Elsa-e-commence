"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { SiteHeader } from "@/components/site-header"

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: "",
    general: "",
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const validateForm = () => {
    let valid = true
    const newErrors = { ...errors }

    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
      valid = false
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      newErrors.email = "Valid email is required"
      valid = false
    }

    // Validate password
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
      valid = false
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
      valid = false
    }

    // Validate terms acceptance
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions"
      valid = false
    }

    setErrors(newErrors)
    return valid
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsSubmitting(true)

      // Simulate form submission
      setTimeout(() => {
        console.log("Sign up form submitted:", formData)
        setIsSubmitting(false)

        // For demo purposes, show an error if the email contains "exists"
        if (formData.email.includes("exists")) {
          setErrors((prev) => ({ ...prev, email: "This email is already registered" }))
        } else {
          // Redirect would happen here in a real application
          window.location.href = "/"
        }
      }, 1500)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1 flex items-center justify-center bg-gradient-to-r from-amber-50 to-teal-50 py-12">
        <div className="container px-4 md:px-6">
          <div className="mx-auto grid w-full max-w-md gap-6">
            <div className="flex flex-col items-center space-y-2 text-center">
              <Image
                src="/elsa logo.png?height=100&width=100"
                width={100}
                height={100}
                alt="Elsa Skincare Logo"
                className="rounded-full"
              />
              <h1 className="text-3xl font-bold text-amber-900">Create an Account</h1>
              <p className="text-gray-500">Join Elsa Skincare for exclusive offers and skincare tips</p>
            </div>

            <Card className="w-full bg-mint">
              <CardHeader>
                <CardTitle className="text-xl text-amber-900">Sign Up</CardTitle>
                <CardDescription>Enter your information to create an account</CardDescription>
              </CardHeader>
              <CardContent>
                {errors.general && (
                  <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">{errors.general}</div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className={`pl-10 border-amber-200 focus-visible:ring-amber-700 ${errors.name ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.name && <p className="text-xs text-red-500">{errors.name}</p>}
                  </div>

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
                        className={`pl-10 border-amber-200 focus-visible:ring-amber-700 ${errors.email ? "border-red-500" : ""}`}
                      />
                    </div>
                    {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
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
                        className={`pl-10 border-amber-200 focus-visible:ring-amber-700 ${errors.password ? "border-red-500" : ""}`}
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
                    {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••••"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`pl-10 border-amber-200 focus-visible:ring-amber-700 ${errors.confirmPassword ? "border-red-500" : ""}`}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1 h-8 w-8 text-gray-400"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        <span className="sr-only">{showConfirmPassword ? "Hide password" : "Show password"}</span>
                      </Button>
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-red-500">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="accept-terms"
                        name="acceptTerms"
                        checked={formData.acceptTerms}
                        onCheckedChange={(checked) => {
                          setFormData((prev) => ({ ...prev, acceptTerms: checked === true }))
                          if (checked) {
                            setErrors((prev) => ({ ...prev, acceptTerms: "" }))
                          }
                        }}
                        className={errors.acceptTerms ? "border-red-500" : ""}
                      />
                      <Label htmlFor="accept-terms" className="text-sm leading-tight">
                        I agree to the{" "}
                        <Link href="/terms" className="font-medium text-amber-700 hover:underline">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="font-medium text-amber-700 hover:underline">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>
                    {errors.acceptTerms && <p className="text-xs text-red-500">{errors.acceptTerms}</p>}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-800 text-mint"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Create Account"}
                  </Button>
                </form>

                <div className="mt-6">
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="bg-mint px-2 text-gray-500">Or sign up with</span>
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
                  Already have an account?{" "}
                  <Link href="/sign-in" className="font-medium text-amber-700 hover:underline">
                    Sign in
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

