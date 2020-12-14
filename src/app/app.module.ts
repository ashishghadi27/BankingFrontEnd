import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebHome } from './Home/HomePage/web_home.component';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { AppRouting } from './app-routing.module';
import { UserAuth } from './UserAuthentication/Login/user_login.component';
import { HttpClientModule } from '@angular/common/http';
import { ForgotPassword } from './UserAuthentication/ResetPassword/ForgotPassword/forgotPassword.component';
import { ForgotUserId } from './UserAuthentication/ResetPassword/ForgotUserId/forgotUserId.component';
import { NewPassword } from './UserAuthentication/ResetPassword/NewPassword/newPass.component';
import { NewTransactionPassword } from './UserAuthentication/ResetPassword/NewTransactionPassword/newTransPass.component';

@NgModule({
  declarations: [
    AppComponent,
    WebHome,
    DefaultError,
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
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
