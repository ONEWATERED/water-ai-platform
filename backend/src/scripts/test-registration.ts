import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { generateToken, generateExpirationTime } from '../utils/token';
import { sendEmail } from '../utils/email';

const prisma = new PrismaClient();

async function testRegistration() {
  try {
    // Generate test user data
    const email = `test-user-${Date.now()}@onewater.ai`;
    const password = 'TestPassword123!';
    const name = 'Test User';

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate verification token
    const verificationToken = generateToken();
    const verificationExpires = generateExpirationTime(24);

    // Create user in database
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        verificationToken,
        verificationExpires,
        profile: {
          create: {
            bio: '',
            avatar: '',
          },
        },
      },
      include: {
        profile: true,
      },
    });

    // Prepare verification link
    const verificationLink = `http://localhost:3004/auth/verify-email?token=${verificationToken}`;

    // Send verification email
    await sendEmail(
      email, 
      'Verify Your Email', 
      `
      <h1>Email Verification</h1>
      <p>Click the link below to verify your email:</p>
      <a href="${verificationLink}">${verificationLink}</a>
      <p>This link will expire in 24 hours.</p>
      `
    );

    console.log('Test Registration Successful:');
    console.log('User Email:', email);
    console.log('Verification Token:', verificationToken);
    console.log('Verification Link:', verificationLink);

    // Optional: Verify token exists in database
    const storedUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { verificationToken: true }
    });

    console.log('Token stored in database:', !!storedUser?.verificationToken);

  } catch (error) {
    console.error('Registration test failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Immediately invoke the function
testRegistration();
