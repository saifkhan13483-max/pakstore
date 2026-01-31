import { db } from "./db";
import {
  products,
  cartItems,
  type InsertProduct,
  type InsertCartItem,
  type Product,
  type CartItem,
} from "@shared/schema";
import { eq, and, desc } from "drizzle-orm";

export interface IStorage {
  // Products
  getProducts(category?: string, search?: string): Promise<Product[]>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  seedProducts(productsData: InsertProduct[]): Promise<void>;
  
  // Cart
  getCartItems(sessionId: string): Promise<(CartItem & { product: Product | null })[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Products
  async getProducts(category?: string, search?: string): Promise<Product[]> {
    let query = db.select().from(products);
    
    // Add filtering logic here if needed using .where()
    // For now returning all for simplicity in foundation phase
    
    return await query.orderBy(desc(products.createdAt));
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async seedProducts(productsData: InsertProduct[]): Promise<void> {
    await db.insert(products).values(productsData).onConflictDoNothing();
  }

  // Cart
  async getCartItems(sessionId: string): Promise<(CartItem & { product: Product | null })[]> {
    const items = await db.select().from(cartItems).where(eq(cartItems.sessionId, sessionId));
    
    // Fetch products for these items
    const result = await Promise.all(items.map(async (item) => {
      const [product] = await db.select().from(products).where(eq(products.id, item.productId));
      return { ...item, product: product || null };
    }));
    
    return result;
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const [existing] = await db.select()
      .from(cartItems)
      .where(and(
        eq(cartItems.sessionId, item.sessionId),
        eq(cartItems.productId, item.productId)
      ));

    if (existing) {
      const [updated] = await db.update(cartItems)
        .set({ quantity: existing.quantity + item.quantity })
        .where(eq(cartItems.id, existing.id))
        .returning();
      return updated;
    }

    const [newItem] = await db.insert(cartItems).values(item).returning();
    return newItem;
  }

  async updateCartItemQuantity(id: number, quantity: number): Promise<CartItem | undefined> {
    const [updated] = await db.update(cartItems)
      .set({ quantity })
      .where(eq(cartItems.id, id))
      .returning();
    return updated;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }
}

export const storage = new DatabaseStorage();
