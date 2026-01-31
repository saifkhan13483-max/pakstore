import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CheckCircle2, Package, Truck, Calendar, ShoppingBag, Printer } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThankYou() {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const lastOrder = localStorage.getItem("last_order");
    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
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

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container-width py-12 lg:py-20">
        <div className="max-w-3xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-100 rounded-full mb-6">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold text-secondary mb-4">
              Thank You for Your Order!
            </h1>
            <p className="text-lg text-muted-foreground">
              Your order <span className="font-bold text-secondary">#{id}</span> has been placed successfully.
              A confirmation email has been sent to <span className="font-medium text-secondary">{details.email}</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Order Details */}
            <div className="space-y-6">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" /> Order Summary
                </h3>
                <div className="space-y-4 mb-6">
                  {items.map((item: any) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-gray-600">{item.product.name} x {item.quantity}</span>
                      <span className="font-bold">Rs. {(parseFloat(item.product.price) * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-lg font-bold text-secondary">Total Paid</span>
                  <span className="text-2xl font-extrabold text-primary">Rs. {total.toLocaleString()}</span>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Shipping Address
                </h3>
                <div className="text-sm text-gray-600 space-y-1">
                  <p className="font-bold text-secondary">{details.fullName}</p>
                  <p>{details.address}</p>
                  <p>{details.area}, {details.city}</p>
                  <p>{details.phone}</p>
                </div>
              </div>
            </div>

            {/* Next Steps & Info */}
            <div className="space-y-6">
              <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                <h3 className="text-lg font-bold text-primary mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" /> Estimated Delivery
                </h3>
                <p className="text-3xl font-extrabold text-secondary mb-2">{deliveryRange}</p>
                <p className="text-sm text-muted-foreground">
                  Our courier partner will contact you shortly before delivery. 
                  {details.paymentMethod === 'cod' ? " Please keep the exact amount ready." : " Your payment has been confirmed."}
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-secondary mb-4">What's Next?</h3>
                <ul className="space-y-4 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">1</div>
                    <p>You'll receive an order confirmation message via WhatsApp/SMS shortly.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">2</div>
                    <p>Your items are being packed and will be dispatched within 24 hours.</p>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">3</div>
                    <p>Track your order using the link sent to your mobile number.</p>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/" className="flex-grow">
                  <Button className="w-full h-12 rounded-full font-bold">Continue Shopping</Button>
                </Link>
                <Button variant="outline" className="h-12 rounded-full font-bold flex items-center gap-2" onClick={() => window.print()}>
                  <Printer className="w-4 h-4" /> Print Receipt
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
