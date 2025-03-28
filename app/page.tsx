import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"
import { ProductCarousel } from "@/components/product-carousel"
import { CategoryGrid } from "@/components/category-grid"
import { Newsletter } from "@/components/newsletter"
import { SiteHeader } from "@/components/site-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-r from-amber-50 to-teal-50 py-20">
          <div className="container grid items-center gap-6 px-4 md:grid-cols-2 md:px-6 lg:gap-10">
            <div className="flex flex-col gap-4">
              <h1 className="animate-fade-in text-4xl font-bold tracking-tighter text-amber-900 sm:text-5xl md:text-6xl">
                Glow Naturally with Elsa Skincare
              </h1>
              <p className="animate-fade-in text-lg text-amber-800 [animation-delay:200ms]">
                Discover our premium skincare products made with natural ingredients to help you achieve radiant,
                healthy skin.
              </p>
              <div className="flex gap-4 animate-fade-in [animation-delay:400ms]">
                <Button size="lg" className="bg-amber-700 hover:bg-amber-800 text-mint">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative h-[350px] w-[350px] animate-fade-in overflow-hidden rounded-3x1 border-8 border-mint shadow-xl [animation-delay:600ms] md:h-[450px] md:w-[450px]" style={{ borderRadius: "30%" }}>
                <Image
                  src="/main.JPG?height=450&width=450"
                  alt="Elsa Skincare Products"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-pink-900 sm:text-4xl md:text-5xl">
                Featured Products
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Our most popular skincare products that customers love.
              </p>
            </div>
            <ProductCarousel />
          </div>
        </section>

        {/* Categories */}
        <section className="bg-gradient-to-r from-teal-50 to-amber-50 py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter text-amber-900 sm:text-4xl md:text-5xl">
                Shop by Category
              </h2>
              <p className="max-w-[700px] text-gray-500 md:text-xl">
                Find the perfect products for your skincare routine.
              </p>
            </div>
            <CategoryGrid />
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16">
          <div className="container px-4 md:px-6">
            <Newsletter />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-mint py-6 md:py-12">
        <div className="container flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/elsa logo.png?height=32&width=32" width={42} height={42} alt="Elsa Skincare Logo" />
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
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Elsa Skincare
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
                Elsa's Write
              </Link>
              <Link href="#" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
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
              <Link href="/contact" className="text-sm text-gray-500 transition-colors hover:text-amber-700">
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

