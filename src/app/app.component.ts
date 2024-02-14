import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { PasswordStrength, ValidatorService } from "../service/validator.service";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatFormFieldModule, MatInput, FormsModule, MatIconButton, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  password = '';
  hintColor: string[] = ['gray', 'gray', 'gray'];
  passwordLength = 0;
  hidePassword = true;

  constructor(private validatorService: ValidatorService,) {
  }

  validate() {
    const validationResult = this.validatorService.evaluateStrength(this.password);

    this.passwordLength = this.password.length

    if (!this.password) {
      this.hintColor = ['gray', 'gray', 'gray'];
    } else if (!validationResult.validLength) {
      this.hintColor = ['red', 'red', 'red'];
    } else {
      switch (validationResult.strength) {
        case PasswordStrength.Easy:
          this.hintColor = ['red', 'gray', 'gray'];
          break;
        case PasswordStrength.Medium:
            this.hintColor = ['yellow', 'yellow', 'gray'];
            break;
        case PasswordStrength.Strong:
          this.hintColor = ['green', 'green', 'green'];
          break;
      }
    }
  }
}
