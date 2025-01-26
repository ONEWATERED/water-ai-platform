# Stripe Webhook Setup Guide

## Prerequisites
- Stripe Account
- Stripe CLI (recommended for local development)
- Backend server running

## Local Development Setup

### 1. Install Stripe CLI
```bash
brew install stripe/stripe-cli/stripe
```

### 2. Login to Stripe
```bash
stripe login
```

### 3. Forward Webhooks to Local Server
```bash
stripe listen --forward-to localhost:3000/api/payments/webhook
```

## Production Webhook Configuration

### Webhook Events to Enable
- `payment_intent.succeeded`
- `payment_intent.payment_failed`

### Recommended Webhook Endpoint
`https://yourdomain.com/api/payments/webhook`

## Security Considerations
1. Always validate webhook signatures
2. Use environment-specific webhook secrets
3. Implement robust error handling
4. Log webhook events for debugging

## Troubleshooting
- Verify webhook secret matches in `.env`
- Check network connectivity
- Validate Stripe account permissions

## Sample Webhook Payload Handling
```typescript
async function handleWebhook(event) {
  switch (event.type) {
    case 'payment_intent.succeeded':
      // Handle successful payment
      break;
    case 'payment_intent.payment_failed':
      // Handle payment failure
      break;
  }
}
```

## Recommended Monitoring
- Set up Stripe Dashboard alerts
- Implement comprehensive logging
- Create webhook event tracking
