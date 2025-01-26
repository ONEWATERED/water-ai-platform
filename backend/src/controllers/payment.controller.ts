import { Request, Response } from 'express';
import { paymentService } from '../services/payment.service';

export const paymentController = {
  async createCoursePayment(req: Request, res: Response) {
    try {
      const userId = req.user.id; // From authentication middleware
      const { courseId, enrollmentType } = req.body;

      const paymentResult = await paymentService.createCoursePayment(
        userId, 
        courseId, 
        enrollmentType
      );

      if (paymentResult.success) {
        res.status(201).json({
          clientSecret: paymentResult.paymentIntentId,
          amount: paymentResult.amount,
          currency: paymentResult.currency
        });
      } else {
        res.status(400).json({ 
          error: paymentResult.errorMessage 
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Payment initialization failed' });
    }
  },

  async confirmCoursePayment(req: Request, res: Response) {
    try {
      const { paymentIntentId } = req.body;

      const paymentResult = await paymentService.confirmCoursePayment(
        paymentIntentId
      );

      if (paymentResult.success) {
        res.status(200).json({
          message: 'Payment confirmed',
          enrollmentDetails: paymentResult
        });
      } else {
        res.status(400).json({ 
          error: paymentResult.errorMessage 
        });
      }
    } catch (error) {
      res.status(500).json({ error: 'Payment confirmation failed' });
    }
  },

  async handleStripeWebhook(req: Request, res: Response) {
    try {
      const signature = req.headers['stripe-signature'] as string;
      const result = await paymentService.handleWebhook(
        req.rawBody, 
        signature
      );

      if (result.received) {
        res.status(200).send('Webhook received');
      } else {
        res.status(400).send('Webhook error');
      }
    } catch (error) {
      res.status(500).send('Webhook processing failed');
    }
  }
};
