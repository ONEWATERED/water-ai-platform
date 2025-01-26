import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRATION = '7d';

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
}

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

export const comparePasswords = async (
  plainPassword: string, 
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { 
    expiresIn: JWT_EXPIRATION 
  });
};

export const verifyAccessToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch (error) {
    return null;
  }
};

export const createUserVerification = async (
  userId: string, 
  email: string
) => {
  const verificationToken = generateVerificationToken();
  
  await prisma.user.update({
    where: { id: userId },
    data: {
      verificationToken,
      verificationExpires: new Date(Date.now() + 24 * 60 * 60 * 1000) // 24 hours
    }
  });

  return verificationToken;
};

export const validateVerificationToken = async (
  token: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      verificationToken: token,
      verificationExpires: { gt: new Date() }
    }
  });

  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
        verificationExpires: null
      }
    });

    return true;
  }

  return false;
};

export const generatePasswordResetToken = async (
  email: string
): Promise<string | null> => {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return null;

  const resetToken = crypto.randomBytes(32).toString('hex');
  
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetPasswordToken: resetToken,
      resetPasswordExpires: new Date(Date.now() + 3600000) // 1 hour
    }
  });

  return resetToken;
};

export const resetPassword = async (
  token: string, 
  newPassword: string
): Promise<boolean> => {
  const user = await prisma.user.findFirst({
    where: {
      resetPasswordToken: token,
      resetPasswordExpires: { gt: new Date() }
    }
  });

  if (!user) return false;

  const hashedPassword = await hashPassword(newPassword);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetPasswordToken: null,
      resetPasswordExpires: null
    }
  });

  return true;
};
