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
import { PointageService } from "src/app/Service/PointageService/pointage.service";
import { Pointage } from "src/app/Model/pointage/pointage";
import { TimeService } from "src/app/utils/Time/time.service";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private pointage: PointageService,
    private timeService: TimeService
  ) {}
  UserForm: FormGroup;
  PointageForm: FormGroup;
  UserQuery: User = new User();
  path: string;
  pathDeformed: string;
  initialName: string;
  initialLastName: string;
  TotalHeure: string;
  PointageUpdated: boolean = false;

  initial_start_time: string;
  initial_end_time: string;
  users_updated: boolean = false;
  users: User = new User();
  pointageDisplay: Pointage = new Pointage();

  ngOnInit() {
    this.GetUser();
    this.Form();
    this.pointageForm();
  }
  public Form() {
    this.UserForm = this.formBuilder.group({
      name: ["", Validators.required],
      last_name: ["", Validators.required],
    });
  }
  public GetTotalHours() {
    try {
      this.TotalHeure = this.TotalHoraire(
        this.initial_start_time,
        this.initial_end_time
      );
    } catch (error) {
      console.error(error);
    }
  }

  public TotalHoraire(start: string, end: string) {
    try {
      const total = this.timeService.calculateTimeElapsed(start, end);
      return total;
    } catch (error) {
      console.error(error);
    }
  }

  public pointageForm() {
    this.PointageForm = this.formBuilder.group({
      start_time: ["", Validators.required],
      end_time: ["", Validators.required],
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
      UserForm.patchValue(updatedUser);

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
        this.initialName = this.UserQuery.name;
        this.initialLastName = this.UserQuery.last_name;
        this.GetPointageEmp(response.user._id);
      });
    } catch (error) {
      console.error(error);
    }
  }

  public GetPointageEmp(id: string) {
    try {
      this.pointage.GetPointageEmp(id).subscribe((response: any) => {
        console.log(response);
        this.pointageDisplay = response.pointage;

        this.initial_start_time = this.pointageDisplay.start_time;
        this.initial_end_time = this.pointageDisplay.end_time;
        this.GetTotalHours();
      });
    } catch (error) {
      console.error(error);
    }
  }

  public updatePointage(PointageForm: FormGroup) {
    const newStart_time = PointageForm.value.start_time;
    const newEnd_time = PointageForm.value.end_time;

    if (
      (newStart_time !== this.initial_start_time ||
        newEnd_time !== this.initial_end_time) &&
      (newStart_time !== "" || newEnd_time !== "")
    ) {
      const newPointage: {} = {
        start_time:
          newStart_time === "" ? this.initial_start_time : newStart_time,
        end_time: newEnd_time === "" ? this.initial_end_time : newEnd_time,
      };
      PointageForm.patchValue(newPointage);

      this.pointage
        .UpdatePointageForEmp(newPointage)
        .subscribe((response: any) => {
          console.log(response);
          this.PointageUpdated = true;
          this.userService.GetUserByToken().subscribe((response: any) => {
            this.UserQuery = response.user;
            this.initialName = this.UserQuery.name;
            this.initialLastName = this.UserQuery.last_name;
            this.GetPointageEmp(response.user._id);
            this.GetTotalHours();
          });
        });
    } else {
      console.log("Nothing to update");
    }
  }
}
