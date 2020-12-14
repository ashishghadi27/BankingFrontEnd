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
import { UserHome } from './UserDashboard/Home/user_home.component';
import { AccountSummary } from './UserDashboard/AccountSummary/account_summary.component';
import { AccountDetails } from './UserDashboard/AccountDetails/account_details.component';
import { AccountStatement } from './UserDashboard/AccountStatement/account_statement.component';
import { ForgotPassword } from './UserAuthentication/ResetPassword/ForgotPassword/forgotPassword.component';
import { ForgotUserId } from './UserAuthentication/ResetPassword/ForgotUserId/forgotUserId.component';
import { NewPassword } from './UserAuthentication/ResetPassword/NewPassword/newPass.component';
import { NewTransactionPassword } from './UserAuthentication/ResetPassword/NewTransactionPassword/newTransPass.component';
import { UserAuth } from './UserAuthentication/Login/user_login.component';

@NgModule({
  declarations: [
    AppComponent,
    WebHome,
    DefaultError,
    AdminLogin,
    MainAdminDashboard,
    ApproveRequest,
    CustRepresLogin,
    CustomerRepresentative,
    UserHome,
    AccountSummary,
    AccountDetails,
    AccountStatement,
    UserAuth,
    ForgotPassword,
    ForgotUserId,
    NewPassword,
    NewTransactionPassword
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
