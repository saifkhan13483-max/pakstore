# PakStore E-Commerce Platform

## Overview

PakStore is a full-stack e-commerce application targeting the Pakistani market. It provides product browsing, shopping cart functionality, and a complete checkout experience with Cash on Delivery support. The platform is built with a React frontend and Express backend, using PostgreSQL for data persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript, using Vite as the build tool
- **Routing**: Wouter for client-side routing (lightweight alternative to React Router)
- **State Management**: TanStack Query (React Query) for server state; local cart state uses a custom hook with localStorage for session persistence
- **UI Components**: Shadcn UI component library built on Radix UI primitives with Tailwind CSS styling
- **Styling**: Tailwind CSS with custom design tokens for colors (emerald primary, navy secondary, orange accent) and typography (Inter for body, Poppins for headings)

### Backend Architecture
- **Framework**: Express 5 running on Node.js with TypeScript
- **API Design**: RESTful endpoints defined in `shared/routes.ts` with Zod schemas for request/response validation
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Build Process**: Custom build script using esbuild for server bundling and Vite for client bundling

### Data Storage
- **Database**: PostgreSQL accessed via Drizzle ORM
- **Schema Location**: `shared/schema.ts` contains all table definitions
- **Current Tables**:
  - `products`: Product catalog with pricing, images, categories, ratings
  - `cartItems`: Shopping cart items linked by session ID for guest checkout
- **Migrations**: Managed via Drizzle Kit with migrations output to `/migrations`

### Shared Code Pattern
- The `/shared` directory contains code used by both frontend and backend
- `schema.ts`: Database table definitions and Zod validation schemas
- `routes.ts`: API contract definitions with typed paths and response schemas
- Path aliases configured: `@/*` for client code, `@shared/*` for shared code

### Key Design Decisions

**Guest Checkout with Session IDs**
- Cart functionality uses client-generated session IDs stored in localStorage
- No user authentication required for browsing or cart operations
- Enables frictionless shopping experience common in Pakistani e-commerce

**Type-Safe API Contract**
- API routes defined once in `shared/routes.ts` with Zod schemas
- Both frontend hooks and backend handlers reference the same contract
- Provides compile-time and runtime validation

**Component Architecture**
- Layout components (Navbar, Footer) wrap page content
- Reusable product components (ProductCard) with consistent styling
- Shadcn UI components customized with Pakistani market branding

## External Dependencies

### Database
- **PostgreSQL**: Primary data store, connection via `DATABASE_URL` environment variable
- **Drizzle ORM**: Type-safe database queries with automatic schema inference

### UI Libraries
- **Radix UI**: Headless component primitives for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

### Data Fetching
- **TanStack Query**: Server state management with caching
- **Zod**: Runtime schema validation for API responses

### Build Tools
- **Vite**: Frontend development server and bundler
- **esbuild**: Server-side bundling for production
- **TypeScript**: Type checking across the entire codebase

### Replit-Specific
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay
- **@replit/vite-plugin-cartographer**: Development tooling
- **connect-pg-simple**: PostgreSQL session store (available for future auth)