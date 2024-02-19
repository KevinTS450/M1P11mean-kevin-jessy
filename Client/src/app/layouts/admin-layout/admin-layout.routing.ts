import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapsComponent } from "../../pages/maps/maps.component";
import { UserProfileComponent } from "../../pages/user-profile/user-profile.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { ServiceTypeComponent } from "../../pages/ServiceType/service-type/service-type.component";
import { AjouterServiceComponent } from "src/app/pages/ServiceType/AjouterService/ajouter-service/ajouter-service.component";
import { ModifierServiceComponent } from "src/app/pages/ServiceType/ModifierService/modifier-service/modifier-service.component";
import { PriseRendezVousComponent } from "src/app/pages/RendezVous/PriseRendezVous/prise-rendez-vous/prise-rendez-vous.component";
import { AjoutMobileMoneyComponent } from "src/app/pages/MobileMoney/AjouterMobileMoney/ajout-mobile-money/ajout-mobile-money.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "user-profile", component: UserProfileComponent },
  { path: "tables", component: TablesComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapsComponent },
  { path: "serviceType", component: ServiceTypeComponent },
  { path: "AjoutService", component: AjouterServiceComponent },
  { path: "ModifierService/:id", component: ModifierServiceComponent },
  { path: "priseRendezVous", component: PriseRendezVousComponent },
  { path: "ajoutMobileMoney", component: AjoutMobileMoneyComponent },
];
