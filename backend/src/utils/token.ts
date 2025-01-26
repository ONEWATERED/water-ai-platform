import crypto from 'crypto';

export const generateToken = (bytes: number = 32): string => {
  return crypto.randomBytes(bytes).toString('hex');
};

export const generateExpirationTime = (hours: number = 24): Date => {
  return new Date(Date.now() + hours * 60 * 60 * 1000);
};
