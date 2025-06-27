import { VALIDATION_RULES } from './constants';

export const validateForm = (customerInfo) => {
  const errors = [];

  // Check required fields
  Object.keys(VALIDATION_RULES.REQUIRED_FIELDS).forEach(field => {
    if (!customerInfo[field] || customerInfo[field].trim() === '') {
      errors.push(VALIDATION_RULES.REQUIRED_FIELDS[field]);
    }
  });

  // Validate email format
  if (customerInfo.email && !VALIDATION_RULES.EMAIL_REGEX.test(customerInfo.email)) {
    errors.push('כתובת האימייל אינה תקינה');
  }

  // Validate name lengths
  if (customerInfo.firstName && customerInfo.firstName.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    errors.push(`שם פרטי חייב להכיל לפחות ${VALIDATION_RULES.MIN_NAME_LENGTH} תווים`);
  }

  if (customerInfo.lastName && customerInfo.lastName.length < VALIDATION_RULES.MIN_NAME_LENGTH) {
    errors.push(`שם משפחה חייב להכיל לפחות ${VALIDATION_RULES.MIN_NAME_LENGTH} תווים`);
  }

  // Validate max lengths
  if (customerInfo.firstName && customerInfo.firstName.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    errors.push(`שם פרטי לא יכול להכיל יותר מ-${VALIDATION_RULES.MAX_NAME_LENGTH} תווים`);
  }

  if (customerInfo.lastName && customerInfo.lastName.length > VALIDATION_RULES.MAX_NAME_LENGTH) {
    errors.push(`שם משפחה לא יכול להכיל יותר מ-${VALIDATION_RULES.MAX_NAME_LENGTH} תווים`);
  }

  if (customerInfo.address && customerInfo.address.length > VALIDATION_RULES.MAX_ADDRESS_LENGTH) {
    errors.push(`כתובת לא יכולה להכיל יותר מ-${VALIDATION_RULES.MAX_ADDRESS_LENGTH} תווים`);
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEmail = (email) => {
  return VALIDATION_RULES.EMAIL_REGEX.test(email);
};

export const validateProductName = (name) => {
  return name && name.trim().length > 0 && name.trim().length <= 100;
};

export const validateQuantity = (quantity) => {
  const num = parseInt(quantity);
  return !isNaN(num) && num >= 1 && num <= 99;
};
