# WEGE-Ecommerce App

is a modern e-commerce demo application showcasing Next.js 16's latest features including App Router, Server Components, and Turbopack. The app delivers a seamless shopping experience with real-time filtering, debounced search, and a persistent cart system. Built with a hybrid rendering approach, the application uses Static Generation for product pages and Server-Side Rendering for listings. Features include URL-persistent filters, skeleton loading states, TypeScript safety, and comprehensive testing with Jest and GitHub Actions CI.

  <h3 className="flex justify-center gap-x-4">
    <a
      href="https://wege-ecommerce-brown.vercel.app/"
      target="_blank"
      className="mt-3"
    >
      Live Demo 🚀
    </a>

## ✨ Features

- **Product Browsing**: Responsive grid layout with product cards
- **Advanced Filtering**: Filter by category and price range
- **Search Functionality**: Real-time search with debouncing
- **Shopping Cart**: Add/remove items, update quantities
- **Product Details**: Detailed product pages with specifications
- **Dark/Light Mode**: Full theme support
- **Responsive Design**: Mobile-first responsive design
- **State Persistence**: Cart saved to localStorage
- **Performance**: Server-side rendering for product listings
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel

## 🛠️ Tech Stack

- **Framework**: Next.js 16.0.7 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Icons**: Lucide React
- **Testing**: Jest + React Testing Library
- **Deployment**: Vercel (recommended)

## 🌐 API Routes

```
GET /api/products - Get all products with optional filtering

GET /api/products/[id] - Get single product by ID
```

## 🔄 Server-Side Rendering (SSR) & Static Generation

`src/app/product/[id]/page.tsx`

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/aliabodaraa/wege-ecommerce
   cd wege-ecommerce
   ```
2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   5.Open http://localhost:3000 in your browser.
   ```
