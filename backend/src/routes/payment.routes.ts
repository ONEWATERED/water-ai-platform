import express from 'express';
import { paymentController } from '../controllers/payment.controller';
import { authenticateUser } from '../middleware/auth.middleware';

const router = express.Router();

// Protected Payment Routes
router.post('/course/initialize', 
  authenticateUser, 
  paymentController.createCoursePayment
);

router.post('/course/confirm', 
  authenticateUser, 
  paymentController.confirmCoursePayment
);

// Stripe Webhook (Unprotected, uses signature verification)
router.post('/webhook', 
  express.raw({ type: 'application/json' }),
  paymentController.handleStripeWebhook
);

export default router;
