import Stripe from 'stripe';
import { PrismaClient } from '@prisma/client';
import { logger } from '../utils/logger'; // Assume a centralized logging utility

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export interface PaymentResult {
  success: boolean;
  paymentIntentId?: string;
  amount?: number;
  currency?: string;
  status?: string;
  errorMessage?: string;
}

export const paymentService = {
  async createCoursePayment(
    userId: string, 
    courseId: string, 
    enrollmentType: 'FULL' | 'INSTALLMENT'
  ): Promise<PaymentResult> {
    try {
      // Fetch course details
      const course = await prisma.course.findUnique({
        where: { id: courseId }
      });

      if (!course) {
        throw new Error('Course not found');
      }

      // Calculate payment amount
      const baseAmount = course.price;
      const amount = enrollmentType === 'INSTALLMENT' 
        ? baseAmount * 1.1 / 3  // 10% markup for installments
        : baseAmount;

      // Create Stripe Payment Intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: 'usd',
        metadata: {
          userId,
          courseId,
          enrollmentType
        },
        payment_method_types: ['card']
      });

      return {
        success: true,
        paymentIntentId: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      };
    } catch (error: any) {
      console.error('Payment creation error:', error);
      return {
        success: false,
        errorMessage: error.message || 'Payment creation failed'
      };
    }
  },

  async confirmCoursePayment(
    paymentIntentId: string
  ): Promise<PaymentResult> {
    try {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

      // Validate payment
      if (paymentIntent.status !== 'succeeded') {
        throw new Error('Payment not completed');
      }

      const { userId, courseId, enrollmentType } = paymentIntent.metadata;

      // Create enrollment record
      const enrollment = await prisma.courseEnrollment.create({
        data: {
          userId,
          courseId,
          enrollmentType: enrollmentType as 'FULL' | 'INSTALLMENT',
          status: 'ACTIVE'
        }
      });

      return {
        success: true,
        paymentIntentId,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status
      };
    } catch (error: any) {
      console.error('Payment confirmation error:', error);
      return {
        success: false,
        errorMessage: error.message || 'Payment confirmation failed'
      };
    }
  },

  async handleWebhook(rawBody: Buffer, signature: string) {
    try {
      // Validate webhook signature only in production
      if (process.env.NODE_ENV === 'production') {
        stripe.webhooks.constructEvent(
          rawBody,
          signature,
          process.env.STRIPE_WEBHOOK_SECRET!
        );
      }

      const event = JSON.parse(rawBody.toString());

      // Comprehensive webhook event logging
      logger.info('Stripe Webhook Received', {
        type: event.type,
        id: event.id,
        timestamp: new Date().toISOString()
      });

      switch (event.type) {
        case 'payment_intent.succeeded':
          await this.handleSuccessfulPayment(event.data.object);
          break;
        
        case 'payment_intent.payment_failed':
          await this.handleFailedPayment(event.data.object);
          break;

        case 'charge.refunded':
          await this.handleRefund(event.data.object);
          break;

        default:
          logger.warn('Unhandled Stripe webhook event', { 
            type: event.type 
          });
      }

      return { received: true };
    } catch (error: any) {
      // Advanced error logging
      logger.error('Webhook processing error', {
        message: error.message,
        stack: error.stack,
        type: error.type
      });

      // Differentiate between signature errors and processing errors
      if (error.message.includes('signature')) {
        throw new Error('Invalid webhook signature');
      }

      return { received: false, error: error.message };
    }
  },

  async handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
    try {
      const { userId, courseId, enrollmentType } = paymentIntent.metadata;

      // Idempotency check to prevent duplicate processing
      const existingEnrollment = await prisma.courseEnrollment.findUnique({
        where: {
          userId_courseId: { userId, courseId }
        }
      });

      if (existingEnrollment) {
        logger.warn('Duplicate payment webhook', { 
          userId, 
          courseId 
        });
        return;
      }

      const enrollment = await prisma.courseEnrollment.create({
        data: {
          userId,
          courseId,
          enrollmentType: enrollmentType as 'FULL' | 'INSTALLMENT',
          status: 'ACTIVE'
        }
      });

      // Optional: Send confirmation email or notification
      // await notificationService.sendEnrollmentConfirmation(enrollment);

      logger.info('Course enrollment completed', { 
        enrollmentId: enrollment.id 
      });
    } catch (error) {
      logger.error('Failed to process successful payment', {
        paymentIntentId: paymentIntent.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  },

  async handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
    try {
      const { userId, courseId } = paymentIntent.metadata;

      // Log payment failure
      logger.warn('Payment failed', { 
        userId, 
        courseId, 
        reason: paymentIntent.last_payment_error?.message 
      });

      // Optional: Send failure notification
      // await notificationService.sendPaymentFailureNotification(userId, courseId);
    } catch (error) {
      logger.error('Error handling failed payment', {
        paymentIntentId: paymentIntent.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  },

  async handleRefund(charge: Stripe.Charge) {
    try {
      // Handle refund logic
      logger.info('Refund processed', { 
        chargeId: charge.id 
      });
    } catch (error) {
      logger.error('Refund processing error', {
        chargeId: charge.id,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
};
