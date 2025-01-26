# Water.AI Platform Vercel Deployment Guide

## Prerequisites
- Vercel Account
- GitHub Repository
- Vercel CLI installed

## Deployment Steps

### 1. Project Setup
1. Link GitHub Repository
   ```bash
   vercel
   # Follow interactive prompts
   # - Connect to GitHub
   # - Select water-ai-platform repository
   # - Confirm project settings
   ```

### 2. Environment Configuration
Set environment variables in Vercel:
- Go to Vercel Dashboard
- Select Project > Settings > Environment Variables
- Add the following:
  - `DATABASE_URL`: PostgreSQL connection string
  - `NEXTAUTH_SECRET`: Secure random string
  - `STRIPE_SECRET_KEY`: Stripe API secret key

### 3. Monorepo Configuration
Vercel configuration in `vercel.json`:
- Defines build and routing for frontend and backend
- Specifies output directories
- Configures API routes

### 4. Deployment Commands
```bash
# Initial deployment
vercel

# Production deployment
vercel --prod
```

### 5. Post-Deployment Checks
- Verify frontend is accessible
- Test API routes
- Check environment variables
- Monitor deployment logs

## Troubleshooting
- Check Vercel deployment logs
- Verify GitHub Actions CI passes
- Ensure all environment variables are set

## Custom Domain
1. Purchase domain (e.g., water.ai)
2. In Vercel Dashboard:
   - Project > Settings > Domains
   - Add custom domain
   - Follow DNS configuration instructions

## Recommended Monitoring
- Vercel Analytics
- GitHub Actions CI/CD
- Stripe Webhook Logs

## Continuous Deployment
- Automatic deployments on GitHub push
- Preview deployments for pull requests
- Production deployments from main branch

## Security Recommendations
- Use environment-specific configurations
- Rotate secrets regularly
- Enable two-factor authentication

## Contact Support
- Vercel Support: support@vercel.com
- Project Maintainers: contact@water.ai
