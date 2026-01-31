import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, CreditCard, ShieldCheck, ChevronRight } from "lucide-react"
import Link from "next/link"
import { CategoryCard } from "@/components/products/CategoryCard"
import { ProductCard } from "@/components/products/ProductCard"

const CATEGORIES = [
  { id: 1, name: "Electronics", slug: "electronics", count: 120, image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Fashion", slug: "fashion", count: 450, image: "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop" },
  { id: 3, name: "Home Goods", slug: "home", count: 320, image: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?q=80&w=2070&auto=format&fit=crop" },
  { id: 4, name: "Accessories", slug: "accessories", count: 150, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" },
]

const BEST_SELLERS = [
  { id: 1, name: "High-Performance Wireless Headphones", price: 4500, originalPrice: 6000, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Smart Watch Series 7 Pro", price: 3200, rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" },
  { id: 3, name: "Premium Leather Wallet", price: 1500, originalPrice: 2000, rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop" },
  { id: 4, name: "Ultra-Slim 4K Monitor", price: 25000, originalPrice: 28000, rating: 4.9, reviews: 42, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop" },
]

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
        {/* Dark Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        
        {/* Placeholder for Hero Image - In a real app, use Next/Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="container relative z-20 text-white py-12">
          <div className="max-w-2xl space-y-6">
            <div className="inline-block px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary text-xs font-bold uppercase tracking-wider animate-pulse">
              New Season Arrival
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Elevate Your Lifestyle with <span className="text-primary">Premium</span> Quality
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed">
              Discover the finest collection of electronics, fashion, and home essentials tailored for the Pakistani market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white font-bold h-12 px-8">
                Shop Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/20 text-white hover:bg-white/20 h-12 px-8">
                View Deals
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators Bar */}
      <section className="bg-slate-50 border-b py-8">
        <div className="container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Free Delivery</h3>
                <p className="text-sm text-slate-500">On all orders over Rs. 2,000</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100 hover-elevate transition-all">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <CreditCard className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Cash on Delivery</h3>
                <p className="text-sm text-slate-500">Pay when you receive your order</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl bg-white shadow-sm border border-slate-100 hover-elevate transition-all lg:col-span-1 sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Authentic Products</h3>
                <p className="text-sm text-slate-500">100% genuine quality guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Featured Categories</h2>
              <p className="text-slate-500">Explore our most popular product collections</p>
            </div>
            <Link href="/products" className="text-primary font-bold flex items-center gap-1 hover:underline">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="flex justify-between items-end mb-10">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tight text-slate-900">Best Sellers</h2>
              <p className="text-slate-500">Top-rated products loved by our customers</p>
            </div>
            <Link href="/products" className="text-primary font-bold flex items-center gap-1 hover:underline">
              Shop All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BEST_SELLERS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}