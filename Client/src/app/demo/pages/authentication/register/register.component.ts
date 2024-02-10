import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterServiceService } from '../../Service/RegisterService/register-service.service';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export default class RegisterComponent {
  UserForm: FormGroup;
  isNotEquals: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterServiceService
  ) {}
  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      Username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      role: ['', Validators.required],
      date_naissance: ['', Validators.required]
    });
  }

  saveForm(UserForm: FormGroup) {
    if (UserForm.valid) {
      const result = UserForm.value;
      this.service.Inscription(result).subscribe((response) => {
        console.log(response);
      });
    } else {
      Object.keys(this.UserForm.controls).forEach((key) => {
        const control = this.UserForm.get(key);
        if (control != null) {
          control.markAsTouched();
        }
      });
    }
  }
  validatePasswords() {
    const password = this.UserForm.get('password').value;
    const confirmPassword = this.UserForm.get('confirmPassword').value;

    if (password !== confirmPassword) {
      this.UserForm.get('confirmPassword').setErrors({ mismatch: true });
      this.isNotEquals = true;
    } else {
      this.UserForm.get('confirmPassword').setErrors(null);
      this.isNotEquals = false;
    }
  }
}
