import { useCart } from "@/hooks/use-cart";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link, useLocation } from "wouter";
import { 
  ShieldCheck, 
  ChevronRight, 
  Lock, 
  Truck, 
  CreditCard,
  User,
  Mail,
  Phone
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const contactSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().regex(/^((\+92)|(0))3[0-9]{2}[0-9]{7}$/, "Enter a valid Pakistani mobile number (e.g. 03XXXXXXXXX)"),
});

type ContactValues = z.infer<typeof contactSchema>;

export default function Checkout() {
  const { items, subtotal, isLoading } = useCart();
  const [, setLocation] = useLocation();

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = (data: ContactValues) => {
    console.log(data);
    // Proceed to next step in next parts
  };

  const shippingThreshold = 2000;
  const shippingCharge = 200;
  const shipping = subtotal >= shippingThreshold ? 0 : shippingCharge;
  const total = subtotal + shipping;

  useEffect(() => {
    if (!isLoading && items.length === 0) {
      setLocation("/cart");
    }
  }, [items, isLoading, setLocation]);

  const steps = [
    { id: "cart", label: "Cart", completed: true },
    { id: "details", label: "Details", active: true },
    { id: "payment", label: "Payment", active: false },
  ];

  if (isLoading || items.length === 0) return null;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container-width py-8 lg:py-12">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
            {steps.map((step, idx) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300",
                  step.active ? "bg-primary text-white ring-4 ring-emerald-100" : 
                  step.completed ? "bg-emerald-500 text-white" : "bg-white text-gray-400 border-2 border-gray-200"
                )}>
                  {step.completed ? "✓" : idx + 1}
                </div>
                <span className={cn(
                  "absolute -bottom-7 text-xs font-bold uppercase tracking-wider whitespace-nowrap",
                  step.active ? "text-primary" : "text-gray-400"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-8">
          {/* Left: Checkout Form Stub */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center justify-between">
                <h2 className="text-xl font-heading font-bold text-secondary flex items-center gap-2">
                  <Truck className="w-5 h-5 text-primary" /> Shipping Information
                </h2>
                <Badge variant="outline" className="text-[10px] uppercase font-bold tracking-widest text-primary border-primary/20">Step 1 of 2</Badge>
              </div>
              <div className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center gap-2">
                            <User className="w-4 h-4 text-gray-400" /> Full Name
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} className="h-12 rounded-xl" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" /> Email Address
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="email@example.com" {...field} className="h-12 rounded-xl" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" /> Mobile Number
                            </FormLabel>
                            <FormControl>
                              <Input placeholder="03XXXXXXXXX" {...field} className="h-12 rounded-xl" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="pt-4 border-t border-gray-100 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <ShieldCheck className="w-4 h-4" />
                        Your data is safe and encrypted
                      </div>
                      <Button type="submit" className="h-12 px-8 rounded-full font-bold shadow-lg shadow-primary/20">
                        Continue to Shipping
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden opacity-50">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50 flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-gray-400" />
                <h2 className="text-xl font-heading font-bold text-gray-400">Payment Method</h2>
              </div>
              <div className="p-8 h-32 flex items-center justify-center italic text-gray-400 text-sm">
                Locked until shipping is complete
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 sticky top-24 overflow-hidden">
              <div className="p-6 border-b border-gray-50 bg-gray-50/50">
                <h2 className="text-lg font-heading font-bold text-secondary">Order Summary</h2>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="w-16 h-16 rounded-lg bg-gray-50 border border-gray-100 overflow-hidden shrink-0">
                        <img 
                          src={item.product?.images[0]} 
                          alt={item.product?.name} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow min-w-0">
                        <h4 className="font-bold text-sm truncate">{item.product?.name}</h4>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold text-secondary">Rs. {(parseFloat(item.product?.price || "0") * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 pt-6 border-t border-gray-100">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-bold text-secondary">Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span className="font-bold text-emerald-600">
                      {shipping === 0 ? "FREE" : `Rs. ${shipping.toLocaleString()}`}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100 mt-4">
                    <span className="font-heading font-bold text-lg text-secondary">Total</span>
                    <span className="font-heading font-extrabold text-2xl text-primary">Rs. {total.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Secure 256-bit SSL encrypted checkout</span>
                  </div>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

function Badge({ children, variant = "default", className }: { children: React.ReactNode, variant?: string, className?: string }) {
  return (
    <span className={cn(
      "px-2 py-0.5 rounded-full text-[10px] font-bold tracking-widest",
      variant === "outline" ? "border" : "bg-primary text-white",
      className
    )}>
      {children}
    </span>
  );
}
