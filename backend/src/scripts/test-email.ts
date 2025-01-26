import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from the correct path
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

import { sendEmail } from '../utils/email';

async function testEmail() {
  try {
    console.log('Attempting to send test email...');
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email Host:', process.env.EMAIL_HOST);

    const result = await sendEmail(
      process.env.EMAIL_USER || 'Hardeep@onewater.AI', 
      'Test Email from MultiModule Platform', 
      '<h1>Email Configuration Test</h1><p>This is a test email to verify SMTP configuration.</p>'
    );

    console.log('Email sent successfully!');
    console.log('Message ID:', result.messageId);
  } catch (error) {
    console.error('Error sending test email:', error);
    console.error('Detailed error:', JSON.stringify(error, null, 2));
  }
}

// Immediately invoke the function
testEmail();
