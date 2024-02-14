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

  constructor() {
  }

  evaluateStrength(currentPassword: string): PasswordEvaluationResult {
    let hasLetter = false;
    let hasDigit = false;
    let hasSymbol = false;
    const isLenValid = currentPassword.length >= 8;

    for (let ch of currentPassword) {
      if (this.isChar(ch)) {
        hasLetter = true;
      } else if (this.isDigit(ch)) {
        hasDigit = true;
      } else if (this.isSymbol(ch)) {
        hasSymbol = true;
      }
      if (hasLetter && hasDigit && hasSymbol) {
        break;
      }
    }

    if (hasLetter && hasDigit && hasSymbol) {
      return this.strongPassword(isLenValid)
    } else if (hasLetter && (hasDigit || hasSymbol) || (hasDigit && hasSymbol)) {
      return this.mediumPassword(isLenValid)
    }

    return this.weakPassword(isLenValid);
  }

  private isDigit(ch: string): boolean {
    if (ch === ' ') return false;
    return +ch >= 0 && +ch <= 9;
  }

  private isChar(ch: string): boolean {
    return ch.toLocaleLowerCase() >= 'a' && ch.toLocaleLowerCase() <= 'z';
  }

  private isSymbol(ch: string): boolean {
    return !this.isChar(ch) && !this.isDigit(ch);
  }

  private weakPassword(isLenValid: boolean): PasswordEvaluationResult {
    return {
      strength: PasswordStrength.Easy,
      validLength: isLenValid
    };
  }

  private mediumPassword(isLenValid: boolean): PasswordEvaluationResult {
    return {
      strength: PasswordStrength.Medium,
      validLength: isLenValid
    }
  }

  private strongPassword(isLenValid: boolean): PasswordEvaluationResult {
    return {
      strength: PasswordStrength.Strong,
      validLength: isLenValid
    }
  }
}
