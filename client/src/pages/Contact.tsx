import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    // Mock submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Contact form submitted:", data);
    toast({
      title: "Message Sent!",
      description: "We've received your message and will get back to you within 24 hours.",
    });
    form.reset();
  };

  const contactInfo = [
    {
      title: "Our Headquarters",
      details: ["123 Main Boulevard, Gulberg III", "Lahore, Pakistan"],
      icon: MapPin,
    },
    {
      title: "Customer Support",
      details: ["+92 300 1234567", "support@pakstore.pk"],
      icon: Phone,
    },
    {
      title: "Working Hours",
      details: ["Mon - Sat: 9:00 AM - 9:00 PM", "Sun: Closed"],
      icon: Clock,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header Section */}
        <section className="bg-secondary py-16 text-center text-white">
          <div className="container-width px-4">
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold mb-4">Contact Us</h1>
            <p className="text-gray-300 max-w-2xl mx-auto text-lg">
              Have questions about an order or our products? Our team is here to help you 24/7.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="container-width px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-8">
                <div className="space-y-6">
                  {contactInfo.map((info, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-secondary mb-1">{info.title}</h3>
                        {info.details.map((detail, dIdx) => (
                          <p key={dIdx} className="text-sm text-gray-600">{detail}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Connect */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-lg font-bold text-secondary mb-6 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-primary" /> Connect With Us
                  </h3>
                  <div className="flex gap-4">
                    <a href="#" className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Facebook className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <Twitter className="w-5 h-5" />
                    </a>
                    <a href="#" className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center hover:scale-110 transition-transform">
                      <SiWhatsapp className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-sm border border-gray-100">
                  <h2 className="text-2xl font-heading font-extrabold text-secondary mb-8 flex items-center gap-3">
                    <Send className="w-6 h-6 text-primary" /> Send us a Message
                  </h2>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Full Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Your Name" {...field} className="h-12 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email Address</FormLabel>
                              <FormControl>
                                <Input placeholder="email@example.pk" {...field} className="h-12 rounded-xl" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Subject</FormLabel>
                            <FormControl>
                              <Input placeholder="What's this about?" {...field} className="h-12 rounded-xl" />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Message</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="How can we help you today?" 
                                {...field} 
                                className="min-h-[150px] rounded-xl resize-none" 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button 
                        type="submit" 
                        disabled={form.formState.isSubmitting}
                        className="w-full h-14 rounded-full font-bold text-lg shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                      >
                        {form.formState.isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section Placeholder */}
        <section className="h-[400px] w-full bg-gray-200 relative grayscale hover:grayscale-0 transition-all duration-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-bold text-secondary">Find us in Gulberg III, Lahore</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
