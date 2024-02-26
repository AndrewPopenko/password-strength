import { Component, Input, SimpleChanges } from '@angular/core';
import { PasswordStrength, ValidatorService } from '../../service/validator.service';

@Component({
  selector: 'app-password-strength',
  standalone: true,
  imports: [],
  templateUrl: './password-strength.component.html',
  styleUrl: './password-strength.component.css'
})
export class PasswordStrengthComponent {
  @Input() password: string = '';
  hintColor: string[] = ['gray', 'gray', 'gray'];

  constructor(private validatorService: ValidatorService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['password']) {
      this.updateStrengthIndicator();
    }
  }

  updateStrengthIndicator(): void {
    const result = this.validatorService.evaluateStrength(this.password);
    // Reset hint colors
    this.hintColor = ['gray', 'gray', 'gray'];
  
    if (!this.password) {
      // Keep default gray if no password is entered
      return;
    }
  
    switch (result.strength) {
      case PasswordStrength.Strong:
        this.hintColor = ['green', 'green', 'green'];
        break;
      case PasswordStrength.Medium:
        this.hintColor = ['yellow', 'yellow', 'gray'];
        break;
      case PasswordStrength.Easy:
        this.hintColor = ['red', 'gray', 'gray'];
        break;
      default:
        // Handle unexpected cases or provide a default
        break;
    }
  }
}
