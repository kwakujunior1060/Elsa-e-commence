"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Filter, Star, ShoppingBag, Check } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { SiteHeader } from "@/components/site-header"
import { toast } from "@/hooks/use-toast"

// Sample product data
const products = [
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

// Get unique categories
const categories = [...new Set(products.map((product) => product.category))]

// Price ranges
const priceRanges = [
  { id: "price-0-25", label: "$0 - $25", min: 0, max: 25 },
  { id: "price-25-50", label: "$25 - $50", min: 25, max: 50 },
  { id: "price-50-100", label: "$50 - $100", min: 50, max: 100 },
  { id: "price-100-plus", label: "$100+", min: 100, max: Number.POSITIVE_INFINITY },
]

export default function ShopPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialCategory = searchParams.get("category")

  // State for filters
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [initialCategory] : [])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])

  // State for cart
  const [cart, setCart] = useState<{ id: number; quantity: number }[]>([])
  const [addedToCart, setAddedToCart] = useState<number | null>(null)

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    // Filter by category
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false
    }

    // Filter by price range
    if (selectedPriceRanges.length > 0) {
      const inPriceRange = selectedPriceRanges.some((rangeId) => {
        const range = priceRanges.find((r) => r.id === rangeId)
        if (range) {
          return product.price >= range.min && product.price <= range.max
        }
        return false
      })
      if (!inPriceRange) return false
    }

    return true
  })

  // State for sort option
  const [sortOption, setSortOption] = useState("featured")

  // Sort products

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.price - b.price
      case "price-high-low":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return 0 // Featured - no specific sort
    }
  })

  // Handle category filter change
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

  // Handle price range filter change
  const handlePriceRangeChange = (rangeId: string, checked: boolean) => {
    if (checked) {
      setSelectedPriceRanges([...selectedPriceRanges, rangeId])
    } else {
      setSelectedPriceRanges(selectedPriceRanges.filter((r) => r !== rangeId))
    }
  }

  // Apply filters
  const applyFilters = () => {
    toast({
      title: "Filters Applied",
      description: `Showing ${sortedProducts.length} products`,
    })
  }

  // Add to cart functionality
  const addToCart = (productId: number) => {
    // Check if product is already in cart
    const existingItem = cart.find((item) => item.id === productId)

    let updatedCart
    if (existingItem) {
      // Update quantity if already in cart
      updatedCart = cart.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item))
    } else {
      // Add new item to cart
      updatedCart = [...cart, { id: productId, quantity: 1 }]
    }

    setCart(updatedCart)

    // Show visual feedback
    setAddedToCart(productId)
    setTimeout(() => setAddedToCart(null), 2000)

    // Update localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart))

    // Update cart count in localStorage for persistence
    const totalItems = updatedCart.reduce((total, item) => total + item.quantity, 0)
    localStorage.setItem("cartCount", totalItems.toString())

    // Dispatch events to update UI
    window.dispatchEvent(new Event("cartUpdated"))
    window.dispatchEvent(new Event("storage"))

    // Show toast notification
    toast({
      title: "Added to Cart",
      description: "Product has been added to your cart",
    })
  }

  // Initialize from URL params
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategories([initialCategory])
    }

    // Load cart from localStorage
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error("Error loading cart from localStorage", e)
      }
    }
  }, [initialCategory])


  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <div className="container px-4 py-8 md:px-6 md:py-12">
          <div className="flex flex-col gap-8 md:flex-row">
            {/* Sidebar Filters */}
            <div className="w-full md:w-64">
              <div className="sticky top-24 rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-amber-900">Filters</h2>
                  <Filter className="h-5 w-5 text-amber-700" />
                </div>
                <Separator className="my-4" />
                <div className="space-y-4">
                  <div>
                    <h3 className="mb-2 font-medium text-amber-900">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={(checked) => handleCategoryChange(category, checked === true)}
                          />
                          <Label htmlFor={`category-${category}`} className="text-sm">
                            {category}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <h3 className="mb-2 font-medium text-amber-900">Price Range</h3>
                    <div className="space-y-2">
                      {priceRanges.map((range) => (
                        <div key={range.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={range.id}
                            checked={selectedPriceRanges.includes(range.id)}
                            onCheckedChange={(checked) => handlePriceRangeChange(range.id, checked === true)}
                          />
                          <Label htmlFor={range.id} className="text-sm">
                            {range.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Separator />
                  <Button className="w-full bg-amber-700 hover:bg-amber-800 text-mint" onClick={applyFilters}>
                    Apply Filters
                  </Button>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <div className="flex-1">
              <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold text-amber-900">
                  {selectedCategories.length === 1
                    ? selectedCategories[0]
                    : selectedCategories.length > 1
                      ? "Filtered Products"
                      : "All Products"}
                </h1>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Sort by:</span>
                  <select
                    className="rounded-md border border-amber-200 px-2 py-1 text-sm"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="rating">Rating</option>
                    <option value="newest">Newest</option>
                  </select>
                </div>
              </div>

              {sortedProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 p-12">
                  <ShoppingBag className="h-12 w-12 text-gray-400" />
                  <h2 className="mt-4 text-xl font-semibold text-gray-900">No products found</h2>
                  <p className="mt-2 text-center text-gray-500">
                    Try adjusting your filters to find what you're looking for.
                  </p>
                  <Button
                    className="mt-6 bg-amber-700 hover:bg-amber-800 text-mint"
                    onClick={() => {
                      setSelectedCategories([])
                      setSelectedPriceRanges([])
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {sortedProducts.map((product) => (
                    <Card key={product.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                      <div className="relative aspect-square overflow-hidden">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-cover transition-transform duration-500 hover:scale-110"
                        />
                        <div className="absolute right-2 top-2 rounded-full bg-mint px-2 py-1 text-xs font-medium text-amber-700">
                          {product.category}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="mb-2 flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating)
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "fill-gray-200 text-gray-200"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-xs text-gray-500">{product.rating}</span>
                        </div>
                        <h3 className="line-clamp-1 text-lg font-semibold text-amber-900">{product.name}</h3>
                        <p className="mt-1 text-lg font-bold text-amber-700">${product.price.toFixed(2)}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className={`w-full ${
                            addedToCart === product.id
                              ? "bg-green-600 hover:bg-green-700"
                              : "bg-amber-700 hover:bg-amber-800"
                          } text-mint`}
                          onClick={() => addToCart(product.id)}
                        >
                          {addedToCart === product.id ? (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              Added to Cart
                            </>
                          ) : (
                            "Add to Cart"
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
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
