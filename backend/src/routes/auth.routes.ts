import { Router } from 'express';
import { 
  registerUser, 
  loginUser, 
  verifyEmail, 
  forgotPassword, 
  resetUserPassword,
  resendVerificationEmail
} from '../controllers/auth.controller';

const router = Router();

// Authentication Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerificationEmail);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetUserPassword);

export default router;
