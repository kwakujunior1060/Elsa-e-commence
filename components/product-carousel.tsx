"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

// Sample product data
const products = [
  {
    id: 1,
    name: "Skincare",
    price: 24.99,
    rating: 4.8,
    image: "/skincare1.PNG?height=400&width=400",
    category: "Elsa's Skincare",
  },
  {
    id: 2,
    name: "Everything Customization",
    price: 39.99,
    rating: 4.9,
    image: "/write1.JPG?height=400&width=400",
    category: "Elsa's Write",
  },
  {
    id: 3,
    name: "Gift",
    price: 34.99,
    rating: 4.7,
    image: "/gift.PNG?height=400&width=400",
    category: "Elsa's Gift",
  },
  {
    id: 4,
    name: "Skincare",
    price: 29.99,
    rating: 4.6,
    image: "/skincare2.PNG?height=400&width=400",
    category: "Elsa's Skincare",
  },
  {
    id: 5,
    name: "Everything Customization",
    price: 44.99,
    rating: 4.9,
    image: "/write2.JPG?height=400&width=400",
    category: "Elsa's Write",
  },
  {
    id: 6,
    name: "Everything Customization",
    price: 19.99,
    rating: 4.5,
    image: "/write4.PNG?height=400&width=400",
    category: "Elsa's Write",
  },
]

export function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)
  const itemsPerPage = 4

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + itemsPerPage >= products.length ? 0 : prevIndex + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? products.length - itemsPerPage : prevIndex - 1))
  }

  useEffect(() => {
    let interval
    if (autoplay) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [autoplay, currentIndex])

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerPage)
  if (visibleProducts.length < itemsPerPage) {
    visibleProducts.push(...products.slice(0, itemsPerPage - visibleProducts.length))
  }

  return (
    <div className="relative mt-10 overflow-hidden px-4">
      <div className="flex space-x-6 transition-transform duration-500 ease-in-out">
        {visibleProducts.map((product) => (
          <Card
            key={product.id}
            className="w-full min-w-[250px] max-w-[300px] overflow-hidden transition-all duration-300 hover:shadow-lg"
          >
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
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-gray-500">{product.rating}</span>
              </div>
              <h3 className="line-clamp-1 text-lg font-semibold text-amber-900">{product.name}</h3>
              <p className="mt-1 text-lg font-bold text-amber-700">${product.price.toFixed(2)}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button className="w-full bg-amber-700 hover:bg-amber-800 text-mint">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-amber-200 bg-mint/80 text-amber-700 backdrop-blur-sm hover:bg-amber-50"
        onClick={prevSlide}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronLeft className="h-6 w-6" />
        <span className="sr-only">Previous</span>
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full border-amber-200 bg-mint/80 text-amber-700 backdrop-blur-sm hover:bg-amber-50"
        onClick={nextSlide}
        onMouseEnter={() => setAutoplay(false)}
        onMouseLeave={() => setAutoplay(true)}
      >
        <ChevronRight className="h-6 w-6" />
        <span className="sr-only">Next</span>
      </Button>
    </div>
  )
}

