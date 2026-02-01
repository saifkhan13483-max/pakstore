import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Users, 
  Target, 
  Heart, 
  CheckCircle2, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Star 
} from "lucide-react";

export default function About() {
  const stats = [
    { label: "Happy Customers", value: "50k+", icon: Users },
    { label: "Cities Covered", value: "100+", icon: Truck },
    { label: "Quality Products", value: "5000+", icon: ShoppingBag },
    { label: "Years Experience", value: "10+", icon: Star },
  ];

  const values = [
    {
      title: "Quality First",
      description: "We source only the best products for our customers across Pakistan, ensuring every item meets our high standards.",
      icon: CheckCircle2,
    },
    {
      title: "Fast Delivery",
      description: "Our logistics network is optimized for the Pakistani market, delivering your orders in 3-5 working days.",
      icon: Truck,
    },
    {
      title: "Secure Payments",
      description: "Shop with peace of mind using our secure Cash on Delivery and Bank Transfer options.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 bg-secondary overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80')] opacity-10 bg-cover bg-center" />
          <div className="container-width relative z-10 text-center text-white">
            <h1 className="text-4xl lg:text-6xl font-heading font-extrabold mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              Redefining E-Commerce in Pakistan
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
              We are PakStore - your trusted partner for high-quality electronics, fashion, and home goods, delivered right to your doorstep anywhere in Pakistan.
            </p>
            <Link href="/products">
              <Button size="lg" className="rounded-full px-10 font-bold bg-primary hover:bg-primary/90">
                Explore Our Collection
              </Button>
            </Link>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="container-width grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80" 
                  alt="Our Team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-primary p-8 rounded-2xl text-white shadow-xl hidden md:block">
                <p className="text-4xl font-extrabold mb-1">10+</p>
                <p className="text-sm font-bold uppercase tracking-wider">Years of Trust</p>
              </div>
            </div>
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-sm">
                <Target className="w-5 h-5" /> Our Story
              </div>
              <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-secondary leading-tight">
                Empowering Pakistani Shoppers with Quality and Trust
              </h2>
              <p className="text-gray-600 leading-relaxed">
                Founded in 2015, PakStore started with a simple mission: to provide Pakistanis with a seamless, reliable, and trustworthy online shopping experience. We noticed the gap between global standards and local availability, and we set out to bridge it.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Today, we serve thousands of customers daily, from the bustling streets of Karachi to the northern valleys of Gilgit-Baltistan. Our commitment remains the same: Quality products, fair pricing, and exceptional service.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-secondary">Customer Obsessed</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-bold text-secondary">Trust Guaranteed</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-gray-50 border-y border-gray-100">
          <div className="container-width grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white shadow-sm border border-gray-100 mb-2">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold text-secondary">{stat.value}</p>
                <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container-width text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-extrabold text-secondary mb-4">
              Our Values Drive Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We operate on a set of core values that ensure we always put our customers and their needs first.
            </p>
          </div>
          <div className="container-width grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-2xl border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 rounded-xl bg-primary text-white flex items-center justify-center mb-6">
                  <value.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="container-width">
            <div className="bg-primary rounded-3xl p-10 lg:p-20 text-center text-white relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80')] opacity-20 bg-cover bg-center" />
              <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl lg:text-5xl font-heading font-extrabold mb-6">
                  Experience the Best of Online Shopping
                </h2>
                <p className="text-lg text-emerald-50 mb-10 leading-relaxed">
                  Join thousands of satisfied customers across Pakistan and start your shopping journey with us today.
                </p>
                <Link href="/products">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100 font-extrabold rounded-full px-12 h-14 shadow-xl">
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
