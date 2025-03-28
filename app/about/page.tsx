import Image from "next/image"
import Link from "next/link"
import { Check, Leaf, Heart, Shield, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { SiteHeader } from "@/components/site-header"

// Sample team members data
const teamMembers = [
  {
    name: "Akosuah Elsa",
    role: "Founder & CEO",
    bio: "With over 10 years in skincare formulation, Elsa founded the company with a vision to create natural products that truly work.",
    image: "/elsa.JPG?height=300&width=300",
  },
  {
    name: "Michael ",
    role: "Head of Product Development",
    bio: "Michael brings his background in biochemistry to develop innovative formulas that are both effective and gentle on skin.",
    image: "/team1.JPG?height=300&width=300",
  },
  {
    name: "Sarah Williams",
    role: "Sustainability Director",
    bio: "Sarah ensures all our products and packaging meet the highest environmental standards without compromising quality.",
    image: "/team2.JPG?height=300&width=300",
  },
  {
    name: "David Rodriguez",
    role: "Chief Marketing Officer",
    bio: "David's passion for authentic storytelling helps us connect with customers who share our values.",
    image: "/team1.JPG?height=300&width=300",
  },
]

// Sample testimonials data
const testimonials = [
  {
    quote: "Elsa Skincare products transformed my skin. I've never felt more confident and radiant!",
    author: "Jessica T.",
    rating: 5,
  },
  {
    quote: "I love that I can trust the ingredients in these products. My sensitive skin has never looked better.",
    author: "Marcus L.",
    rating: 5,
  },
  {
    quote: "The commitment to sustainability alongside effective formulas makes this my go-to skincare brand.",
    author: "Aisha K.",
    rating: 5,
  },
]

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-teal-50 py-20">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-bold tracking-tighter text-amber-900 sm:text-5xl md:text-6xl">Our Story</h1>
              <p className="mt-6 text-lg text-amber-800">
                Founded with a passion for natural skincare, Elsa Skincare is committed to creating products that
                enhance your natural beauty while respecting our planet.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:items-center">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <Image
                  src="/elsa.JPG?height=600&width=600"
                  alt="Natural skincare ingredients"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Our Mission</h2>
                <p className="text-gray-600">
                  At Elsa Skincare, we believe that skincare should be effective, natural, and sustainable. Our mission
                  is to create products that not only deliver visible results but also respect your skin and our
                  environment.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-1">
                      <Check className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">Clean Ingredients</h3>
                      <p className="text-sm text-gray-500">
                        We use only natural, ethically sourced ingredients that are safe for all skin types.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-1">
                      <Check className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">Cruelty-Free</h3>
                      <p className="text-sm text-gray-500">
                        We never test on animals and work only with suppliers who share this commitment.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-amber-100 p-1">
                      <Check className="h-5 w-5 text-amber-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-amber-900">Sustainable Packaging</h3>
                      <p className="text-sm text-gray-500">
                        Our packaging is recyclable, biodegradable, or reusable to minimize environmental impact.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-gradient-to-r from-teal-50 to-amber-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Our Values</h2>
              <p className="mt-4 text-gray-600">
                These core principles guide everything we do, from product development to customer service.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Leaf className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Sustainability</h3>
                  <p className="mt-2 text-gray-600">
                    We're committed to minimizing our environmental footprint through responsible sourcing and
                    eco-friendly practices.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Heart className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Compassion</h3>
                  <p className="mt-2 text-gray-600">
                    We treat our customers, partners, and planet with care and respect, ensuring our business practices
                    reflect our values.
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-mint">
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Shield className="h-8 w-8 text-amber-700" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-amber-900">Transparency</h3>
                  <p className="mt-2 text-gray-600">
                    We believe in being open about our ingredients, processes, and business practices to build trust
                    with our community.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-amber-900">Meet Our Team</h2>
              <p className="mt-4 text-gray-600">
                The passionate individuals behind Elsa Skincare who work tirelessly to bring you the best natural
                skincare products.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {teamMembers.map((member, index) => (
                <div key={index} className="group relative overflow-hidden rounded-lg">
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent p-6 flex flex-col justify-end text-white">
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-amber-200">{member.role}</p>
                    <p className="mt-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="bg-gradient-to-r from-amber-50 to-teal-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-amber-900">What Our Customers Say</h2>
              <p className="mt-4 text-gray-600">
                Don't just take our word for it. Here's what people who use our products have to say.
              </p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-mint">
                  <CardContent className="p-6">
                    <div className="flex mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < testimonial.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="italic text-gray-600">"{testimonial.quote}"</p>
                    <p className="mt-4 font-medium text-amber-900">— {testimonial.author}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="rounded-lg bg-gradient-to-r from-amber-100 to-teal-100 p-8 md:p-12">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="text-3xl font-bold tracking-tighter text-amber-900">
                  Experience the Elsa Skincare Difference
                </h2>
                <p className="mt-4 text-amber-800">
                  Join thousands of satisfied customers who have transformed their skincare routine with our natural,
                  effective products.
                </p>
                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/shop">
                  <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-mint">
                    Shop Our Products
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                    Contact Us
                  </Button>
                </Link>     
                </div>
              </div>
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

