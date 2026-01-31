import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, Truck, ShieldCheck, Ticket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Cart() {
  const { items, isLoading, subtotal, updateQuantity, removeItem, clearCart } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shippingThreshold = 2000;
  const shippingCharge = 200;
  const shipping = subtotal >= shippingThreshold ? 0 : shippingCharge;
  const total = subtotal + shipping;

  const freeShippingAmount = shippingThreshold - subtotal;
  
  // Delivery date estimation (3-5 days)
  const today = new Date();
  const minDelivery = new Date(today);
  minDelivery.setDate(today.getDate() + 3);
  const maxDelivery = new Date(today);
  maxDelivery.setDate(today.getDate() + 5);
  
  const deliveryRange = `${minDelivery.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${maxDelivery.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`;

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container-width py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 w-full rounded-xl" />)}
            </div>
            <Skeleton className="h-80 w-full rounded-xl" />
          </div>
        </main>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow container-width flex flex-col items-center justify-center py-20 text-center">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Link href="/products">
            <Button size="lg" className="rounded-full px-8 bg-primary hover:bg-emerald-700">
              Start Shopping
            </Button>
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow container-width py-12">
        <h1 className="text-3xl font-heading font-bold text-secondary mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              if (!item.product) return null;
              
              const itemTotal = parseFloat(item.product.price) * item.quantity;
              
              return (
                <div key={item.id} className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-6 items-center sm:items-start">
                  {/* Image */}
                  <div className="w-24 h-24 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name}
                      className="w-full h-full object-cover" 
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-grow text-center sm:text-left">
                    <Link href={`/products/${item.product.slug}`} className="font-heading font-semibold text-lg hover:text-primary transition-colors">
                      {item.product.name}
                    </Link>
                    <p className="text-muted-foreground text-sm mt-1">{item.product.category}</p>
                    <div className="font-bold text-secondary mt-2">Rs. {parseInt(item.product.price).toLocaleString()}</div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col items-center sm:items-end gap-4">
                    <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-lg border border-gray-200">
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600 disabled:opacity-50"
                        onClick={() => updateQuantity({ id: item.id, quantity: item.quantity - 1 })}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                      <button 
                        className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm transition-all text-gray-600"
                        onClick={() => updateQuantity({ id: item.id, quantity: item.quantity + 1 })}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 text-sm flex items-center hover:underline"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex justify-end pt-4">
              <Button variant="ghost" onClick={() => clearCart()} className="text-red-500 hover:bg-red-50 hover:text-red-600">
                Clear Cart
              </Button>
            </div>
          </div>

          {/* Summary Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-24">
              <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>
              
              {subtotal < shippingThreshold && (
                <div className="bg-emerald-50 text-emerald-700 p-4 rounded-xl border border-emerald-100 mb-6 flex items-center gap-3">
                  <Truck className="w-5 h-5" />
                  <p className="text-sm font-medium">
                    Add <span className="font-bold text-lg">Rs. {freeShippingAmount.toLocaleString()}</span> more for <span className="font-bold">FREE DELIVERY</span>!
                  </p>
                </div>
              )}
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium">Rs. {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-emerald-600 font-bold uppercase tracking-wide text-xs">Free</span>
                    ) : (
                      `Rs. ${shipping.toLocaleString()}`
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-[10px] text-muted-foreground text-right mt-1">
                    Free shipping on orders over Rs. {shippingThreshold.toLocaleString()}
                  </p>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Estimated Delivery</span>
                  <span className="font-medium">{deliveryRange}</span>
                </div>
                
                <div className="pt-4 space-y-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Promo Code</p>
                  <div className="flex gap-2">
                    <Input 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="h-10 text-sm"
                    />
                    <Button variant="outline" size="sm" className="h-10 px-4">Apply</Button>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                  <span className="font-bold text-lg text-secondary">Total</span>
                  <span className="font-bold text-2xl text-secondary">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full h-12 text-lg rounded-xl shadow-lg shadow-primary/20 bg-primary hover:bg-emerald-700">
                  Proceed to Checkout <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">
                <ShieldCheck className="w-4 h-4" /> Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
