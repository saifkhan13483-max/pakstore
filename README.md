# PakStore E-Commerce Platform

PakStore is a premium e-commerce platform tailored for the Pakistani market, providing a seamless shopping experience for electronics, fashion, and lifestyle products.

## Features

- **Localized Checkout**: Custom checkout flow with Pakistani city selection and mobile number validation.
- **Payment Methods**: Primary support for Cash on Delivery (COD), with bank transfer options.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop viewing.
- **Dynamic Product Catalog**: Search, filter, and sort products across multiple categories.
- **Cart Management**: Persistent shopping cart using local storage.
- **Performance Optimized**: Loading skeletons and optimized image handling for better user experience.

## Tech Stack

- **Frontend**: React 18, Vite, Wouter (Routing), TanStack Query
- **UI Components**: Shadcn UI, Tailwind CSS, Lucide React
- **Backend**: Express 5 (Node.js)
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod (for both API and Form validation)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   ```
4. Seed the database (optional):
   The application provides a "Seed Database" button on the home page if no products are found.

### Development

Run the development server:
```bash
npm run dev
```
The application will be available at `http://localhost:5000`.

## Deployment

This project is ready for deployment on Replit or Vercel.

- **Replit**: Use the built-in "Publish" feature.
- **Vercel**: Connect your repository and it will automatically detect the Vite/Express setup.

## Pakistani Market Focus

- **Currency**: All prices are displayed in PKR (Rs.).
- **Shipping**: Free delivery threshold (Rs. 2,000) and flat-rate nationwide shipping.
- **Validation**: Pakistani mobile number formats (+92 3XX XXXXXXX).
- **Cities**: Pre-populated list of major Pakistani cities for accurate delivery.

## License

MIT
