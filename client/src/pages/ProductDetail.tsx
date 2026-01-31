import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoute, Link } from "wouter";
import { 
  Star, 
  ShoppingCart, 
  Truck, 
  ShieldCheck, 
  Check, 
  Share2, 
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Heart
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const [, params] = useRoute<{ slug: string }>("/products/:slug");
  const slug = params?.slug || "";
  const { data: product, isLoading } = useProduct(slug);
  const { addItem, isAdding } = useCart();
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Navbar />
        <main className="flex-grow container-width py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Skeleton className="aspect-square w-full rounded-3xl" />
            <div className="space-y-6">
              <Skeleton className="h-10 w-3/4" />
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-24 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </main>
        <Footer />
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
            <p className="text-muted-foreground mb-6">The product you are looking for does not exist.</p>
            <Button asChild rounded="full">
              <Link href="/products">Back to Shop</Link>
            </Button>
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
      
      <main className="flex-grow container-width py-8 lg:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gray-50 border border-gray-100 group">
              {discount > 0 && (
                <Badge className="absolute top-6 left-6 bg-accent text-white text-lg font-bold px-4 py-1.5 z-10 shadow-lg">
                  -{discount}% OFF
                </Badge>
              )}
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className="w-full h-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
              />
              
              {product.images.length > 1 && (
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full shadow-lg h-10 w-10 p-0 bg-white/80 hover:bg-white"
                  onClick={() => setActiveImage(prev => (prev === 0 ? product.images.length - 1 : prev - 1))}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="rounded-full shadow-lg h-10 w-10 p-0 bg-white/80 hover:bg-white"
                  onClick={() => setActiveImage(prev => (prev === product.images.length - 1 ? 0 : prev + 1))}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                </div>
              )}
            </div>

            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={cn(
                      "relative w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all flex-shrink-0 bg-gray-50",
                      activeImage === idx ? "border-primary shadow-md shadow-primary/10" : "border-transparent hover:border-gray-200"
                    )}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-contain p-2" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Product Info */}
          <div className="flex flex-col">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-none px-3 py-1 font-semibold uppercase tracking-wider text-[10px]">
                  {product.category}
                </Badge>
                <div className="flex items-center gap-1 text-yellow-400 font-bold text-sm">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-gray-900">{product.rating ? String(product.rating) : "0"}</span>
                  <span className="text-muted-foreground font-normal">({product.reviewCount || 0} Reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 mb-4 leading-tight">
                {product.name}
              </h1>

              <div className="flex items-end gap-3 mb-6">
                <span className="text-4xl font-bold text-secondary font-heading">
                  Rs. {parseInt(product.price).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through mb-1">
                    Rs. {parseInt(product.originalPrice).toLocaleString()}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed text-lg mb-8">
                {product.description}
              </p>

              {product.features && Array.isArray(product.features) && (
                <ul className="space-y-3 mb-8">
                  {(product.features as string[]).map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-600">
                      <Check className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-6 pb-8 border-b border-gray-100">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center border-2 border-gray-100 rounded-full h-14 px-2">
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors disabled:opacity-30"
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    disabled={quantity <= 1}
                  >
                    <span className="text-2xl font-light">-</span>
                  </button>
                  <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                  <button 
                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-50 transition-colors"
                    onClick={() => setQuantity(prev => prev + 1)}
                  >
                    <span className="text-2xl font-light">+</span>
                  </button>
                </div>

                <Button 
                  className="flex-grow rounded-full h-14 text-lg font-bold shadow-xl shadow-primary/20 bg-primary hover:bg-emerald-700"
                  disabled={!product.inStock || isAdding}
                  onClick={() => {
                    for (let i = 0; i < quantity; i++) {
                      addItem(product.id);
                    }
                  }}
                >
                  <ShoppingCart className="w-5 h-5 mr-3" />
                  {isAdding ? "Adding..." : (product.inStock ? "Add to Cart" : "Out of Stock")}
                </Button>

                <Button variant="outline" size="icon" className="h-14 w-14 rounded-full border-gray-200">
                  <Heart className="w-6 h-6 text-gray-400" />
                </Button>
              </div>

              <div className="flex items-center gap-6">
                <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                  <Share2 className="w-4 h-4" />
                  Share Product
                </button>
                <div className="h-4 w-px bg-gray-200" />
                <span className={cn(
                  "text-sm font-semibold",
                  product.inStock ? "text-emerald-600" : "text-red-500"
                )}>
                  ● {product.inStock ? "Currently in stock" : "Out of stock"}
                </span>
              </div>
            </div>

            {/* Features/Trust */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Fast Delivery</h4>
                  <p className="text-xs text-muted-foreground">Across Pakistan</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">1 Year Warranty</h4>
                  <p className="text-xs text-muted-foreground">Original Products</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center flex-shrink-0">
                  <RotateCcw className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-gray-900">Easy Returns</h4>
                  <p className="text-xs text-muted-foreground">7-Day Return Policy</p>
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
              <p className="whitespace-pre-line leading-relaxed">{product.longDescription}</p>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
