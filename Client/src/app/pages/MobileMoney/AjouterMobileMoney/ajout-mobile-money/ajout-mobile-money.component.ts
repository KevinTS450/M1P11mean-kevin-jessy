import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validator,
  Validators,
} from "@angular/forms";
import { MobileMoney } from "src/app/Model/MobileMoney/mobile-money";
import { User } from "src/app/Model/User/user";
import { MobileMoneyService } from "src/app/Service/MobileMoneyService/mobile-money.service";
import { UserService } from "src/app/Service/UserService/user.service";

@Component({
  selector: "app-ajout-mobile-money",
  templateUrl: "./ajout-mobile-money.component.html",
  styleUrls: ["./ajout-mobile-money.component.scss"],
})
export class AjoutMobileMoneyComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private mobileMoneyService: MobileMoneyService
  ) {}
  UserQuery: User = new User();
  MobileMoneyForm: FormGroup;
  id_user: string;
  name_user: string;
  email_user: string;
  mobileMoneyAdded: boolean = false;

  ngOnInit(): void {
    this.GetUser();
    this.MobileMoneyFormDisplay();
  }

  public GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
        this.id_user = response.user._id;
        this.name_user = response.user.name;
        this.email_user = response.user.email;
      });
    } catch (error) {
      console.error(error);
    }
  }

  public onSelectOperator(selectedValue: string) {
    console.log("Selected operator:", selectedValue);
  }

  public MobileMoneyFormDisplay() {
    try {
      this.MobileMoneyForm = this.formBuilder.group({
        operateur: ["", Validators.required],
      });
    } catch (error) {
      console.error(error);
    }
  }
  public AddMobileMoney(MobileMoneyForm: FormGroup) {
    try {
      if (MobileMoneyForm.valid) {
        const result = MobileMoneyForm.value;

        const user: {} = {
          idUser: this.id_user,
          nomUser: this.name_user,
          emailUser: this.email_user,
        };

        const resultFinal: MobileMoney = {
          user: user,
          operateurNom: result.operateur,
          monnaie: 5000,
        };
        this.mobileMoneyService
          .createMobileMoney(resultFinal)
          .subscribe((response) => {
            console.log(response);
            this.mobileMoneyAdded = true;
          });
      } else {
        MobileMoneyForm.markAllAsTouched();
      }
    } catch (error) {
      console.error(error);
    }
  }
}
