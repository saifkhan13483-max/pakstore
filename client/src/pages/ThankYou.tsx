import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Package, Truck, Calendar, ShoppingBag, Printer, Share2, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("last_order");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
    }
    
    // Set meta tags for social sharing
    document.title = "Order Confirmed | PakStore";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Thank you for your order at PakStore. Your request is being processed.");
    }
  }, []);

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
        <h1 className="text-2xl font-bold text-secondary">No order found</h1>
        <Link href="/">
          <Button className="mt-4 rounded-full">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  const { id, details, items, total } = order;

  // Delivery date estimation (3-5 days)
  const today = new Date();
  const minDelivery = new Date(today);
  minDelivery.setDate(today.getDate() + 3);
  const maxDelivery = new Date(today);
  maxDelivery.setDate(today.getDate() + 5);
  const deliveryRange = `${minDelivery.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })} - ${maxDelivery.toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My PakStore Order',
          text: `Just placed an order #${id} on PakStore!`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container-width py-12 lg:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-emerald-100 rounded-full mb-6 animate-in zoom-in duration-500">
              <CheckCircle2 className="w-12 h-12 text-emerald-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-secondary mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your order <span className="font-bold text-secondary">#{id}</span> has been placed successfully.
              A confirmation email has been sent to <span className="font-medium text-secondary">{details.email}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Columns: Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Summary Card */}
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                    <Package className="w-5 h-5 text-primary" /> Items Purchased
                  </h3>
                  <span className="text-xs font-bold text-primary bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider">
                    {items.length} {items.length === 1 ? 'Item' : 'Items'}
                  </span>
                </div>
                <div className="space-y-4 mb-8">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex items-center gap-4 py-2 border-b border-gray-50 last:border-0">
                      <div className="w-16 h-16 rounded-lg bg-gray-50 border overflow-hidden shrink-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-grow min-w-0">
                        <p className="font-bold text-sm truncate">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-bold text-secondary whitespace-nowrap">
                        Rs. {(parseFloat(item.product.price) * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-6 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-secondary">Total Amount</span>
                    <span className="text-2xl font-extrabold text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground text-right italic">
                    Payment Method: <span className="font-bold uppercase">{details.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Bank Transfer'}</span>
                  </p>
                </div>
              </div>

              {/* Shipping & Delivery Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-md font-bold text-secondary mb-4 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-primary" /> Delivery Address
                  </h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-bold text-secondary">{details.fullName}</p>
                    <p>{details.address}</p>
                    <p>{details.area}, {details.city}</p>
                    <p>{details.phone}</p>
                  </div>
                </div>
                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                  <h3 className="text-md font-bold text-primary mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" /> Est. Delivery
                  </h3>
                  <p className="text-2xl font-extrabold text-secondary mb-1">{deliveryRange}</p>
                  <p className="text-xs text-muted-foreground">
                    Items will be delivered to <span className="font-bold">{details.city}</span> via our premium courier service.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Support & Actions */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-secondary mb-4">What's Next?</h3>
                <ul className="space-y-6 text-sm text-gray-600">
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">1</div>
                    <p>Order verification call or SMS from our team shortly.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">2</div>
                    <p>Items will be dispatched within 24-48 working hours.</p>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 font-bold">3</div>
                    <p>Track your shipment using the link provided in your SMS.</p>
                  </li>
                </ul>
              </div>

              <div className="bg-secondary p-8 rounded-2xl text-white">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Need Help?
                </h3>
                <p className="text-sm text-gray-300 mb-6">
                  Our customer support team is available 24/7 for any queries regarding your order.
                </p>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full rounded-full border-white/20 hover:bg-white/10 text-white font-bold h-10 text-xs">
                    WhatsApp Support
                  </Button>
                  <Button variant="outline" className="w-full rounded-full border-white/20 hover:bg-white/10 text-white font-bold h-10 text-xs">
                    Contact Us
                  </Button>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Link href="/" className="w-full">
                  <Button className="w-full h-12 rounded-full font-bold shadow-lg shadow-primary/20">
                    Continue Shopping
                  </Button>
                </Link>
                <div className="grid grid-cols-2 gap-3">
                  <Button variant="outline" className="rounded-full font-bold h-11 flex items-center gap-2 text-xs" onClick={() => window.print()}>
                    <Printer className="w-4 h-4" /> Print
                  </Button>
                  <Button variant="outline" className="rounded-full font-bold h-11 flex items-center gap-2 text-xs" onClick={handleShare}>
                    <Share2 className="w-4 h-4" /> Share
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
