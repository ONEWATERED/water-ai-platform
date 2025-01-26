import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { 
  hashPassword, 
  comparePasswords, 
  generateAccessToken, 
  createUserVerification,
  validateVerificationToken,
  generatePasswordResetToken,
  resetPassword
} from '../utils/auth';
import { sendEmail } from '../utils/email';

const prisma = new PrismaClient();

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profile: {
          create: {}  // Create an empty profile
        }
      }
    });

    // Generate verification token
    const verificationToken = await createUserVerification(user.id, email);

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(
      email, 
      'Verify Your Email', 
      `Click to verify your email: ${verificationLink}`
    );

    res.status(201).json({ 
      message: 'User registered successfully. Check your email for verification.',
      userId: user.id 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await comparePasswords(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check email verification
    if (!user.isEmailVerified) {
      return res.status(403).json({ message: 'Please verify your email' });
    }

    // Generate access token
    const token = generateAccessToken({
      userId: user.id,
      email: user.email,
      role: user.role
    });

    res.status(200).json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.body;

    const isValidToken = await validateVerificationToken(token);
    
    if (isValidToken) {
      res.status(200).json({ message: 'Email verified successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired verification token' });
    }
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({ message: 'Email verification failed' });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const resetToken = await generatePasswordResetToken(email);

    if (resetToken) {
      const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
      
      await sendEmail(
        email, 
        'Password Reset Request', 
        `Click to reset your password: ${resetLink}`
      );

      res.status(200).json({ message: 'Password reset link sent to your email' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Password reset failed' });
  }
};

export const resetUserPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const isReset = await resetPassword(token, newPassword);

    if (isReset) {
      res.status(200).json({ message: 'Password reset successfully' });
    } else {
      res.status(400).json({ message: 'Invalid or expired reset token' });
    }
  } catch (error) {
    console.error('Password reset error:', error);
    res.status(500).json({ message: 'Password reset failed' });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email } });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if user is already verified
    if (user.isEmailVerified) {
      return res.status(400).json({ message: 'Email is already verified' });
    }

    // Generate new verification token
    const verificationToken = await createUserVerification(user.id, email);

    // Send verification email
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`;
    await sendEmail(
      email, 
      'Verify Your Email - Resent', 
      `Click to verify your email: ${verificationLink}`
    );

    res.status(200).json({ 
      message: 'Verification email resent successfully' 
    });
  } catch (error) {
    console.error('Resend verification email error:', error);
    res.status(500).json({ message: 'Failed to resend verification email' });
  }
};
