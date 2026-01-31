import { Link } from "wouter";
import { useProducts, useSeedProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { ArrowRight, Truck, ShieldCheck, Clock, RefreshCw } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { data: products, isLoading } = useProducts();
  const seedMutation = useSeedProducts();
  
  // Featured products (first 4)
  const featuredProducts = products?.slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/50">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-secondary text-white">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-transparent"></div>
          
          <div className="container-width relative pt-20 pb-24 lg:pt-32 lg:pb-40">
            <div className="max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700">
              <span className="inline-block py-1 px-3 rounded-full bg-emerald-500/20 text-emerald-300 text-sm font-semibold mb-6 border border-emerald-500/30">
                New Summer Collection 2024
              </span>
              <h1 className="font-heading text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                Authentic Style <br />
                <span className="text-emerald-400">Delivered Fast.</span>
              </h1>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed max-w-lg">
                Discover Pakistan's finest fashion, electronics, and lifestyle products curated just for you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-full text-lg h-14 px-8 bg-primary hover:bg-emerald-600 shadow-lg shadow-emerald-900/20 border-0">
                    Shop Now <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/products?category=sale">
                  <Button size="lg" variant="outline" className="rounded-full text-lg h-14 px-8 border-white/30 text-white hover:bg-white/10 hover:text-white bg-transparent backdrop-blur-sm">
                    View Sale
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 bg-white border-b border-gray-100">
          <div className="container-width">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Truck, title: "Nationwide Delivery", desc: "Fast shipping to all cities in Pakistan" },
                { icon: ShieldCheck, title: "100% Authentic", desc: "Genuine products directly from brands" },
                { icon: RefreshCw, title: "Easy Returns", desc: "7-day return policy for your peace of mind" },
                { icon: Clock, title: "24/7 Support", desc: "Our team is here to help you anytime" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center shrink-0 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-gray-900 mb-1">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20">
          <div className="container-width">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="font-heading text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
                <p className="text-gray-500">Hand-picked favorites just for you</p>
              </div>
              <Link href="/products">
                <Button variant="ghost" className="text-primary hover:text-emerald-700 hover:bg-emerald-50">
                  View All <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="space-y-4">
                    <Skeleton className="h-[300px] w-full rounded-2xl" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {featuredProducts?.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-200">
                <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">The database seems to be empty.</p>
                <Button onClick={() => seedMutation.mutate()} disabled={seedMutation.isPending}>
                  {seedMutation.isPending ? "Seeding..." : "Seed Database with Test Products"}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Categories / Promo */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="container-width">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[300px] rounded-2xl overflow-hidden group">
                 {/* unspalsh: fashion accessories */}
                <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=80" alt="Fashion" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-emerald-400 font-bold mb-2">New Arrivals</span>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Women's Fashion</h3>
                  <Link href="/products?category=fashion">
                    <Button variant="outline" className="w-fit text-white border-white hover:bg-white hover:text-black">Shop Now</Button>
                  </Link>
                </div>
              </div>
              <div className="relative h-[300px] rounded-2xl overflow-hidden group">
                {/* unsplash: electronics gadgets */}
                <img src="https://images.unsplash.com/photo-1498049381929-72f63391d0cf?w=800&q=80" alt="Tech" className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-50" />
                <div className="absolute inset-0 flex flex-col justify-center p-8 lg:p-12">
                  <span className="text-emerald-400 font-bold mb-2">Best Sellers</span>
                  <h3 className="text-3xl lg:text-4xl font-heading font-bold mb-6">Tech Gadgets</h3>
                  <Link href="/products?category=electronics">
                    <Button variant="outline" className="w-fit text-white border-white hover:bg-white hover:text-black">Shop Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
