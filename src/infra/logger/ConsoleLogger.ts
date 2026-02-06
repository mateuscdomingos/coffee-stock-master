import { Logger } from '@/core/ports/services/Logger';

export class ConsoleLogger implements Logger {
  info(prefix: string, message: string, context?: unknown): void {
    console.log(
      `[INFO][${prefix}] ${new Date().toISOString()}: ${message}`,
      context || '',
    );
  }
  error(prefix: string, message: string, error?: unknown): void {
    console.error(
      `[ERROR][${prefix}] ${new Date().toISOString()}: ${message}`,
      error || '',
    );
  }
}
