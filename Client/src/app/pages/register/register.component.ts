import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";
import { RegisterService } from "src/app/Service/RegisterService/register.service";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  UserForm: FormGroup;
  isNotEquals: boolean;
  closed: boolean = false;
  accountCreated: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService
  ) {}
  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      role: ["", Validators.required],
      date_naissance: ["", Validators.required],
    });
  }
  onClose() {
    this.closed = true;
    this.accountCreated = false;
  }

  saveForm(UserForm: FormGroup) {
    if (UserForm.valid) {
      const result = UserForm.value;
      console.log(result);
      this.service.Inscription(result).subscribe((response) => {
        console.log(response);
        this.accountCreated = true;
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
    const password = this.UserForm.get("password").value;
    const confirmPassword = this.UserForm.get("confirmPassword").value;

    if (password !== confirmPassword) {
      this.UserForm.get("confirmPassword").setErrors({ mismatch: true });
      this.isNotEquals = true;
    } else {
      this.UserForm.get("confirmPassword").setErrors(null);
      this.isNotEquals = false;
    }
  }
}
