import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertProduct } from "@shared/schema";

// GET /api/products
export function useProducts(filters?: { category?: string; search?: string }) {
  const queryKey = [api.products.list.path, filters?.category, filters?.search];
  
  return useQuery({
    queryKey,
    queryFn: async () => {
      let url = api.products.list.path;
      const params = new URLSearchParams();
      if (filters?.category) params.append("category", filters.category);
      if (filters?.search) params.append("search", filters.search);
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

// GET /api/products/:slug
export function useProduct(slug: string) {
  return useQuery({
    queryKey: [api.products.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { slug });
      const res = await fetch(url);
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// POST /api/products/seed (Dev only)
export function useSeedProducts() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await fetch(api.products.seed.path, {
        method: api.products.seed.method,
      });
      if (!res.ok) throw new Error("Failed to seed products");
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.products.list.path] });
    }
  });
}
