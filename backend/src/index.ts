import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Import logging configuration
import { logger } from './utils/logger';
import { configureLogging } from './config/logging';

// Import routes
import authRoutes from './routes/auth.routes';
import courseRoutes from './routes/course.routes';
import courseFilterRoutes from './routes/course.filter.routes';
import paymentRoutes from './routes/payment.routes';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure logging
configureLogging(app);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/filter', courseFilterRoutes);
app.use('/api/payments', paymentRoutes);

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

async function main() {
  try {
    await prisma.$connect();
    logger.info('Database connection established', {
      host: process.env.DATABASE_URL?.split('@')[1],
      environment: process.env.NODE_ENV
    });
    
    app.listen(port, () => {
      logger.info(`Server started successfully`, {
        port,
        pid: process.pid,
        environment: process.env.NODE_ENV
      });
    });
  } catch (error) {
    logger.error('Server initialization failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    process.exit(1);
  }
}

main()
  .catch((e) => {
    logger.error('Unhandled server initialization error', {
      error: e instanceof Error ? e.message : 'Unknown error',
      stack: e instanceof Error ? e.stack : undefined
    });
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    logger.info('Prisma client disconnected');
  });
