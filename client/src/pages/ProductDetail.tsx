import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute } from "wouter";
import { Star, ShoppingCart, Truck, ShieldCheck, Check, Facebook, Twitter, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:slug");
  const slug = params?.slug || "";
  const { data: product, isLoading } = useProduct(slug);
  const { addItem, isAdding } = useCart();
  const [selectedImage, setSelectedImage] = useState(0);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow container-width py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="h-[500px] w-full rounded-2xl" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-secondary mb-2">Product Not Found</h1>
            <p className="text-muted-foreground">The product you are looking for does not exist.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const discount = product.originalPrice 
    ? Math.round(((parseFloat(product.originalPrice) - parseFloat(product.price)) / parseFloat(product.originalPrice)) * 100)
    : 0;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow container-width py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 relative">
              {discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-accent text-white text-lg px-3 py-1 z-10">
                  {discount}% OFF
                </Badge>
              )}
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-cover animate-in fade-in duration-300"
              />
            </div>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={cn(
                    "w-24 h-24 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0",
                    selectedImage === idx ? "border-primary" : "border-transparent hover:border-gray-200"
                  )}
                >
                  <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-2">
              <span className="text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              {product.inStock ? (
                <span className="text-sm font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="w-4 h-4" /> In Stock
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500">Out of Stock</span>
              )}
            </div>

            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mb-6 border-b border-gray-100 pb-6">
              <div className="flex items-center gap-1 text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={cn(
                      "w-5 h-5", 
                      i < Math.floor(parseFloat(product.rating || "0")) ? "fill-current" : "text-gray-200 fill-none"
                    )} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {product.reviewCount} Reviews
              </span>
            </div>

            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-bold text-secondary font-heading">
                Rs. {parseInt(product.price).toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  Rs. {parseInt(product.originalPrice).toLocaleString()}
                </span>
              )}
            </div>

            <div className="prose prose-stone text-gray-600 mb-8 max-w-none">
              <p>{product.description}</p>
              {product.features && Array.isArray(product.features) && (
                <ul className="mt-4 space-y-2">
                  {(product.features as string[]).map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="flex gap-4 mb-8">
              <Button 
                size="lg" 
                className="flex-1 h-14 text-lg rounded-xl shadow-lg shadow-primary/25 hover:shadow-primary/40 bg-primary hover:bg-emerald-700"
                disabled={!product.inStock || isAdding}
                onClick={() => addItem(product.id)}
              >
                {isAdding ? (
                  "Adding..."
                ) : (
                  <>
                    <ShoppingCart className="w-5 h-5 mr-2" /> Add to Cart
                  </>
                )}
              </Button>
              <Button size="icon" variant="outline" className="h-14 w-14 rounded-xl border-gray-200 hover:bg-gray-50 text-gray-600">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <Truck className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Fast Delivery</h4>
                  <p className="text-xs text-gray-500">2-4 days nationwide</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-gray-100">
                <ShieldCheck className="w-8 h-8 text-primary" />
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Authentic</h4>
                  <p className="text-xs text-gray-500">100% genuine products</p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Long Description Area */}
        {product.longDescription && (
          <div className="mt-20 border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-bold font-heading mb-6">Product Details</h2>
            <div className="prose prose-emerald max-w-4xl text-gray-600">
              <p className="whitespace-pre-line">{product.longDescription}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
