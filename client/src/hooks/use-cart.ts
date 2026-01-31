import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { type InsertCartItem, type CartItemResponse } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { nanoid } from "nanoid";
import { useState, useEffect } from "react";

const SESSION_KEY = "pk_ecommerce_session";

function getSessionId() {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = nanoid();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

export function useCart() {
  const sessionId = getSessionId();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: [api.cart.get.path, sessionId],
    queryFn: async () => {
      const url = buildUrl(api.cart.get.path, { sessionId });
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch cart");
      return api.cart.get.responses[200].parse(await res.json());
    },
  });

  const addItemMutation = useMutation({
    mutationFn: async (productId: number) => {
      const payload: InsertCartItem = {
        sessionId,
        productId,
        quantity: 1,
      };
      
      const res = await fetch(api.cart.addItem.path, {
        method: api.cart.addItem.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add item");
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cart.get.path, sessionId] });
      toast({
        title: "Added to cart",
        description: "Product has been added to your shopping cart.",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const url = buildUrl(api.cart.updateItem.path, { id });
      const res = await fetch(url, {
        method: api.cart.updateItem.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      if (!res.ok) throw new Error("Failed to update cart");
      return api.cart.updateItem.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cart.get.path, sessionId] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.cart.removeItem.path, { id });
      const res = await fetch(url, { method: api.cart.removeItem.method });
      if (!res.ok) throw new Error("Failed to remove item");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cart.get.path, sessionId] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      const url = buildUrl(api.cart.clear.path, { sessionId });
      const res = await fetch(url, { method: api.cart.clear.method });
      if (!res.ok) throw new Error("Failed to clear cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.cart.get.path, sessionId] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
  });

  const subtotal = query.data?.reduce((acc, item) => {
    const price = item.product ? parseFloat(item.product.price) : 0;
    return acc + (price * item.quantity);
  }, 0) || 0;

  const updateQuantity = (id: number, quantity: number) => {
    const item = query.data?.find(i => i.id === id);
    if (!item || !item.product) return;
    
    // Stock limit validation
    if (quantity > item.product.stockCount) {
      toast({
        title: "Stock limit reached",
        description: `Only ${item.product.stockCount} units available in stock.`,
        variant: "destructive",
      });
      return;
    }
    
    if (quantity < 1) return;
    updateQuantityMutation.mutate({ id, quantity });
  };

  return {
    items: query.data || [],
    isLoading: query.isLoading,
    subtotal,
    addItem: addItemMutation.mutate,
    isAdding: addItemMutation.isPending,
    updateQuantity,
    removeItem: removeItemMutation.mutate,
    clearCart: clearCartMutation.mutate,
  };
}
