import { Logger } from '@/core/ports/services/Logger';

const info = (prefix: string, message: string, context?: unknown): void => {
  console.log(
    `[INFO][${prefix}] ${new Date().toISOString()}: ${message}`,
    context || '',
  );
};

const error = (prefix: string, message: string, error?: unknown): void => {
  console.error(
    `[ERROR][${prefix}] ${new Date().toISOString()}: ${message}`,
    error || '',
  );
};

export const consoleLogger: Logger = { info, error };
