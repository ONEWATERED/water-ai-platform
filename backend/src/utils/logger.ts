import winston from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import path from 'path';

// Define log levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// Define log colors
const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'blue',
};
winston.addColors(colors);

// Create custom format
const customFormat = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
  winston.format.errors({ stack: true }),
  winston.format.splat(),
  winston.format.printf(({ 
    level, 
    message, 
    timestamp, 
    stack, 
    ...metadata 
  }) => {
    let msg = `${timestamp} [${level}]: ${message} `;
    
    // Add metadata if present
    if (Object.keys(metadata).length > 0) {
      msg += JSON.stringify(metadata, null, 2);
    }
    
    // Include stack trace for errors
    if (stack) {
      msg += `\n${stack}`;
    }
    
    return msg;
  })
);

// Console transport
const consoleTransport = new winston.transports.Console({
  format: winston.format.combine(
    winston.format.colorize({ all: true }),
    customFormat
  ),
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug'
});

// File transports for different log levels
const errorTransport = new DailyRotateFile({
  filename: path.join(process.cwd(), 'logs', 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d'
});

const combinedTransport = new DailyRotateFile({
  filename: path.join(process.cwd(), 'logs', 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'info',
  maxSize: '20m',
  maxFiles: '30d'
});

// Create logger
export const logger = winston.createLogger({
  levels,
  format: customFormat,
  transports: [
    consoleTransport,
    errorTransport,
    combinedTransport
  ],
  exceptionHandlers: [
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'exceptions.log') 
    })
  ],
  rejectionHandlers: [
    new winston.transports.File({ 
      filename: path.join(process.cwd(), 'logs', 'rejections.log') 
    })
  ]
});

// Stream for Morgan HTTP logging
export const logStream = {
  write: (message: string) => {
    logger.http(message.trim());
  }
};

// Utility function for structured logging
export function logWithContext(
  level: 'error' | 'warn' | 'info' | 'debug', 
  message: string, 
  context?: Record<string, any>
) {
  logger[level](message, context);
}
