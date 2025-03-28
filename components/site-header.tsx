"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Menu, ShoppingBag } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileNav } from "@/components/mobile-nav"

export function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  // Update cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const count = localStorage.getItem("cartCount")
      setCartCount(count ? Number.parseInt(count) : 0)
    }

    // Initial load
    updateCartCount()

    // Listen for storage events (when cart is updated from another tab)
    window.addEventListener("storage", updateCartCount)

    // Custom event for cart updates within the same tab
    const handleCartUpdate = () => {
      updateCartCount()
    }
    window.addEventListener("cartUpdated", handleCartUpdate)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      window.removeEventListener("cartUpdated", handleCartUpdate)
    }
  }, [])

  return (
    <header className="sticky top-0 z-40 border-b bg-mint">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <Link href="/" className="flex items-center gap-2">
            <Image src="/placeholder.svg?height=32&width=32" width={32} height={32} alt="Elsa Skincare Logo" />
            <span className="text-xl font-semibold tracking-tight text-amber-700">Elsa Skincare</span>
          </Link>
        </div>
        <nav className="hidden gap-6 md:flex">
          <Link href="/" className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-700">
            Home
          </Link>
          <Link href="/shop" className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-700">
            Shop
          </Link>
          <Link href="/about" className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-700">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium text-amber-900 transition-colors hover:text-amber-700">
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative">
            <ShoppingBag className="h-6 w-6 text-amber-900 transition-colors hover:text-amber-700" />
            {cartCount > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-700 text-xs font-medium text-mint">
            {cartCount}
            </span>
             )}
          </Link>
          <Link href="/sign-in" passHref>
            <Button variant="outline" size="sm" className="hidden md:flex">
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up" passHref>
            <Button size="sm" className="hidden md:flex bg-amber-700 hover:bg-amber-800">
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <MobileNav isOpen={mobileMenuOpen} onOpenChange={setMobileMenuOpen} />
    </header>
  )
}

