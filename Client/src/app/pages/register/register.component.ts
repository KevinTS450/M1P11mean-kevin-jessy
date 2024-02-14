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
import { PointageService } from "src/app/Service/PointageService/pointage.service";
import { Pointage } from "src/app/Model/pointage/pointage";
import { User } from "src/app/Model/User/user";
import { AuthService } from "src/app/Service/AuthService/auth.service";
import { Observable } from "rxjs";
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
  account_exist: boolean = false;
  user: User;
  email_state: string;

  constructor(
    private formBuilder: FormBuilder,
    private service: RegisterService,
    private upload: UploadService,
    private PointageService: PointageService,
    private authService: AuthService
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
            this.createUser(result);
          },
          (error) => {
            console.error("Error uploading image:", error);
          }
        );
      } else {
        this.createUser(result);
      }
    } else {
      UserForm.markAllAsTouched();
    }
  }

  private createUser(result: any) {
    this.service.Inscription(result).subscribe(
      (response: any) => {
        console.log(response);
        this.accountCreated = true;
        this.account_exist = false;
        if (result.role === "employe") {
          const start_time = "08:00";
          const end_time = "18:00";
          this.getUserByEmail(result.email).subscribe(
            (user_query: any) => {
              console.log(user_query);
              const employeData = {
                nomEmp: response.user.name,
                emailEmp: response.user.email,
              };
              const pointage: Pointage = {
                employe: employeData,
                idEmp: user_query.User._id,
                start_time: start_time,
                end_time: end_time,
              };
              this.createPointageEmp(pointage);
            },
            (error) => {
              console.error("Error getting user:", error);
            }
          );
        }
        this.UserForm.reset();
      },
      (error) => {
        this.account_exist = true;
        this.accountCreated = false;
        this.UserForm.reset();
        console.error("Account creation error or email duplicated:", error);
      }
    );
  }

  private getUserByEmail(email: string): Observable<any> {
    return this.authService.GetUserByEmail(email);
  }

  public createPointageEmp(data: Pointage) {
    this.PointageService.CreatePointageForEmp(data).subscribe((response) => {
      console.log(response);
    });
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
