import { Component, OnInit } from "@angular/core";
import { User } from "src/app/Model/User/user";
import { UploadService } from "src/app/Service/UploadService/upload.service";
import { UserService } from "src/app/Service/UserService/user.service";
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder,
} from "@angular/forms";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}
  UserForm: FormGroup;

  UserQuery: User = new User();
  path: string;
  pathDeformed: string;
  initialName: string;
  initialLastName: string;
  users_updated: boolean = false;
  users: User = new User();

  ngOnInit() {
    this.GetUser();
    this.Form();
  }
  public Form() {
    this.UserForm = this.formBuilder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
    });
  }

  public EditProfil(UserForm: FormGroup) {
    const newName = UserForm.value.name;
    const newLastName = UserForm.value.last_name;

    if (
      (newName !== this.initialName || newLastName !== this.initialLastName) &&
      (newName !== "" || newLastName !== "")
    ) {
      const updatedUser: User = {
        name: newName !== "" ? newName : this.initialName,
        last_name: newLastName !== "" ? newLastName : this.initialLastName,
        email: "",
        role: "",
        date_naissance: "",
        is_activate: "",
        age: "",
        image: "",
      };

      this.userService.UpdateProfile(updatedUser).subscribe((response) => {
        console.log(response);
        this.users_updated = true;
        this.GetUser();
      });
    } else {
      console.log("Nothing to update");
    }
  }
  public GetUser() {
    try {
      this.userService.GetUserByToken().subscribe((response: any) => {
        this.UserQuery = response.user;
        console.log(this.UserQuery.image);
        this.initialName = this.UserQuery.name;
        this.initialLastName = this.UserQuery.last_name;
      });
    } catch (error) {
      console.error(error);
    }
  }
}
