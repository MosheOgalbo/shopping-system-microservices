import { VALIDATION_RULES } from './constants';
import { FormData } from '../types';

export type FieldIssue = 'required' | 'tooShort' | 'tooLong' | 'invalid';

export function normalizeCustomer(input: FormData): FormData {
  return {
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    address: input.address.trim().replace(/\s+/g, ' '),
    email: input.email.trim().toLowerCase(),
  };
}

function textIssue(
  value: string,
  min: number,
  max: number,
  pattern: RegExp,
): FieldIssue | null {
  if (!value) return 'required';
  if (value.length < min) return 'tooShort';
  if (value.length > max) return 'tooLong';
  if (!pattern.test(value)) return 'invalid';
  return null;
}

export function customerIssues(input: FormData): Partial<Record<keyof FormData, FieldIssue>> {
  const customer = normalizeCustomer(input);
  const issues: Partial<Record<keyof FormData, FieldIssue>> = {};

  const firstName = textIssue(
    customer.firstName,
    VALIDATION_RULES.MIN_NAME_LENGTH,
    VALIDATION_RULES.MAX_NAME_LENGTH,
    VALIDATION_RULES.NAME_PATTERN,
  );
  const lastName = textIssue(
    customer.lastName,
    VALIDATION_RULES.MIN_NAME_LENGTH,
    VALIDATION_RULES.MAX_NAME_LENGTH,
    VALIDATION_RULES.NAME_PATTERN,
  );
  const address = textIssue(
    customer.address,
    VALIDATION_RULES.MIN_ADDRESS_LENGTH,
    VALIDATION_RULES.MAX_ADDRESS_LENGTH,
    VALIDATION_RULES.ADDRESS_PATTERN,
  );

  if (firstName) issues.firstName = firstName;
  if (lastName) issues.lastName = lastName;
  if (address) issues.address = address;

  if (!customer.email) {
    issues.email = 'required';
  } else if (customer.email.length > VALIDATION_RULES.MAX_EMAIL_LENGTH || !VALIDATION_RULES.EMAIL_PATTERN.test(customer.email)) {
    issues.email = 'invalid';
  }

  return issues;
}
