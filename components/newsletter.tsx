"use client"

import { useState } from "react"
import { Send } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      // Here you would typically send the email to your API
      console.log("Subscribing email:", email)
      setSubmitted(true)
      setEmail("")
      setTimeout(() => setSubmitted(false), 3000)
    }
  }

  return (
    <div className="rounded-lg bg-gradient-to-r from-amber-100 to-teal-100 p-8 md:p-12">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-bold text-amber-900 md:text-3xl">Subscribe to Our Newsletter</h2>
        <p className="mt-4 text-amber-800">
          Stay updated with our latest products, skincare tips, and exclusive offers.
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row sm:gap-0">
          <Input
            type="email"
            placeholder="Enter your email"
            className="h-12 flex-1 rounded-l-md border-amber-200 bg-mint focus-visible:ring-amber-700"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button type="submit" className="h-12 rounded-l-none bg-amber-700 hover:bg-amber-800 text-mint">
            {submitted ? "Subscribed!" : "Subscribe"}
            {!submitted && <Send className="ml-2 h-4 w-4" />}
          </Button>
        </form>
      </div>
    </div>
  )
}

