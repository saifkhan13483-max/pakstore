import { pgTable, text, serial, integer, boolean, timestamp, jsonb, numeric } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  slug: text("slug").unique().notNull(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  longDescription: text("long_description"),
  price: numeric("price").notNull(), // Stored as numeric for precision
  originalPrice: numeric("original_price"), // For discounts
  images: text("images").array().notNull(),
  category: text("category").notNull(),
  subCategory: text("sub_category"),
  inStock: boolean("in_stock").default(true).notNull(),
  stockCount: integer("stock_count").default(0).notNull(),
  rating: numeric("rating").default("0"),
  reviewCount: integer("review_count").default(0),
  features: jsonb("features"), // Array of strings or objects
  createdAt: timestamp("created_at").defaultNow(),
});

export const cartItems = pgTable("cart_items", {
  id: serial("id").primaryKey(),
  sessionId: text("session_id").notNull(), // For guest checkout
  productId: integer("product_id").notNull(),
  quantity: integer("quantity").notNull().default(1),
  createdAt: timestamp("created_at").defaultNow(),
});

// === SCHEMAS ===

export const insertProductSchema = createInsertSchema(products).omit({ 
  id: true, 
  createdAt: true 
});

export const insertCartItemSchema = createInsertSchema(cartItems).omit({ 
  id: true, 
  createdAt: true 
});

// === TYPES ===

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = z.infer<typeof insertCartItemSchema>;

// Request/Response Types
export type ProductResponse = Product;
export type CartItemResponse = CartItem & { product?: Product }; // Cart item with product details
