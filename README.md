# Make Real Followers — SMM Panel Starter

Mobile-first SMM dashboard starter with a storefront, service catalog, order form, wallet UI, admin overview, and Express API scaffolding.

## Included
- Responsive dashboard matching the reference's premium card layout
- Demo services and client-side order flow
- Express backend routes for services, orders, wallet and payment webhook
- PostgreSQL schema
- UPI gateway integration boundary (provider-specific details must be configured)
- Provider API integration boundary (only connect legitimate/authorized marketing services)

## Run locally
1. Install Node.js 20+
2. `npm install`
3. Copy `.env.example` to `.env` and configure values
4. `npm run dev`
5. Open `http://localhost:3000`

This is a starter, not a production payment system. Never credit wallet funds from a browser callback or an unverified screenshot/UTR. Implement and test signed payment webhooks for your chosen gateway before accepting real money. Add authentication, rate limiting, CSRF protections where applicable, monitoring, and deployment secrets before launch.
