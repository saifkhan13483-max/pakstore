import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { products } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // === PRODUCTS ===
  app.get(api.products.list.path, async (req, res) => {
    const category = req.query.category as string | undefined;
    const search = req.query.search as string | undefined;
    const products = await storage.getProducts(category, search);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProductBySlug(req.params.slug);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  });

  // Seed endpoint for mock data
  app.post(api.products.seed.path, async (req, res) => {
    const mockProducts = [
      {
        slug: "wireless-earbuds-pro",
        name: "Wireless Earbuds Pro",
        description: "High-quality wireless earbuds with noise cancellation.",
        longDescription: "Experience the ultimate sound quality with our Wireless Earbuds Pro. Featuring active noise cancellation, 24-hour battery life, and a comfortable ergonomic design.",
        price: "4500",
        originalPrice: "6000",
        images: ["https://placehold.co/600x400/png"],
        category: "Electronics",
        subCategory: "Audio",
        inStock: true,
        stockCount: 50,
        rating: "4.5",
        reviewCount: 120,
        features: ["Active Noise Cancellation", "24h Battery", "Water Resistant"]
      },
      {
        slug: "smart-watch-series-5",
        name: "Smart Watch Series 5",
        description: "Track your fitness and stay connected.",
        longDescription: "The Smart Watch Series 5 helps you stay active, healthy, and connected. Track your workouts, monitor your heart rate, and get notifications on your wrist.",
        price: "8500",
        originalPrice: "10000",
        images: ["https://placehold.co/600x400/png"],
        category: "Electronics",
        subCategory: "Wearables",
        inStock: true,
        stockCount: 30,
        rating: "4.8",
        reviewCount: 85,
        features: ["Heart Rate Monitor", "GPS", "Sleep Tracking"]
      },
      {
        slug: "classic-leather-wallet",
        name: "Classic Leather Wallet",
        description: "Premium genuine leather wallet for men.",
        price: "1500",
        originalPrice: "2000",
        images: ["https://placehold.co/600x400/png"],
        category: "Fashion",
        subCategory: "Accessories",
        inStock: true,
        stockCount: 100,
        rating: "4.2",
        reviewCount: 45,
        features: ["Genuine Leather", "RFID Blocking", "Slim Design"]
      }
    ];

    await storage.seedProducts(mockProducts);
    res.status(201).json({ message: "Database seeded successfully", count: mockProducts.length });
  });

  // === CART ===
  app.get(api.cart.get.path, async (req, res) => {
    const items = await storage.getCartItems(req.params.sessionId);
    res.json(items);
  });

  app.post(api.cart.addItem.path, async (req, res) => {
    try {
      const input = api.cart.addItem.input.parse(req.body);
      const item = await storage.addToCart(input);
      res.status(200).json(item);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      throw err;
    }
  });

  app.patch(api.cart.updateItem.path, async (req, res) => {
    const id = parseInt(req.params.id);
    const quantity = req.body.quantity;
    const item = await storage.updateCartItemQuantity(id, quantity);
    if (!item) return res.status(404).json({ message: "Item not found" });
    res.json(item);
  });

  app.delete(api.cart.removeItem.path, async (req, res) => {
    await storage.removeFromCart(parseInt(req.params.id));
    res.status(204).send();
  });

  app.delete(api.cart.clear.path, async (req, res) => {
    await storage.clearCart(req.params.sessionId);
    res.status(204).send();
  });

  return httpServer;
}
