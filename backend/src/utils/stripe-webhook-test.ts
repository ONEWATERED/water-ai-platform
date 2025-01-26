import Stripe from 'stripe';
import { paymentService } from '../services/payment.service';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function simulateStripeWebhook(
  eventType: 'payment_intent.succeeded' | 'payment_intent.payment_failed',
  paymentIntentId: string
) {
  try {
    // Retrieve the actual payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    // Create a mock webhook event
    const mockEvent = {
      type: eventType,
      data: {
        object: paymentIntent
      }
    };

    // Simulate webhook handling
    const result = await paymentService.handleWebhook(
      Buffer.from(JSON.stringify(mockEvent)),
      'test_signature'
    );

    console.log('Webhook Simulation Result:', result);
    return result;
  } catch (error) {
    console.error('Webhook Simulation Error:', error);
    throw error;
  }
}

// Utility function to create a test payment intent
export async function createTestPaymentIntent(
  amount: number, 
  courseId: string, 
  userId: string
) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: {
        courseId,
        userId,
        testMode: true
      }
    });

    return paymentIntent;
  } catch (error) {
    console.error('Test Payment Intent Creation Error:', error);
    throw error;
  }
}
