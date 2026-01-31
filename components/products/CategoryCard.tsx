import { Card } from "@/components/ui/card"
import Link from "next/link"

interface Category {
  id: number
  name: string
  image: string
  count: number
  slug: string
}

interface CategoryCardProps {
  category: Category
}

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${category.slug}`}>
      <Card className="group relative overflow-hidden aspect-[4/3] border-none hover-elevate">
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
        <img 
          src={category.image} 
          alt={category.name}
          className="absolute inset-0 object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
          <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-1">{category.name}</h3>
          <p className="text-sm font-medium opacity-90">{category.count} Products</p>
        </div>
      </Card>
    </Link>
  )
}