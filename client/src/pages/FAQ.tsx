import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search, HelpCircle, Truck, RefreshCcw, ShieldCheck, Wallet } from "lucide-react";
import { useState } from "react";

const faqCategories = [
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "returns", label: "Returns", icon: RefreshCcw },
  { id: "payments", label: "Payments", icon: Wallet },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const faqs = [
  {
    category: "shipping",
    question: "What are your shipping charges?",
    answer: "We offer free shipping on all orders over Rs. 2,000. For orders below this amount, a flat shipping fee of Rs. 200 is charged across Pakistan.",
  },
  {
    category: "shipping",
    question: "How long will it take to receive my order?",
    answer: "Delivery typically takes 3-5 working days for major cities like Karachi, Lahore, and Islamabad. Remote areas may take 5-7 working days.",
  },
  {
    category: "shipping",
    question: "Do you offer international shipping?",
    answer: "Currently, we only ship within Pakistan. We deliver to all major cities and towns nationwide.",
  },
  {
    category: "returns",
    question: "What is your return policy?",
    answer: "We have a 7-day no-questions-asked return policy. If you're not satisfied with your purchase, you can return it within 7 days of delivery as long as the item is in its original condition and packaging.",
  },
  {
    category: "returns",
    question: "How do I initiate a return?",
    answer: "To start a return, please contact our support team via WhatsApp or email with your Order ID. We will guide you through the process and arrange a pickup if applicable.",
  },
  {
    category: "payments",
    question: "What payment methods do you accept?",
    answer: "We currently accept Cash on Delivery (COD) and direct Bank Transfers. Support for JazzCash and EasyPaisa is coming soon.",
  },
  {
    category: "payments",
    question: "Is it safe to pay via bank transfer?",
    answer: "Yes, absolutely. Our bank details are provided at the checkout, and your transaction is processed through secure banking channels.",
  },
  {
    category: "security",
    question: "Is my personal information secure?",
    answer: "We use 256-bit SSL encryption to ensure that all your personal information is kept safe and secure. We never share your data with third parties.",
  },
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-grow">
        {/* Header */}
        <section className="bg-secondary py-16 text-white text-center">
          <div className="container-width px-4">
            <h1 className="text-4xl lg:text-5xl font-heading font-extrabold mb-4">How can we help?</h1>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8 text-lg">
              Find answers to frequently asked questions about shipping, returns, and more.
            </p>
            <div className="max-w-xl mx-auto relative">
              <Input
                type="text"
                placeholder="Search for answers..."
                className="h-14 pl-12 pr-4 rounded-full text-secondary bg-white border-none shadow-lg focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container-width px-4">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Sidebar */}
              <div className="lg:w-1/4 space-y-4">
                <button
                  onClick={() => setActiveCategory("all")}
                  className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${
                    activeCategory === "all"
                      ? "bg-primary text-white shadow-lg shadow-primary/20"
                      : "bg-white text-secondary hover:bg-emerald-50"
                  }`}
                >
                  <HelpCircle className="w-5 h-5" />
                  All Questions
                </button>
                {faqCategories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${
                      activeCategory === cat.id
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-white text-secondary hover:bg-emerald-50"
                    }`}
                  >
                    <cat.icon className="w-5 h-5" />
                    {cat.label}
                  </button>
                ))}

                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 mt-8">
                  <h3 className="font-bold text-secondary mb-2">Still need help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you can't find the answer you're looking for, our support team is ready to help.
                  </p>
                  <button className="w-full bg-secondary text-white py-3 rounded-full font-bold text-sm hover:bg-secondary/90 transition-colors">
                    Contact Support
                  </button>
                </div>
              </div>

              {/* FAQ List */}
              <div className="lg:w-3/4">
                {filteredFaqs.length > 0 ? (
                  <Accordion type="single" collapsible className="space-y-4">
                    {filteredFaqs.map((faq, idx) => (
                      <AccordionItem
                        key={idx}
                        value={`item-${idx}`}
                        className="bg-white border border-gray-100 rounded-xl px-6 shadow-sm overflow-hidden"
                      >
                        <AccordionTrigger className="text-left font-bold text-secondary hover:no-underline hover:text-primary transition-colors py-4">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-gray-600 leading-relaxed pb-6 pt-2">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
                    <Search className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-secondary mb-2">No results found</h3>
                    <p className="text-gray-500">
                      We couldn't find any questions matching "{searchQuery}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
