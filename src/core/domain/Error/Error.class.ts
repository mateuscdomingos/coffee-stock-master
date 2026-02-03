import { centsToBRL } from '@/core/utils/formatters';

abstract class DomainError extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

// User Errors
export class UserAlreadyExistsError extends DomainError {
  constructor() {
    super(`User already exists.`);
  }
}

export class InvalidCredentialsError extends DomainError {
  constructor() {
    super('Invalid credentials.');
  }
}

export class InvalidEmailError extends DomainError {
  constructor() {
    super(`Invalid email format.`);
  }
}

// Order Errors
export class StoreNotFoundError extends DomainError {
  constructor(storeId: string) {
    super(`Store "${storeId}" not found.`);
  }
}

export class InsufficientBudgetError extends DomainError {
  constructor(spendingInCents: number, budgetInCents: number) {
    super(
      `Monthly budget exceeded. Current spending: ${centsToBRL(spendingInCents)}. Limit: ${centsToBRL(budgetInCents)}`,
    );
  }

  formatCurrency(value: number) {
    return (value / 100).toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }
}

// Product Errors
export class FieldCannotBeNegative extends DomainError {
  constructor(fieldName: string) {
    super(`"${fieldName}" cannot be negative.`);
  }
}
