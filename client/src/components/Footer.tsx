import { Link } from "wouter";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                <span className="text-secondary font-bold text-lg font-heading">P</span>
              </div>
              <span className="font-heading font-bold text-2xl">PakStore</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Pakistan's premium online shopping destination. Authentic products, express delivery, and exceptional customer service nationwide.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-emerald-400">Shop</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/products?category=fashion" className="hover:text-white transition-colors">Fashion</Link></li>
              <li><Link href="/products?category=electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link href="/products?category=home" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link href="/products?category=beauty" className="hover:text-white transition-colors">Beauty & Health</Link></li>
              <li><Link href="/products?category=sale" className="hover:text-white transition-colors">Flash Sale</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-emerald-400">Support</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white transition-colors">Shipping Policy</Link></li>
              <li><Link href="/returns" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-6 text-emerald-400">Contact</h3>
            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Main Boulevard, Gulberg III, Lahore, Pakistan</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+92 300 1234567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@pakstore.pk</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} PakStore. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
