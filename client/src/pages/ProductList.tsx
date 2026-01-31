import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { Search } from "lucide-react";
import { useState, useEffect } from "react";

export default function ProductList() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const category = searchParams.get("category") || undefined;
  const initialSearch = searchParams.get("search") || undefined;

  const [search, setSearch] = useState(initialSearch || "");
  
  // Sync state with URL if it changes
  useEffect(() => {
    setSearch(initialSearch || "");
  }, [initialSearch]);

  const { data: products, isLoading } = useProducts({ category, search: initialSearch });

  const [, setLocation] = useLocation();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (search) params.set("search", search);
    
    setLocation(`/products?${params.toString()}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-grow container-width py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h1 className="text-3xl font-heading font-bold text-secondary capitalize">
              {category ? `${category} Products` : "All Products"}
            </h1>
            <p className="text-muted-foreground mt-2">
              Showing {products?.length || 0} results
            </p>
          </div>
          
          <form onSubmit={handleSearch} className="relative w-full md:w-80">
            <Input 
              placeholder="Search products..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pr-10 bg-white shadow-sm border-gray-200"
            />
            <Button 
              type="submit" 
              variant="ghost" 
              size="sm" 
              className="absolute right-1 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-primary"
            >
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-[300px] w-full rounded-2xl" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-500">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-500 max-w-sm mx-auto">
              We couldn't find any products matching your criteria. Try different keywords or clear the filters.
            </p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearch("");
                setLocation("/products");
              }}
              className="mt-4 text-primary"
            >
              Clear all filters
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
