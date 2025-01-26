import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testEmailVerification() {
  try {
    // First, find an unverified user with a valid verification token
    const user = await prisma.user.findFirst({
      where: {
        isEmailVerified: false,
        verificationToken: { not: null },
        verificationExpires: { gte: new Date() }
      }
    });

    if (!user) {
      console.error('No unverified users found. Run test-registration.ts first.');
      return;
    }

    console.log('Found unverified user:');
    console.log('Email:', user.email);
    console.log('Verification Token:', user.verificationToken);

    // Verify the email
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        isEmailVerified: true,
        verificationToken: null,
        verificationExpires: null
      }
    });

    console.log('Email verification successful:');
    console.log('User ID:', updatedUser.id);
    console.log('Email Verified:', updatedUser.isEmailVerified);

    // Attempt to log in (simulating frontend login flow)
    if (!updatedUser.isEmailVerified) {
      console.error('Login should be blocked for unverified users');
    } else {
      console.log('User can now log in');
    }

  } catch (error) {
    console.error('Email verification test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Immediately invoke the function
testEmailVerification();
