import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { Routes, RouterModule } from "@angular/router";

import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";
import { AuthGuard } from "src/app/guards/auth.guard";
import { SessionService } from "./pages/session/session.service";

const routes: Routes = [
  {
    path: "",
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/admin-layout/admin-layout.module").then(
            (m) => m.AdminLayoutModule
          ),
      },
    ],
  },
  {
    path: "",
    component: AuthLayoutComponent,

    children: [
      {
        path: "",
        loadChildren: () =>
          import("src/app/layouts/auth-layout/auth-layout.module").then(
            (m) => m.AuthLayoutModule
          ),
      },
    ],
  },
  {
    path: "**",
    redirectTo: "",
  },
];
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes, { enableTracing: true }), // Add enableTracing option here
  ],
  exports: [],
})
export class AppRoutingModule {
  constructor(private session: SessionService) {}
}
