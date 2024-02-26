import { Injectable } from '@angular/core';

export enum PasswordStrength {
  Easy = 'easy',
  Medium = 'medium',
  Strong = 'strong'
}

export type PasswordEvaluationResult = {
  strength: PasswordStrength;
  validLength: boolean
};

@Injectable({
  providedIn: 'root'
})
export class ValidatorService {

  constructor() {}

  evaluateStrength(currentPassword: string): PasswordEvaluationResult {
    const isLenValid = currentPassword.length >= 8;
    const hasLetter = /[a-zA-Z]/.test(currentPassword);
    const hasDigit = /\d/.test(currentPassword);
    const hasSymbol = /[^a-zA-Z\d]/.test(currentPassword);

    if (isLenValid && hasLetter && hasDigit && hasSymbol) {
      return { strength: PasswordStrength.Strong, validLength: true };
    } else if (isLenValid && (hasLetter || hasDigit || hasSymbol)) {
      return { strength: PasswordStrength.Medium, validLength: true };
    } else {
      return { strength: PasswordStrength.Easy, validLength: isLenValid };
    }
  }
}
