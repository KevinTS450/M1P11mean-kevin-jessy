import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from "./layouts/auth-layout/auth-layout.component";

import { NgbModule, NgbPopoverModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxPaginationModule } from "ngx-pagination";

import { AppRoutingModule } from "./app.routing";
import { ComponentsModule } from "./components/components.module";
import { TestPageComponent } from "./pages/testPage/test-page/test-page.component";
import { SpinerComponent } from "./pages/spiner/spiner/spiner.component";

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgbPopoverModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,

    TestPageComponent,
    SpinerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
