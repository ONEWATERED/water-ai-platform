# Water.AI Platform Secrets Management

## Environment Variables Guide

### 1. Database Connection (DATABASE_URL)
- Use a secure PostgreSQL connection string
- Format: `postgresql://username:password@host:port/database`
- Recommended: Separate databases for production, staging, development

#### Example
```
postgresql://waterai_user:securepassword123@postgres.example.com:5432/water_ai_db
```

### 2. NextAuth Authentication Secret (NEXTAUTH_SECRET)
- Cryptographically secure random string
- Used for encrypting tokens and signing
- Generate using: `openssl rand -base64 32`

#### Best Practices
- Never commit to version control
- Rotate periodically
- Use different secrets for different environments

### 3. Stripe API Key (STRIPE_SECRET_KEY)
- Obtain from Stripe Dashboard
- Use test keys for development
- Separate keys for production and testing

#### Key Types
- `sk_test_*`: Development/Sandbox
- `sk_live_*`: Production

### Security Recommendations
- Use environment-specific configurations
- Store secrets in secure vault
- Implement secret rotation
- Limit access to production secrets

### Generating Secrets
```bash
# Database Password
openssl rand -base64 12

# NextAuth Secret
openssl rand -base64 32

# Stripe Test Key
openssl rand -hex 16
```

### Monitoring
- Track secret usage
- Set up alerts for unauthorized access
- Regularly audit secret distribution

## Contact
- Security Team: security@water.ai
- Platform Maintainers: support@water.ai
