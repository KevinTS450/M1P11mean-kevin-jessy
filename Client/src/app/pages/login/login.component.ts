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
import { SessionService } from "../session/session.service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private service: AuthService,
    private route: Router,
    private session: SessionService
  ) {}
  loading: boolean = false;
  Auth_form: FormGroup;
  error_auth: boolean = false;
  account_not_exist: boolean = false;
  defaultLogin = '';
  defaultPWD = '';

  ngOnInit(): void {
    this.Auth_form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required],
    });
  }

  public Login(Auth_form: FormGroup) {
      this.loading = true;

      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 30000);
        const result = Auth_form.value;
        this.service.CheckUser(result.email).subscribe((responseEmail: any) => {
          const exist = responseEmail.message;
          if (exist) {
            this.service
              .GetUserByEmail(result.email)
              .subscribe((responseGetMail: any) => {
                const is_activate = responseGetMail.User.is_activate;
                if (is_activate == false) {
                  this.route.navigate(["activation", result.email]);
                } else {
                  this.service.Auth(result).subscribe(
                    (responseAuth: any) => {
                      clearTimeout(loadingTimeout);
                      if (responseAuth.accessToken) {
                        this.session.setToken(responseAuth.accessToken);
                        this.route.navigate(["user-profile"]);
                      }
                    },
                    (error) => {
                      clearTimeout(loadingTimeout);
                      this.loading = false;
                      console.log(error);
                      this.error_auth = true;
                      this.account_not_exist = false;
                    }
                  );
                }
              });
          } else {
            clearTimeout(loadingTimeout);
            this.loading = false;

            this.account_not_exist = true;
            this.error_auth = false;
          }
        });
      }, 3000);
  
  }

  defaultClient() {
    this.defaultLogin = 'clientsb63@gmail.com';
    this.defaultPWD = 'client';
  }

  defaultEmploye() {
    this.defaultLogin = 'clientsalonbeaute@gmail.com';
    this.defaultPWD = 'a';
  }

  defaultManager() {
    this.defaultLogin = 'managersb48@gmail.com';
    this.defaultPWD = 'manager';
  }
}
