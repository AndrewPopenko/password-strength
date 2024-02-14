import { TestBed } from '@angular/core/testing';

import { PasswordStrength, ValidatorService } from './validator.service';

describe('ValidatorService', () => {
  let service: ValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return easy when a password is weak and contains only letters and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('qwertyqwerty');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Easy, validLength: true})
  });

  it('should return easy when a password is weak and contains only digits and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('12345678');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Easy, validLength: true})
  });

  it('should return easy when a password is weak and contains only symbols and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('!@#$%^&*');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Easy, validLength: true})
  });

  it('should return medium when a password has letters and digits and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwerty12');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Medium, validLength: true})
  });

  it('should return medium when a password has letters and symbols and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwerty!@');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Medium, validLength: true})
  });

  it('should return medium when a password has symbols and digits and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('!@#$%^12');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Medium, validLength: true})
  });

  it('should return strong when a password has letters, symbols, and digits and length is greater or equal to 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwerty!2');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Strong, validLength: true})
  });

  it('should return strong and false for validLength when length is less than 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwert!2');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Strong, validLength: false})
  });

  it('should return medium and false for validLength when length is less than 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwert12');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Medium, validLength: false})
  });

  it('should return esy and false for validLength when length is less than 8 symbols', () => {
    const evaluationResult = service.evaluateStrength('Qwert');
    expect(evaluationResult).toEqual({strength: PasswordStrength.Easy, validLength: false})
  });
});
