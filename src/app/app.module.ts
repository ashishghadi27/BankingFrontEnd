import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebHome } from './Home/HomePage/web_home.component';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { AppRouting } from './app-routing.module';
import { AdminLogin } from './Admin/AdminLogin/admin_login.component';
import {HttpClientModule} from '@angular/common/http';
import { MainAdminDashboard } from './Admin/MainAdminDashboard/main-admin-dash.component';
import { ApproveRequest } from './Admin/ApproveRequestDashBoard/approve-request.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { CustRepresLogin } from './Admin/CustReprLogin/cust_login.component';
import { CustomerRepresentative } from './Admin/CustReprDashboard/cust-repres.component';

@NgModule({
  declarations: [
    AppComponent,
    WebHome,
    DefaultError,
    AdminLogin,
    MainAdminDashboard,
    ApproveRequest,
    CustRepresLogin,
    CustomerRepresentative
  ],
  imports: [
    BrowserModule,
    AppRouting,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgCircleProgressModule.forRoot({
      // set defaults here
      radius: 100,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: "#78C000",
      innerStrokeColor: "#C7E596",
      animationDuration: 300,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
