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
import { UploadService } from "src/app/Service/UploadService/upload.service";
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
  file_query: File;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private upload: UploadService
  ) {}
  ngOnInit(): void {
    this.UserForm = this.formBuilder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
      role: ["", Validators.required],
      date_naissance: ["", Validators.required],
      image: [""],
    });
  }
  onClose() {
    this.closed = true;
    this.accountCreated = false;
  }

  public onFileSelected(event) {
    const file: File = event.target.files[0];

    this.file_query = file;
  }

  public saveForm(UserForm: FormGroup) {
    if (UserForm.valid) {
      const result = UserForm.value;
      if (this.file_query) {
        this.upload.UploadImg(this.file_query).subscribe(
          (response: any) => {
            console.log("Image uploaded successfully:", response);
            result.image = this.file_query.name;

            this.service.Inscription(result).subscribe((response) => {
              console.log(response);
              console.log(result.image);
              this.accountCreated = true;
              // UserForm.reset();
            });
          },
          (error) => {
            console.error("Error uploading image:", error);
          }
        );
      } else {
        this.service.Inscription(result).subscribe((response) => {
          console.log(response);
          this.accountCreated = true;
          UserForm.reset();
        });
      }
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
