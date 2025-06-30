// Client-side logging utility for Django-Next
export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  context: string;
  message: string;
  data?: any;
  error?: Error;
}

export interface LoggerConfig {
  level: LogLevel;
  enableConsole: boolean;
  enableStorage: boolean;
  maxStorageEntries: number;
  prefix: string;
}

class ClientLogger {
  private config: LoggerConfig;
  private context: string;
  private storage: LogEntry[] = [];

  constructor(context: string, config: Partial<LoggerConfig> = {}) {
    this.context = context;
    this.config = {
      level: LogLevel.INFO,
      enableConsole: true,
      enableStorage: false,
      maxStorageEntries: 1000,
      prefix: '[Django-Next]',
      ...config,
    };

    // Set level from environment or localStorage
    if (typeof window !== 'undefined') {
      const storedLevel = localStorage.getItem('django-next-log-level');
      if (storedLevel && !isNaN(Number(storedLevel))) {
        this.config.level = Number(storedLevel) as LogLevel;
      }
    }

    // Enable debug mode in development
    if (process.env.NODE_ENV === 'development') {
      this.config.level = Math.min(this.config.level, LogLevel.DEBUG);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    return level >= this.config.level;
  }

  private formatMessage(level: LogLevel, message: string): string {
    const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR'];
    const timestamp = new Date().toISOString();
    return `${this.config.prefix} ${timestamp} [${this.context}] ${levelNames[level]}: ${message}`;
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error): void {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      context: this.context,
      message,
      data,
      error,
    };

    // Store in memory if enabled
    if (this.config.enableStorage) {
      this.storage.push(entry);
      if (this.storage.length > this.config.maxStorageEntries) {
        this.storage.shift();
      }
    }

    // Console logging
    if (this.config.enableConsole) {
      const formattedMessage = this.formatMessage(level, message);
      
      switch (level) {
        case LogLevel.DEBUG:
          console.debug(formattedMessage, data);
          break;
        case LogLevel.INFO:
          console.info(formattedMessage, data);
          break;
        case LogLevel.WARN:
          console.warn(formattedMessage, data);
          break;
        case LogLevel.ERROR:
          console.error(formattedMessage, data, error);
          if (error?.stack) {
            console.error(error.stack);
          }
          break;
      }
    }
  }

  debug(message: string, data?: any): void {
    this.log(LogLevel.DEBUG, message, data);
  }

  info(message: string, data?: any): void {
    this.log(LogLevel.INFO, message, data);
  }

  warn(message: string, data?: any): void {
    this.log(LogLevel.WARN, message, data);
  }

  error(message: string, error?: Error | any, data?: any): void {
    const errorObj = error instanceof Error ? error : new Error(String(error));
    this.log(LogLevel.ERROR, message, data, errorObj);
  }

  // Utility methods
  setLevel(level: LogLevel): void {
    this.config.level = level;
    if (typeof window !== 'undefined') {
      localStorage.setItem('django-next-log-level', String(level));
    }
  }

  getLevel(): LogLevel {
    return this.config.level;
  }

  getLogs(): LogEntry[] {
    return [...this.storage];
  }

  clearLogs(): void {
    this.storage = [];
  }

  exportLogs(): string {
    return JSON.stringify(this.storage, null, 2);
  }

  // Performance logging
  time(label: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.time(`${this.config.prefix} [${this.context}] ${label}`);
    }
  }

  timeEnd(label: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.timeEnd(`${this.config.prefix} [${this.context}] ${label}`);
    }
  }

  // Group logging
  group(label: string): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.group(`${this.config.prefix} [${this.context}] ${label}`);
    }
  }

  groupEnd(): void {
    if (this.shouldLog(LogLevel.DEBUG)) {
      console.groupEnd();
    }
  }
}

// Global logger configuration
let globalConfig: Partial<LoggerConfig> = {};

export function configureLogging(config: Partial<LoggerConfig>): void {
  globalConfig = { ...globalConfig, ...config };
}

export function createLogger(context: string, config?: Partial<LoggerConfig>): ClientLogger {
  return new ClientLogger(context, { ...globalConfig, ...config });
}

// Default logger instance
export const logger = createLogger('django-next-client');

// Convenience functions for common logging patterns
export function logApiCall(method: string, url: string, data?: any): void {
  logger.debug(`API Call: ${method.toUpperCase()} ${url}`, data);
}

export function logApiResponse(method: string, url: string, status: number, data?: any): void {
  logger.debug(`API Response: ${method.toUpperCase()} ${url} - ${status}`, data);
}

export function logApiError(method: string, url: string, error: any): void {
  logger.error(`API Error: ${method.toUpperCase()} ${url}`, error);
}

export function logAuthEvent(event: string, data?: any): void {
  logger.info(`Auth Event: ${event}`, data);
}

export function logFileUpload(filename: string, size: number, progress?: number): void {
  const message = progress !== undefined 
    ? `File Upload Progress: ${filename} - ${progress}%`
    : `File Upload Started: ${filename} (${size} bytes)`;
  logger.debug(message);
}

// Error boundary logging
export function logReactError(error: Error, errorInfo: any): void {
  logger.error('React Error Boundary', error, errorInfo);
}

// Performance monitoring
export function logPerformance(operation: string, duration: number, data?: any): void {
  logger.debug(`Performance: ${operation} took ${duration}ms`, data);
}
