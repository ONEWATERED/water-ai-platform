import nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

// Microsoft Office 365 SMTP Configuration
export const createEmailTransporter = (): Transporter => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: false, // Use TLS
    auth: {
      user: process.env.EMAIL_USER, 
      pass: process.env.EMAIL_PASS  
    },
    requireTLS: true
  });
};

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    // Validate environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error('Email configuration is missing. Please set EMAIL_USER and EMAIL_PASS in .env');
    }

    const transporter = createEmailTransporter();
    
    const mailOptions = {
      from: `"MultiModule Platform" <${process.env.EMAIL_USER}>`, 
      to, 
      subject, 
      html, 
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully');
    console.log('Message ID:', info.messageId);
    
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
