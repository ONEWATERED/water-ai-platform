# Water.AI Platform Deployment Guide

## Prerequisites
- Vercel Account
- GitHub Repository
- Stripe Account
- PostgreSQL Database (e.g., Supabase, Neon)

## Deployment Steps

### 1. Vercel Setup
1. Connect your GitHub repository to Vercel
2. Configure environment variables:
   - `DATABASE_URL`: PostgreSQL connection string
   - `STRIPE_SECRET_KEY`: Your Stripe secret key
   - `NEXTAUTH_SECRET`: Random secret for authentication
   - `NODE_ENV`: `production`

### 2. Environment Configuration
Create `.env` files for both frontend and backend with appropriate secrets.

### 3. Database Migrations
Run Prisma migrations on your production database:
```bash
npx prisma migrate deploy
```

### 4. Deployment Commands
```bash
# Install dependencies
npm install

# Build project
npm run build

# Deploy to Vercel
npm run deploy
```

## Post-Deployment Checklist
- Verify all environment variables
- Test authentication
- Check payment integration
- Monitor application logs

## Recommended Monitoring
- Vercel Dashboard
- Stripe Webhook Logs
- Database Performance Metrics

## Troubleshooting
- Check Vercel deployment logs
- Verify environment variable configurations
- Ensure database connectivity
