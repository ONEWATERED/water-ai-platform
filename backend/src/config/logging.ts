import { logger, logStream } from '../utils/logger';
import morgan from 'morgan';
import express from 'express';

export function configureLogging(app: express.Application) {
  // Morgan HTTP request logging
  app.use(morgan('combined', { 
    stream: logStream,
    skip: (req, res) => res.statusCode < 400 // Only log errors in production
  }));

  // Global error handler with logging
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error('Unhandled Error', {
      message: err.message,
      stack: err.stack,
      path: req.path,
      method: req.method
    });

    res.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'production' 
        ? 'An unexpected error occurred' 
        : err.message
    });
  });

  // Logging for unhandled promise rejections
  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled Rejection', {
      reason: reason instanceof Error ? reason.message : reason,
      promise: promise.toString()
    });
  });

  // Logging for uncaught exceptions
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught Exception', {
      message: error.message,
      stack: error.stack
    });
    
    // Graceful shutdown
    process.exit(1);
  });
}

// Export logger for direct use in other modules
export { logger, logWithContext } from '../utils/logger';
