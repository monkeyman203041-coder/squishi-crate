# squishi-crate

Headless Shopify storefront scaffold for Squishis (Next.js + Tailwind) — pushed by Copilot.

This repo contains a minimal, working Next.js storefront that uses the Shopify Storefront API. It includes a simple shipping-rates flow (create checkout -> fetch shipping rates -> apply shipping rate -> redirect to Shopify Checkout) and a pastel, child-friendly theme.

## Quick start

1. Clone:
   git clone https://github.com/monkeyman203041-coder/squishi-crate
2. cd squishi-crate
3. npm install
4. Create `.env.local` with:

   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-shop-name.myshopify.com
   SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-storefront-access-token

   - Create a Shopify store (or use an existing one).
   - In Shopify Admin: Apps -> Develop apps -> create an app -> configure Storefront API scopes (read_products, unauthenticated_read_product_listings, unauthenticated_write_checkouts, read_checkouts, write_checkouts) and generate a Storefront access token.

5. Run locally:
   npm run dev
   Open http://localhost:3000

## Notes on shipping & taxes

- Shipping rates are configured in your Shopify Admin (Settings -> Shipping and delivery). Create Shipping profiles and zones, and add flat rates or carrier-calculated rates.
- Taxes are handled by Shopify when the checkout is created/updated. Make sure in Shopify Admin:
  - Settings -> Taxes and duties: enable taxes for the regions you sell to.
  - Products: set "Charge taxes on this product" where applicable.
- The storefront flow in this scaffold creates a checkout and reads available shipping rates using the Storefront API. For accurate estimates, the checkout must have a shipping address set; this scaffold shows a simple estimate path and returns the available shipping rates. You may want to enhance the flow to first set the shippingAddress on the checkout using the storefront API.

## What I implemented for you

- Next.js + TypeScript scaffold with Tailwind and a pastel palette (soft pink/blue/yellow) for a kid-friendly look.
- Product listing (pulls from your Shopify store once env vars are set) and product page.
- Server-side API endpoints for creating a checkout, fetching shipping rates, and applying a shipping rate before redirecting to Shopify Checkout.
- Placeholder logo and hero image (replace `/public/hero.jpg` and `/public/logo.svg` with your images).

## Next steps you can ask me to do

- I can wire up a cart page (persisting multiple line items), a full shipping address form, and improved validation.
- I can add analytics, SEO meta, and social preview tags.
- I can deploy this to Vercel and set environment variables for you.

If you want me to run tests against your Shopify store (to confirm shipping/tax results), provide the store domain and a temporary Storefront access token and I will run a quick test and report back.
