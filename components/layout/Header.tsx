import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Search, Menu, Phone, Mail, MapPin } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

export function Header() {
  return (
    <header className="w-full bg-white border-b sticky top-0 z-50">
      {/* Announcement Bar */}
      <div className="bg-secondary text-white py-2 px-4">
        <div className="container flex flex-col md:flex-row justify-between items-center text-xs md:text-sm gap-2">
          <p className="font-medium">Cash on Delivery Available Across Pakistan</p>
          <div className="flex items-center gap-4">
            <a href="tel:+923001234567" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3 h-3" />
              <span>+92 300 1234567</span>
            </a>
            <a href="mailto:info@store.pk" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="w-3 h-3" />
              <span>info@store.pk</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Menu">
              <Menu className="w-6 h-6" />
            </Button>
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              STORE<span className="text-secondary">.PK</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">Shop</Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
            <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Search & Cart */}
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full hidden md:block">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="pl-10 h-10 w-full"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Search">
                <Search className="w-5 h-5" />
              </Button>
              <Link href="/cart">
                <Button variant="outline" className="relative gap-2 border-primary text-primary hover:bg-primary hover:text-white">
                  <ShoppingCart className="w-4 h-4" />
                  <span className="hidden sm:inline">Cart</span>
                  <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    0
                  </span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}