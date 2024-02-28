import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { ClipboardModule } from "ngx-clipboard";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { ServiceTypeComponent } from "src/app/pages/ServiceType/service-type/service-type.component";
import { AjouterServiceComponent } from "src/app/pages/ServiceType/AjouterService/ajouter-service/ajouter-service.component";
import { ModifierServiceComponent } from "src/app/pages/ServiceType/ModifierService/modifier-service/modifier-service.component";
// import { ToastrModule } from 'ngx-toastr';
import { PriseRendezVousComponent } from "src/app/pages/RendezVous/PriseRendezVous/prise-rendez-vous/prise-rendez-vous.component";
import { AjoutMobileMoneyComponent } from "src/app/pages/MobileMoney/AjouterMobileMoney/ajout-mobile-money/ajout-mobile-money.component";
import { PersonnelComponent } from "src/app/pages/Personnel/personnel/personnel.component";
import { NgxLoadingModule } from "ngx-loading";
import { TacheComponent } from "src/app/pages/Tache/tache/tache.component";
import { ListeEmployeComponent } from "src/app/pages/ListEmploye/liste-employe/liste-employe.component";
import { NgxPaginationModule } from "ngx-pagination";
import { NotificationComponent } from "src/app/pages/Notification/notification/notification.component";
import { PaiementsComponent } from "src/app/pages/Paiements/paiements/paiements.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,

    ReactiveFormsModule,
    NgxLoadingModule.forRoot({}),
    NgxPaginationModule,
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    ServiceTypeComponent,
    AjouterServiceComponent,
    ModifierServiceComponent,
    PriseRendezVousComponent,
    AjoutMobileMoneyComponent,
    PersonnelComponent,
    TacheComponent,
    ListeEmployeComponent,
    NotificationComponent,
    PaiementsComponent,
  ],
})
export class AdminLayoutModule {}
