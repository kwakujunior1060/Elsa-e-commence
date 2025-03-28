import Image from "next/image"
import Link from "next/link"

// Sample category data
const categories = [
  {
    id: 1,
    name: "Skincare",
    image: "/skincare main.PNG?height=300&width=300",
    count: 12,
  },
  {
    id: 2,
    name: "Everything Customization",
    image: "/ec.PNG?height=300&width=300",
    count: 15,
  },
  {
    id: 3,
    name: "Packages",
    image: "/package.PNG?height=300&width=300",
    count: 8,
  },
  {
    id: 4,
    name: "Elsa's Gift",
    image: "/gift.PNG?height=300&width=300",
    count: 10,
  },
]

export function CategoryGrid() {
  return (
    <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/shop?category=${category.name.toLowerCase()}`}
          className="group relative overflow-hidden rounded-lg"
        >
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={category.image || "/placeholder.svg"}
              alt={category.name}
              width={300}
              height={300}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-300 group-hover:opacity-80" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="text-xl font-semibold">{category.name}</h3>
              <p className="text-sm opacity-80">{category.count} products</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

