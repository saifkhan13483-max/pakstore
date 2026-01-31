import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import { cn } from "../lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Pakistani eCommerce Store | Best Quality Products",
  description: "Experience the best online shopping in Pakistan. High-quality electronics, fashion, and home goods with Cash on Delivery available nationwide.",
  keywords: "ecommerce Pakistan, online shopping Pakistan, Cash on Delivery, PKR, Pakistani market",
  languages: {
    "en-PK": "/en-pk",
  },
  openGraph: {
    locale: "en_PK",
    type: "website",
    siteName: "Pakistani eCommerce Store",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <div className="relative flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}