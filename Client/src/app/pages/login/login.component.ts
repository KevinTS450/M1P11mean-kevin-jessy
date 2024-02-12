import { Component, OnInit, OnDestroy } from "@angular/core";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/Service/AuthService/auth.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private route: Router
  ) {}

  Auth_form: FormGroup;
  ngOnInit(): void {
    this.Auth_form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  Login(Auth_form: FormGroup) {
    if (Auth_form.valid) {
      console.log("ato");
      const result = Auth_form.value;
      console.log(result);
      this.service.CheckUser(result.email).subscribe((responseEmail: any) => {
        const exist = responseEmail.message;
        if (exist) {
          this.service
            .GetUserByEmail(result.email)
            .subscribe((responseGetMail: any) => {
              const is_activate = responseGetMail.User.is_activate;
              console.log(responseGetMail);
              if (is_activate == false) {
                this.route.navigate(["activation", result.email]);
              } else {
                this.service.Auth(result).subscribe((responseAuth) => {
                  console.log(responseAuth);
                });
              }
            });
        } else {
          console.log("user doesn exist");
        }
      });
    } else {
      Object.keys(this.Auth_form.controls).forEach((key) => {
        const control = this.Auth_form.get(key);
        if (control != null) {
          control.markAsTouched();
        }
      });
    }
  }
}
