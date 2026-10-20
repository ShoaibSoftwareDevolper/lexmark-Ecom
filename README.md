# lexmark-Ecom

Modern industrial-design audio e-commerce web application.

## Tech Stack

- Framework: Next.js 16 (App Router)
- Language: JavaScript (ES6+)
- Styling: Tailwind CSS v4 with custom CSS design tokens
- Icons: Lucide React
- Fonts: Google Fonts (Poppins, Playfair Display)
- State Management: React Context API (StoreContext) with LocalStorage persistence

## Architecture & Backend Readiness

The application is completely decoupled and ready for full backend integration:

- Single Source of Truth: All store catalog data, navigation links, hero banners, brand categories, product details, and footer configurations reside in `src/data/siteData.js`.
- Component Decoupling: No UI component or section contains hardcoded product or copy data; all components receive typed data through props.
- API Route: A live Next.js route handler is implemented at `src/app/api/content/route.js`. It serves the full website dataset (`GET /api/content`) and section-specific data (`GET /api/content?section={sectionName}`).
- Seamless Migration: Connecting an external database, CMS, or backend service (Node.js, Express, Django, Laravel, Supabase, Firebase) only requires updating `siteData.js` or fetching directly from your backend endpoints without modifying UI components.

## Project Structure

```
src/
├── app/                  # Next.js App Router (pages, layout, metadata, styles, API routes)
│   ├── about/            # About page route
│   ├── api/
│   │   └── content/      # REST API route handler (/api/content)
│   ├── checkout/         # Checkout page route
│   ├── globals.css       # Design tokens, variables and animations
│   ├── icon.js           # Dynamic SVG favicon
│   ├── layout.js         # Root layout with font definitions and providers
│   └── page.js           # Homepage passing centralized data into sections
├── components/
│   ├── layout/           # Global wrappers (Navbar, Footer, CartDrawer, SearchModal)
│   ├── sections/         # Feature sections (Hero, Categories, FeaturedProducts, SpotlightProducts, Checkout)
│   └── ui/               # Reusable atomic UI elements (Logo, ProductCard, CategoryCard, etc.)
├── context/
│   └── StoreContext.jsx  # Global cart state and modal management
├── data/
│   └── siteData.js       # Centralized dataset ready for backend replacement
└── lib/
    └── utils.js          # Shared utility functions (class merging, price formatting)
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to view the application.

Build for production:

```bash
npm run build
```
