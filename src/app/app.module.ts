import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WebHome } from './Home/HomePage/web_home.component';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { AppRouting } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { UserHome } from './UserDashboard/Home/user_home.component';
import { AccountSummary } from './UserDashboard/AccountSummary/account_summary.component';
import { AccountDetails } from './UserDashboard/AccountDetails/account_details.component';
import { AccountStatement } from './UserDashboard/AccountStatement/account_statement.component';

@NgModule({
  declarations: [
    AppComponent,
    WebHome,
    DefaultError,
    UserHome,
    AccountSummary,
    AccountDetails,
    AccountStatement

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
