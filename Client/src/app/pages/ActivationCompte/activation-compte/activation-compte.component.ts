import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
  ReactiveFormsModule,
} from "@angular/forms";
import { AuthService } from "src/app/Service/AuthService/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-activation-compte",
  templateUrl: "./activation-compte.component.html",
  styleUrls: ["./activation-compte.component.scss"],
})
export class ActivationCompteComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private AuthService: AuthService,
    private router: Router
  ) {}
  email: string;
  Code_form: FormGroup;
  code_query: number;
  error_code: boolean = false;
  success_code: boolean = false;

  ngOnInit(): void {
    this.email = this.activatedRoute.snapshot.params["email"];
    console.log(this.email);
    this.Code_form = this.formBuilder.group({
      code: new FormControl("", Validators.pattern("^[0-9]*$")),
    });
    this.GetUser();
  }

  public GetUser() {
    try {
      this.AuthService.GetUserByEmail(this.email).subscribe(
        (responseUser: any) => {
          this.code_query = responseUser.User.validation_code;
        }
      );
    } catch (error) {
      console.error(error);
    }
  }

  Listencode(Code_form: FormGroup) {
    if (this.code_query === Code_form.value.code) {
      this.AuthService.ActivateAccount(this.email).subscribe((response) => {
        this.success_code = true;
        this.error_code = false;
      });
    } else {
      this.success_code = false;

      this.error_code = true;
    }
  }
  ToLogin() {
    return this.router.navigate(["login"]);
  }
}
