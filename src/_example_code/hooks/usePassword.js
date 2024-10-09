import { useCallback } from 'react';
import { hasValue } from 'utils/helpers';

export function usePasswordValidation() {
  const validatePassword = useCallback((value) => {
    if (!hasValue(value)) {
      return [false, 'Password is required'];
    }

    if (value.length > 50) {
      return [false, 'Password cannot exceed 50 characters'];
    }

    const { success, error } = validate(value);
    if (!success) {
      console.log('My value', value, 'error', error);
      return [false, error];
    }

    return [true, null];
  }, []);

  const validatePasswordConfirm = useCallback((value, compareValue) => {
    if (!hasValue(value)) {
      return [false, 'Password confirmation is required'];
    }

    if (value !== compareValue) {
      return [false, 'Passwords do not match'];
    }

    return [true, null];
  }, []);

  return {
    validatePassword,
    validatePasswordConfirm,
  };
}

// ##################################
// ### Helper Methods
// ##################################

function validate(password) {
  const errors = [];
  const conditions = {
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+=[\]{};':"\\|,./?-]/.test(password),
  };

  const hasBracketError = /[<>]/.test(password);

  // if < or > exists exit early and return error
  if (hasBracketError) {
    return { success: false, error: 'Password cannot contain < or >' };
  }

  // If less than 8 chars, exit early and return error
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
    return { success: false, error: errors.join(' ') };
  }

  if (!conditions.upperCase) {
    errors.push('an uppercase letter');
  }

  if (!conditions.lowerCase) {
    errors.push('a lowercase letter');
  }

  if (!conditions.number) {
    errors.push('a number');
  }

  if (!conditions.specialChar) {
    errors.push('a special character');
  }

  // If all conditions are met, return true for pass and null for error
  const pass =
    password.length >= 8 &&
    Object.values(conditions).filter(Boolean).length === 4;

  const error = pass ? null : `Password must include ${errors.join(', ')}`;

  return { success: pass, error };
}
