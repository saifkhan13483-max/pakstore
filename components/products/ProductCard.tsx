import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ShoppingCart, Star } from "lucide-react"
import Link from "next/link"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : null

  return (
    <Card className="group overflow-hidden border-slate-200 hover:border-primary/50 transition-all hover-elevate bg-white">
      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
        />
        {discount && (
          <div className="absolute top-2 left-2 bg-accent text-white text-[10px] font-bold px-2 py-1 rounded">
            {discount}% OFF
          </div>
        )}
        <Button 
          size="icon" 
          className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-primary hover:bg-primary/90 text-white shadow-lg"
          aria-label="Add to cart"
        >
          <ShoppingCart className="w-4 h-4" />
        </Button>
      </div>
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-slate-300'}`} />
          ))}
          <span className="text-[10px] text-slate-500 ml-1">({product.reviews})</span>
        </div>
        <h3 className="font-semibold text-sm line-clamp-2 min-h-[40px] text-slate-900 group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          <span className="text-primary font-bold">Rs. {product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-slate-400 text-xs line-through">Rs. {product.originalPrice.toLocaleString()}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}