// logger.ts: Comprehensive logging utility for the CLI
import chalk from 'chalk';

export interface LogLevel {
  DEBUG: 0;
  INFO: 1;
  WARN: 2;
  ERROR: 3;
}

export const LOG_LEVELS: LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

export interface Logger {
  debug(message: string, meta?: any): void;
  info(message: string, meta?: any): void;
  warn(message: string, meta?: any): void;
  error(message: string, error?: any): void;
}

class CLILogger implements Logger {
  private context: string;
  private level: number;

  constructor(context: string, level: number = LOG_LEVELS.INFO) {
    this.context = context;
    this.level = level;
  }

  private formatMessage(level: string, message: string, meta?: any): string {
    const timestamp = new Date().toISOString();
    const contextStr = chalk.blue(`[${this.context}]`);
    const levelStr = this.getLevelColor(level)(`[${level}]`);
    const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
    
    return `${chalk.gray(timestamp)} ${contextStr} ${levelStr} ${message}${metaStr}`;
  }

  private getLevelColor(level: string) {
    switch (level) {
      case 'DEBUG': return chalk.gray;
      case 'INFO': return chalk.green;
      case 'WARN': return chalk.yellow;
      case 'ERROR': return chalk.red;
      default: return chalk.white;
    }
  }

  debug(message: string, meta?: any): void {
    if (this.level <= LOG_LEVELS.DEBUG) {
      console.log(this.formatMessage('DEBUG', message, meta));
    }
  }

  info(message: string, meta?: any): void {
    if (this.level <= LOG_LEVELS.INFO) {
      console.log(this.formatMessage('INFO', message, meta));
    }
  }

  warn(message: string, meta?: any): void {
    if (this.level <= LOG_LEVELS.WARN) {
      console.warn(this.formatMessage('WARN', message, meta));
    }
  }

  error(message: string, error?: any): void {
    if (this.level <= LOG_LEVELS.ERROR) {
      const errorStr = error instanceof Error ? error.message : error;
      console.error(this.formatMessage('ERROR', message, { error: errorStr }));
      
      // Print stack trace in debug mode
      if (error instanceof Error && error.stack && this.level <= LOG_LEVELS.DEBUG) {
        console.error(chalk.gray(error.stack));
      }
    }
  }
}

export function createLogger(context: string, level?: number): Logger {
  return new CLILogger(context, level);
}

// Global logger for general use
export const logger = createLogger('django-next');
