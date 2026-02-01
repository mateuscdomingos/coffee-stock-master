export interface Logger {
  info(prefix: string, message: string, context?: unknown): void;
  error(prefix: string, message: string, error?: unknown): void;
}
