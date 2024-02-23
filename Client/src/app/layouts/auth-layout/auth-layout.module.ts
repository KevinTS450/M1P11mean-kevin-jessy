import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthLayoutRoutes } from "./auth-layout.routing";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { NgxLoadingModule } from "ngx-loading";

import { LoginComponent } from "../../pages/login/login.component";
import { RegisterComponent } from "src/app/pages/register/register.component";
import { ActivationCompteComponent } from "src/app/pages/ActivationCompte/activation-compte/activation-compte.component";
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AuthLayoutRoutes),
    FormsModule,
    NgxLoadingModule.forRoot({}),

    // NgbModule
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  declarations: [LoginComponent, RegisterComponent, ActivationCompteComponent],
})
export class AuthLayoutModule {}
