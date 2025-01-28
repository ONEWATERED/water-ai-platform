# Water.AI Platform Vercel Project Configuration Guide

## Project Setup Checklist

### 1. Framework Preset
> multimodule-webapp-frontend@0.1.0 build
> next build

 ✓ Creating an optimized production build  
 ✓ Compiled successfully
   Linting and checking validity of types  ..Failed to compile.

./src/app/videos/page.tsx:17:33
Type error: Type 'Set<string>' can only be iterated through when using the '--downlevelIteration' flag or with a '--target' of 'es2015' or higher.

  15 | export default function VideosPage() {
  16 |   const [selectedCategory, setSelectedCategory] = useState<string>('all');
> 17 |   const categories = ['all', ...new Set(videos.map(video => video.category))];
     |                                 ^
  18 |   
  19 |   const filteredVideos = selectedCategory === 'all' 
  20 |     ? videos
- Framework: Next.js
- Root Directory: `/`
cd backend
npm run create-admin==> Downloading https://formulae.brew.sh/api/cask.jws.json
==> Downloading https://raw.githubusercontent.com/Homebrew/homebrew-cask/cda6735129cd6bffa72cd5cdf6b7b870eccb9920/Casks/d/docker.rb
############################################################################################################################################ 100.0%
==> Downloading https://desktop.docker.com/mac/main/arm64/179585/Docker.dmg
############################################################################################################################################ 100.0%
==> Installing Cask docker
==> Moving App 'Docker.app' to '/Applications/Docker.app'
==> Linking Binary 'docker-compose.zsh-completion' to '/opt/homebrew/share/zsh/site-functions/_docker-compose'
==> Linking Binary 'docker-compose.fish-completion' to '/opt/homebrew/share/fish/vendor_completions.d/docker-compose.fish'
==> Linking Binary 'docker' to '/usr/local/bin/docker'
Password:Vercel CLI 39.3.0
? Set up and deploy “~/CascadeProjects/multimodule-webapp/frontend”? (Y/n)Y
Vercel CLI 39.3.0
? Set up and deploy “~/CascadeProjects/multimodule-webapp/frontend”? (Y/n)Vercel CLI 39.3.0
? Set up and deploy “~/CascadeProjects/multimodule-webapp/frontend”? (Y/n)Vercel CLI 39.3.0
? Log in to Vercel (Use arrow keys)
❯ Continue with GitHub
  Continue with GitLab
  Continue with Bitbucket
  Continue with Email
  Continue with SAML Single Sign-On
 ─────────────────────────────────
  CancelVercel CLI 39.3.0
  ? Log in to Vercel (Use arrow keys)
  ❯ Continue with GitHub
    Continue with GitLab
    Continue with Bitbucket
    Continue with Email
    Continue with SAML Single Sign-On
   ─────────────────────────────────
    Cancel
    Vercel CLI 39.3.0
    ? Set up and deploy “~/CascadeProjects/multimodule-webapp/frontend”? (Y/n)Y
    Vercel CLI 39.3.0
    ? Set up and deploy “~/CascadeProjects/multimodule-webapp/frontend”? (Y/n)Y
    cd /Users/apas/CascadeProjects/multimodule-webapp/frontend
    vercel
    Vercel CLI 39.3.0
    🔍  Inspect: https://vercel.com/hardeeps-projects-cddb01bd/onewater/ER2J2FNMViB4GdQWKdosDGqNJJy2 [3s]
    ✅  Production: https://onewater-raw4q46ho-hardeeps-projects-cddb01bd.vercel.app [3s]
    Error: Command "npm run build" exited with 1
    Error: Check your logs at https://onewater-raw4q46ho-hardeeps-projects-cddb01bd.vercel.app/_logs or run `vercel logs onewater-raw4q46ho-hardeeps-projects-cddb01bd.vercel.app`
    
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
