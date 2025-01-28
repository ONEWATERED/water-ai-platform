import express from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = express.Router();

// Protected Payment Routes
router.post('/course/initialize', 
  authenticate, 
  paymentController.createCoursePayment
);

router.post('/course/confirm', 
  authenticate, 
  paymentController.confirmCoursePayment
);

// Stripe Webhook (Unprotected, uses signature verification)
router.post('/webhook', 
  express.raw({ type: 'application/json' }),
  paymentController.handleStripeWebhook
);

export default router;
