import { Routes } from "@angular/router";
import { ActivationCompteComponent } from "../../pages/ActivationCompte/activation-compte/activation-compte.component";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "../../pages/register/register.component";

export const AuthLayoutRoutes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {
    path: "activation/:email",
    component: ActivationCompteComponent,
  },
];
