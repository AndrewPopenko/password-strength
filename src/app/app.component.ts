import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { PasswordStrength, ValidatorService } from "../service/validator.service";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { PasswordInputComponent } from './password-input/password-input.component';
import { PasswordStrengthComponent } from './password-strength/password-strength.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    PasswordInputComponent,
    PasswordStrengthComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  myForm!: FormGroup;
  password = ''

  ngOnInit(): void {
    this.myForm = new FormGroup({
      passwordCtrl: new FormControl
    })

    this.myForm.get('passwordCtrl')?.valueChanges.subscribe(value => {
      this.password = value;
    });
  }
}
