import { Button } from "@/components/ui/button"
import { ArrowRight, Truck, CreditCard, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full bg-slate-900 overflow-hidden min-h-[500px] md:min-h-[600px] flex items-center">
        {/* Dark Wash Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent z-10" />
        
        {/* Placeholder for Hero Image - In a real app, use Next/Image */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />

        <div className="container relative z-20 text-white">
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
    </div>
  )
}