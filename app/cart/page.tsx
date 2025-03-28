"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { toast } from "@/hooks/use-toast"

// Define the product type
interface Product {
  id: number
  name: string
  price: number
  quantity: number
  image: string
  category: string
}

// Sample product data (same as in shop page)
const productData = [
  {
    id: 1,
    name: "Hydrating Facial Cleanser",
    price: 24.99,
    rating: 4.8,
    image: "/placeholder.svg?height=400&width=400",
    category: "Cleansers",
  },
  {
    id: 2,
    name: "Vitamin C Brightening Serum",
    price: 39.99,
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=400",
    category: "Serums",
  },
  {
    id: 3,
    name: "Nourishing Night Cream",
    price: 34.99,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=400",
    category: "Moisturizers",
  },
  {
    id: 4,
    name: "Exfoliating Facial Scrub",
    price: 29.99,
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=400",
    category: "Exfoliators",
  },
  {
    id: 5,
    name: "Hyaluronic Acid Moisturizer",
    price: 44.99,
    rating: 4.9,
    image: "/placeholder.svg?height=400&width=400",
    category: "Moisturizers",
  },
  {
    id: 6,
    name: "Rose Water Toner",
    price: 19.99,
    rating: 4.5,
    image: "/placeholder.svg?height=400&width=400",
    category: "Toners",
  },
  {
    id: 7,
    name: "Retinol Anti-Aging Serum",
    price: 49.99,
    rating: 4.7,
    image: "/placeholder.svg?height=400&width=400",
    category: "Serums",
  },
  {
    id: 8,
    name: "Gentle Eye Cream",
    price: 32.99,
    rating: 4.6,
    image: "/placeholder.svg?height=400&width=400",
    category: "Eye Care",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [debug, setDebug] = useState<string>("")

  // Load cart items from localStorage
  useEffect(() => {
    const loadCart = () => {
      setIsLoading(true)
      try {
        // Get cart data from localStorage
        const savedCart = localStorage.getItem("cart")
        setDebug(`Raw localStorage data: ${savedCart}`)

        if (savedCart) {
          // Parse the cart data
          const cartData = JSON.parse(savedCart)

          // Map cart items to full product data
          const items = cartData
            .map((item: { id: number; quantity: number }) => {
              const product = productData.find((p) => p.id === item.id)
              if (!product) {
                console.warn(`Product with ID ${item.id} not found in product data`)
                return null
              }

              return {
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                quantity: item.quantity,
              }
            })
            .filter(Boolean)

          setCartItems(items)
          setDebug((prev) => `${prev}\nProcessed items: ${JSON.stringify(items)}`)
        } else {
          setCartItems([])
          setDebug((prev) => `${prev}\nNo cart data found in localStorage`)
        }
      } catch (error) {
        console.error("Error loading cart:", error)
        setCartItems([])
        setDebug((prev) => `${prev}\nError: ${error instanceof Error ? error.message : String(error)}`)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()

    // Listen for storage events (when cart is updated from another tab)
    window.addEventListener("storage", loadCart)

    return () => {
      window.removeEventListener("storage", loadCart)
    }
  }, [])

  // Update quantity of an item in the cart
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return

    const updatedItems = cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))

    setCartItems(updatedItems)

    // Update localStorage
    const cartData = updatedItems.map((item) => ({ id: item.id, quantity: item.quantity }))
    localStorage.setItem("cart", JSON.stringify(cartData))

    // Update cart count
    const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0)
    localStorage.setItem("cartCount", totalItems.toString())

    // Dispatch event to update header
    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Cart Updated",
      description: "Product quantity has been updated",
    })
  }

  // Remove an item from the cart
  const removeItem = (id: number) => {
    const updatedItems = cartItems.filter((item) => item.id !== id)

    setCartItems(updatedItems)

    // Update localStorage
    const cartData = updatedItems.map((item) => ({ id: item.id, quantity: item.quantity }))
    localStorage.setItem("cart", JSON.stringify(cartData))

    // Update cart count
    const totalItems = updatedItems.reduce((total, item) => total + item.quantity, 0)
    localStorage.setItem("cartCount", totalItems.toString())

    // Dispatch event to update header
    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Item Removed",
      description: "Product has been removed from your cart",
    })
  }

  // Calculate cart totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = cartItems.length > 0 ? 5.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="flex min-h-screen flex-col bg-mint">
      <SiteHeader />

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center gap-2">
            <Link href="/shop" className="text-sm font-medium text-amber-700 hover:underline">
              <ArrowLeft className="mr-1 inline-block h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
          <h1 className="mt-4 text-3xl font-bold text-amber-900">Your Cart</h1>

          {isLoading ? (
            <div className="mt-8 flex justify-center">
              <p>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="mt-8 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
              <ShoppingBag className="h-12 w-12 text-gray-400" />
              <h2 className="mt-4 text-xl font-semibold text-gray-900">Your cart is empty</h2>
              <p className="mt-2 text-center text-gray-500">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Button asChild className="mt-6 bg-amber-700 hover:bg-amber-800 text-mint">
                <Link href="/shop">Start Shopping</Link>
              </Button>

              {/* Debug information - remove in production */}
              {debug && (
                <div className="mt-8 w-full max-w-xl rounded border border-gray-300 bg-gray-50 p-4">
                  <h3 className="mb-2 font-medium">Debug Info:</h3>
                  <pre className="whitespace-pre-wrap text-xs">{debug}</pre>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Shopping Cart ({cartItems.length} items)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4">
                          <div className="relative h-20 w-20 overflow-hidden rounded-md">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-amber-900">{item.name}</h3>
                            <p className="text-sm text-gray-500">Unit Price: ${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                              <span className="sr-only">Decrease</span>
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                              <span className="sr-only">Increase</span>
                            </Button>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-amber-900">${(item.price * item.quantity).toFixed(2)}</p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="mt-1 h-8 text-gray-500 hover:text-red-500"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash className="mr-1 h-4 w-4" />
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-medium">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-amber-900">Total</span>
                        <span className="text-lg font-semibold text-amber-900">${total.toFixed(2)}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-700 hover:bg-amber-800 text-mint">Proceed to Checkout</Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-mint py-6 md:py-12">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Elsa Skincare. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

