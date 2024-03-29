import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ServiceTypeComponent } from "../../pages/ServiceType/service-type/service-type.component";
import { AjouterServiceComponent } from "src/app/pages/ServiceType/AjouterService/ajouter-service/ajouter-service.component";
import { ModifierServiceComponent } from "src/app/pages/ServiceType/ModifierService/modifier-service/modifier-service.component";
import { RendezVousComponent } from "src/app/pages/rendez-vous/rendez-vous.component";
import { TestPageComponent } from "src/app/pages/testPage/test-page/test-page.component";
import { SoldeComponent } from "src/app/pages/solde/solde.component";

import { PriseRendezVousComponent } from "src/app/pages/RendezVous/PriseRendezVous/prise-rendez-vous/prise-rendez-vous.component";
import { AjoutMobileMoneyComponent } from "src/app/pages/MobileMoney/AjouterMobileMoney/ajout-mobile-money/ajout-mobile-money.component";
import { PersonnelComponent } from "src/app/pages/Personnel/personnel/personnel.component";
import { TacheComponent } from "src/app/pages/Tache/tache/tache.component";
import { ListeEmployeComponent } from "src/app/pages/ListEmploye/liste-employe/liste-employe.component";
import { NotificationComponent } from "src/app/pages/Notification/notification/notification.component";
import { PaiementsComponent } from "src/app/pages/Paiements/paiements/paiements.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },

  { path: "serviceType", component: ServiceTypeComponent },
  { path: "AjoutService", component: AjouterServiceComponent },
  { path: "ModifierService/:id", component: ModifierServiceComponent },
  { path: "RendezVous", component: RendezVousComponent },
  { path: "testPage", component: TestPageComponent },
  { path: "Solde", component: SoldeComponent },
  { path: "priseRendezVous", component: PriseRendezVousComponent },
  { path: "ajoutMobileMoney", component: AjoutMobileMoneyComponent },
  { path: "personnel", component: PersonnelComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  // { path: "icons", component: IconsComponent },
  // { path: "maps", component: MapsComponent },
  { path: "serviceType", component: ServiceTypeComponent },
  { path: "AjoutService", component: AjouterServiceComponent },
  { path: "ModifierService/:id", component: ModifierServiceComponent },
  { path: "RendezVous", component: RendezVousComponent },
  { path: "testPage", component: TestPageComponent },
  { path: "Solde", component: SoldeComponent },
  { path: "priseRendezVous", component: PriseRendezVousComponent },
  { path: "ajoutMobileMoney", component: AjoutMobileMoneyComponent },
  { path: "personnel", component: PersonnelComponent },
  { path: "tache", component: TacheComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  // { path: "tables", component: TablesComponent },
  // { path: "icons", component: IconsComponent },
  // { path: "maps", component: MapsComponent },
  { path: "serviceType", component: ServiceTypeComponent },
  { path: "AjoutService", component: AjouterServiceComponent },
  { path: "ModifierService/:id", component: ModifierServiceComponent },
  { path: "RendezVous", component: RendezVousComponent },
  { path: "testPage", component: TestPageComponent },
  { path: "Solde", component: SoldeComponent },
  // { path: "priseRendezVous", component: PriseRendezVousComponent },
  // { path: "ajoutMobileMoney", component: AjoutMobileMoneyComponent },
  { path: "personnel", component: PersonnelComponent },
  { path: "Listemploye", component: ListeEmployeComponent },
  { path: "notification", component: NotificationComponent },
  { path: "paiements", component: PaiementsComponent },
];
