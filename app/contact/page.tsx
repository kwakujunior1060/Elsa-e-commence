"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Mail, Phone, MapPin, Clock, Send, Instagram, Facebook, Twitter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SiteHeader } from "@/components/site-header"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      console.log("Form submitted:", formData)
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormData({ name: "", email: "", subject: "", message: "" })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 5000)
    }, 1500)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-teal-50 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-amber-900 sm:text-5xl md:text-6xl">
                Get In Touch
              </h1>
              <p className="mt-6 text-lg text-amber-800">
                We'd love to hear from you! Whether you have a question about our products, need skincare advice, or
                want to collaborate, our team is here to help.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 md:grid-cols-3">
              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Phone className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Call Us</h3>
                  <p className="mt-2 text-gray-600">Mon-Sat: 9am - 5pm </p>
                  <a href="tel:+233 55 194 1008" className="mt-2 text-amber-700 hover:underline">
                  +233 55 194 1008
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Mail className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Email Us</h3>
                  <p className="mt-2 text-gray-600">We'll respond within 24 hours</p>
                  <a href="mailto:hello@elsaskincare.com" className="mt-2 text-amber-700 hover:underline">
                    hello@elsaskincare.com
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <MapPin className="h-6 w-6 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Visit Us</h3>
                  <p className="mt-2 text-gray-600">
                    Accra, Ghana
                    <br />
                    Koforidua, E/R
                  </p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 text-amber-700 hover:underline"
                  >
                    Get Directions
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-gradient-to-r from-teal-50 to-amber-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Send Us a Message</h2>
                <p className="mt-4 text-gray-600">
                  Have a question or feedback? Fill out the form below and we'll get back to you as soon as possible.
                </p>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-amber-900">Business Hours</h3>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-700" />
                      <span className="text-gray-600">Monday - Friday: 9am - 5pm </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-700" />
                      <span className="text-gray-600">Saturday: 10am - 3pm </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-amber-700" />
                      <span className="text-gray-600">Sunday: Closed</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-bold text-amber-900">Follow Us</h3>
                  <div className="mt-4 flex gap-4">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-amber-100 p-3 text-amber-700 transition-colors hover:bg-amber-200"
                    >
                      <Instagram className="h-5 w-5" />
                      <span className="sr-only">Instagram</span>
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-amber-100 p-3 text-amber-700 transition-colors hover:bg-amber-200"
                    >
                      <Facebook className="h-5 w-5" />
                      <span className="sr-only">Facebook</span>
                    </a>
                    <a
                      href="https://twitter.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full bg-amber-100 p-3 text-amber-700 transition-colors hover:bg-amber-200"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    
                  </div>
                </div>
              </div>

              <Card className="bg-mint">
                <CardHeader>
                  <CardTitle>Contact Form</CardTitle>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <h3 className="text-lg font-medium text-green-800">Thank you for your message!</h3>
                      <p className="mt-2 text-green-700">
                        We've received your inquiry and will get back to you shortly.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Jane Doe"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="border-amber-200 focus-visible:ring-amber-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="jane@example.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="border-amber-200 focus-visible:ring-amber-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="Product Inquiry"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          className="border-amber-200 focus-visible:ring-amber-700"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Your Message</Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="How can we help you?"
                          rows={5}
                          required
                          value={formData.message}
                          onChange={handleChange}
                          className="border-amber-200 focus-visible:ring-amber-700"
                        />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-amber-700 hover:bg-amber-800 text-mint"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                        {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16">
  <div className="container px-4 md:px-6">
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Our Location</h2>
      <p className="mt-4 text-gray-600">Visit our flagship store and experience our products in person.</p>
    </div>
    <div className="mt-8 overflow-hidden rounded-lg border-4 border-mint">
      <div className="aspect-video relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8093952.298976792!2d-6.334754369213298!3d7.881972790093909!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfd75acda8dad6c7%3A0x54d7f230d093d236!2sGhana!5e0!3m2!1sen!2sgh!4v1739465439540!5m2!1sen!2sgh"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded-lg w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>
</section>


        {/* FAQ Section */}
        <section className="bg-gradient-to-r from-amber-50 to-teal-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Frequently Asked Questions</h2>
              <p className="mt-4 text-gray-600">
                Find quick answers to common questions about our products and services.
              </p>
              <Button asChild className="mt-6 bg-amber-700 hover:bg-amber-800 text-mint">
                <Link href="/faq">View All FAQs</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-mint py-6 md:py-12">
        <div className="container flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/elsa logo.png?height=42&width=42" width={32} height={32} alt="Elsa Skincare Logo" />
              <span className="text-xl font-semibold tracking-tight text-amber-700">Elsa Skincare</span>
            </Link>
            <p className="text-sm text-gray-500">Premium skincare products for a natural glow.</p>
          </div>
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-amber-900">Shop</h3>
              <Link href="/shop" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                All Products
              </Link>
              <Link href="/shop" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Skincare
              </Link>
              <Link href="/shop" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Elsa's Write
              </Link>
              <Link href="/shop" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Elsa's Gift
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-amber-900">Company</h3>
              <Link href="/about" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                About Us
              </Link>
              <Link href="/contact" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Contact
              </Link>

            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-amber-900">Support</h3>
              <Link href="/contact" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Help Center
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Shipping
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Returns
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                FAQ
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="font-medium text-amber-900">Legal</h3>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="container mt-6 border-t px-4 pt-6 md:px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Elsa Skincare. All rights reserved. <br/> Developed by <a href="http://linkedin.com/in/manuel-dofenyoh-junior-143557305"> Kwaku Junior</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

