import { isDataSource } from "@angular/cdk/collections";
import { Component, OnInit } from "@angular/core";
import { RendezVous } from "src/app/Model/rendezVous/rendez-vous";
import { User } from "src/app/Model/User/user";
import { RendezVousService } from "src/app/Service/rendezVous/rendez-vous.service";
import { UserService } from "src/app/Service/UserService/user.service";
import { SocketService } from "src/app/socket/socket.service";

@Component({
  selector: "app-tache",
  templateUrl: "./tache.component.html",
  styleUrls: ["./tache.component.scss"],
})
export class TacheComponent implements OnInit {
  constructor(
    private userService: UserService,
    private rendezVousService: RendezVousService,
    private socketService: SocketService
  ) {}
  timers: { [key: string]: any } = {};

  loading: boolean = false;
  UserQuery: User = new User();
  initialid: string;
  initialName: string;
  initialLastName: string;
  email: string;
  id_user: string;
  tache: RendezVous[];
  count_task_finished: number;

  tache_en_cours: boolean = true;
  tache_effectuer: boolean = false;

  ngOnInit(): void {
    this.GetUser();
    this.AutoRefresh();
  }

  public AutoRefresh() {
    try {
      this.startRefreshRdv();
    } catch (error) {
      console.error(error);
    }
  }

  public startRefreshRdv() {
    this.socketService.on("ChangeState", (data) => {
      console.log("Web socket User updated event received:", data);
      this.GetUser();
    });
  }

  public GetUser() {
    try {
      this.loading = true;
      setTimeout(() => {
        const loadingTimeout = setTimeout(() => {
          this.loading = false;
        }, 30000);

        this.userService.GetUserByToken().subscribe((response: any) => {
          this.UserQuery = response.user;
          this.initialid = this.UserQuery._id;
          this.initialName = this.UserQuery.name;
          this.initialLastName = this.UserQuery.last_name;
          this.id_user = response.user._id;
          this.email = response.user.email;
          const stateFor = "confirmer";
          const stateForCount = "finish";

          this.GetRdvConfirmerd(stateFor);
          this.GetCountRdvFinished(this.UserQuery._id, stateForCount);
        });
        clearTimeout(loadingTimeout);
        this.loading = false;
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  }
  public GetRdvConfirmerd(stateFor) {
    try {
      this.rendezVousService
        .findByUserConfirmed(this.UserQuery, stateFor)
        .subscribe((response: any) => {
          console.log(response);
          this.tache = response.rendezVous;

          this.tache.forEach((rdv) => {
            if (rdv.onGoing) {
              this.startTimer(
                rdv._id,
                rdv.serviceAsked.durre,
                rdv.client.idClient,
                rdv.employee.idEmployee,
                rdv.serviceAsked.idService,

                rdv.isDone
              );
              console.log(rdv.isDone);
            }
          });
        });
    } catch (error) {
      console.error(error);
    }
  }
  startTimer(
    rdvId: string,
    duration: number,
    clientId: string,
    idEmp: string,
    id_service: string,
    done: boolean
  ) {
    const durationString = duration.toString();
    const [hoursStr, minutesStr] = durationString.split(":");
    const hours = parseInt(hoursStr, 10);
    const minutes = parseInt(minutesStr, 10);
    const durationInMinutes = hours * 60 + minutes;
    const durationInMillis = durationInMinutes * 60000;
    let elapsedTime = 0;
    this.timers[rdvId] = setInterval(() => {
      elapsedTime += 1000;
      if (elapsedTime >= durationInMillis && done === false) {
        clearInterval(this.timers[rdvId]);
        this.EndTask(clientId, idEmp, id_service);
      }
      const remainingTime = durationInMillis - elapsedTime;
      const remainingHours = Math.floor(
        (remainingTime / (1000 * 60 * 60)) % 24
      );
      const remainingMinutes = Math.floor((remainingTime / (1000 * 60)) % 60);
      this.tache.find(
        (rdv) => rdv._id === rdvId
      ).elapsedTime = `${remainingHours}h ${remainingMinutes}m`;
    }, 1000);
  }
  public StartTask(clientId: string, idEmp: string, id_service: string) {
    try {
      const stateFor = "start";
      this.rendezVousService
        .ChangeStateRdv(clientId, idEmp, id_service, stateFor)
        .subscribe((response) => {
          console.log(response);
          console.log("tapitra");
        });
    } catch (error) {
      console.error(error);
    }
  }

  public EndTask(clientId: string, idEmp: string, id_service: string) {
    try {
      const stateFor = "end";
      this.rendezVousService
        .ChangeStateRdv(clientId, idEmp, id_service, stateFor)
        .subscribe((response) => {
          console.log(response);
        });
    } catch (error) {
      console.error(error);
    }
  }

  public GetCountRdvFinished(idEmp: string, stateFor: string) {
    try {
      this.rendezVousService
        .GetCountRdv(idEmp, stateFor)
        .subscribe((response: any) => {
          console.log(response);
          this.count_task_finished = response.count;
        });
    } catch (error) {
      console.log(error);
    }
  }

  public changeStateTaskEffectuer() {
    try {
      this.tache_en_cours = false;
      this.tache_effectuer = true;
      const stateFor = "terminer";
      const stateForCount = "en_cours";
      this.GetRdvConfirmerd(stateFor);
      this.GetCountRdvFinished(this.UserQuery._id, stateForCount);
    } catch (error) {
      console.error(error);
    }
  }
  public changeStateTaskEnCours() {
    try {
      this.tache_effectuer = false;

      this.tache_en_cours = true;
      const stateFor = "confirmer";
      const stateForCount = "finish";
      this.GetRdvConfirmerd(stateFor);
      this.GetCountRdvFinished(this.UserQuery._id, stateForCount);
    } catch (error) {
      console.error(error);
    }
  }
}