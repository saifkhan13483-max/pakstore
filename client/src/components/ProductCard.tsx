import { Link } from "wouter";
import { ShoppingCart, Star } from "lucide-react";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem, isAdding } = useCart();
  
  const discount = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300 overflow-hidden flex flex-col h-full">
      {/* Image Area */}
      <Link href={`/products/${product.slug}`} className="block relative aspect-[4/3] overflow-hidden bg-gray-50">
        {discount > 0 && (
          <Badge className="absolute top-3 left-3 bg-accent hover:bg-accent/90 z-10 font-bold shadow-sm">
            -{discount}% OFF
          </Badge>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
            <Badge variant="secondary" className="text-sm font-bold px-4 py-2 bg-gray-900 text-white">
              Out of Stock
            </Badge>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2 flex items-center gap-1 text-yellow-400 text-xs font-bold">
          <Star className="w-3.5 h-3.5 fill-current" />
          <span className="text-gray-600 ml-1">{product.rating} ({product.reviewCount})</span>
        </div>

        <Link href={`/products/${product.slug}`}>
          <h3 className="font-heading font-semibold text-gray-900 text-lg mb-1 leading-snug group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
          {product.description}
        </p>

        {/* Price & Action */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-secondary font-heading">
              Rs. {parseInt(product.price).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-muted-foreground line-through">
                Rs. {parseInt(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>

          <Button 
            size="sm" 
            className={cn(
              "rounded-full shadow-lg shadow-primary/20",
              product.inStock ? "bg-primary hover:bg-emerald-700" : "bg-gray-200 text-gray-400 cursor-not-allowed hover:bg-gray-200"
            )}
            disabled={!product.inStock || isAdding}
            onClick={(e) => {
              e.preventDefault(); // prevent link navigation
              if (product.inStock) addItem(product.id);
            }}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>
      </div>
    </div>
  );
}
