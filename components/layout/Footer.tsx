import Link from "next/link"
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react"
import { SiWhatsapp } from "react-icons/si"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-slate-50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Information */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold text-primary tracking-tight">
              STORE<span className="text-secondary">.PK</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Your premier destination for high-quality electronics, fashion, and home goods in Pakistan. Providing exceptional value and service since 2024.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="WhatsApp">
                <SiWhatsapp className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Customer Service</h3>
            <ul className="space-y-2">
              <li><Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="text-sm text-muted-foreground hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="/faqs" className="text-sm text-muted-foreground hover:text-primary transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/products?category=electronics" className="text-sm text-muted-foreground hover:text-primary transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=fashion" className="text-sm text-muted-foreground hover:text-primary transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home Goods</Link></li>
              <li><Link href="/deals" className="text-sm text-muted-foreground hover:text-primary transition-colors">Hot Deals</Link></li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-4">
            <h3 className="font-bold text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-primary" />
                <span>Plot 123, Block 4, Clifton, Karachi, Pakistan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone className="w-4 h-4 shrink-0 text-primary" />
                <span>+92 21 34567890</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail className="w-4 h-4 shrink-0 text-primary" />
                <span>support@store.pk</span>
              </li>
            </ul>
            <div className="pt-4">
              <h4 className="text-xs font-bold uppercase mb-2">Subscribe to our newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Email address" className="h-9" />
                <Button size="sm" className="shrink-0">Join</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t py-6">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} STORE.PK. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
              <span className="text-[10px] font-bold uppercase">Cash on Delivery</span>
            </div>
            {/* Payment methods placeholder */}
            <div className="h-6 w-32 bg-slate-200 rounded animate-pulse md:block hidden" />
          </div>
        </div>
      </div>
    </footer>
  )
}