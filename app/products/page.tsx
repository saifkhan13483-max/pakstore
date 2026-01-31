import { ProductCard } from "@/components/products/ProductCard"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  ChevronRight, 
  Filter, 
  LayoutGrid, 
  List, 
  SlidersHorizontal 
} from "lucide-react"
import Link from "next/link"

const ALL_PRODUCTS = [
  { id: 1, name: "High-Performance Wireless Headphones", price: 4500, originalPrice: 6000, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop" },
  { id: 2, name: "Smart Watch Series 7 Pro", price: 3200, rating: 4.5, reviews: 89, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop" },
  { id: 3, name: "Premium Leather Wallet", price: 1500, originalPrice: 2000, rating: 4.7, reviews: 56, image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1974&auto=format&fit=crop" },
  { id: 4, name: "Ultra-Slim 4K Monitor", price: 25000, originalPrice: 28000, rating: 4.9, reviews: 42, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop" },
  { id: 5, name: "Mechanical Gaming Keyboard", price: 8500, originalPrice: 10000, rating: 4.6, reviews: 75, image: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=2070&auto=format&fit=crop" },
  { id: 6, name: "Ergonomic Office Chair", price: 18000, originalPrice: 22000, rating: 4.4, reviews: 31, image: "https://images.unsplash.com/photo-1505797149-35ebcb05a6fd?q=80&w=2070&auto=format&fit=crop" },
  { id: 7, name: "Portable Bluetooth Speaker", price: 2800, originalPrice: 3500, rating: 4.7, reviews: 112, image: "https://images.unsplash.com/photo-1608333123552-4d7dc344f37d?q=80&w=1974&auto=format&fit=crop" },
  { id: 8, name: "Minimalist Table Lamp", price: 2200, rating: 4.3, reviews: 28, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1974&auto=format&fit=crop" },
]

export default function ProductsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Breadcrumbs */}
      <div className="bg-white border-b">
        <div className="container py-4 flex items-center gap-2 text-xs md:text-sm text-slate-500">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900 font-medium">All Products</span>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar (Desktop) */}
          <aside className="hidden lg:block w-64 shrink-0 space-y-8">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b pb-4">
                <h2 className="font-bold text-slate-900 flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" /> Filters
                </h2>
                <button className="text-xs text-primary hover:underline font-medium">Clear All</button>
              </div>

              {/* Placeholder Filter Sections */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Categories</h3>
                <div className="space-y-2">
                  {["Electronics", "Fashion", "Home Goods", "Accessories"].map((cat) => (
                    <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-300 group-hover:border-primary transition-colors" />
                      <span className="text-sm text-slate-600 group-hover:text-slate-900">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t">
                <h3 className="font-semibold text-sm">Price Range</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <div className="flex items-center gap-2">
                    <Input placeholder="Min" className="h-8" />
                    <span>-</span>
                    <Input placeholder="Max" className="h-8" />
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1 space-y-6">
            {/* Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" className="lg:hidden gap-2">
                  <Filter className="w-4 h-4" /> Filters
                </Button>
                <p className="text-sm text-slate-500">
                  Showing <span className="font-bold text-slate-900">{ALL_PRODUCTS.length}</span> products
                </p>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="flex items-center gap-1 border rounded-md p-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7 bg-slate-100">
                    <LayoutGrid className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <List className="w-4 h-4" />
                  </Button>
                </div>
                <select className="text-sm border rounded-md h-9 px-3 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <option>Featured</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Newest Arrivals</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {ALL_PRODUCTS.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Load More Placeholder */}
            <div className="flex justify-center pt-8">
              <Button variant="outline" size="lg" className="min-w-[200px] border-primary text-primary hover:bg-primary hover:text-white font-bold">
                Load More Products
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}