# Water.AI Platform Vercel Project Configuration Guide

## Project Setup Checklist

### 1. Framework Preset
- Framework: Next.js
- Root Directory: `/`

### 2. Build Configuration
```
- Build Command: `npm run build`
- Output Directory: `frontend/.next`
- Install Command: `npm install`
- Development Command: `npm run dev`
```

### 3. Environment Variables
Required Variables:
1. `DATABASE_URL`
   - PostgreSQL connection string
   - Example: `postgresql://username:password@host:port/database`

2. `NEXTAUTH_SECRET`
   - Secure random string
   - Generate with: `openssl rand -base64 32`

3. `STRIPE_SECRET_KEY`
   - Stripe API secret key
   - From Stripe Dashboard

### 4. Deployment Scopes
- Production: Main branch deployments
- Preview: Feature branch deployments

### 5. Performance Optimizations
- Enable Image Optimization
- Configure Web Vitals monitoring
- Set up automatic performance insights

### 6. Domain Configuration
- Custom domain: water.ai
- SSL/TLS certificate auto-provisioning
- Www and apex domain redirects

### Troubleshooting
- Check build logs
- Verify environment variables
- Ensure GitHub repository access

### Support Contacts
- Vercel Support: support@vercel.com
- Project Maintainers: contact@water.ai
