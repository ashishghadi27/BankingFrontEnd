import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { UserAuth } from './UserAuthentication/Login/user_login.component';
import { WebHome } from './Home/HomePage/web_home.component';
import { ForgotPassword } from "./UserAuthentication/ResetPassword/ForgotPassword/forgotPassword.component";
import { ForgotUserId } from "./UserAuthentication/ResetPassword/ForgotUserId/forgotUserId.component";
import { NewPassword } from "./UserAuthentication/ResetPassword/NewPassword/newPass.component";
import { NewTransactionPassword } from "./UserAuthentication/ResetPassword/NewTransactionPassword/newTransPass.component";

const routes : Routes = [
    // route object: JSON objects
    //{path:"", component: HomeComponent}, bad practice also negative effect on SEO
    {path:"", redirectTo:"home", pathMatch : "full"},//blank address bar
    {path:"home", component: WebHome},
    {path:"login",component:UserAuth},
    {path:"forgotpassword",component:ForgotPassword},
    {path:"forgotuserid",component:ForgotUserId},
    {path:"newpassword",component:NewPassword},
    {path:"newtransactionpassword",component:NewTransactionPassword},
    
    // fallback component mapping
    {path:"**", component:DefaultError}
];

@NgModule({
    //customize
    imports:[RouterModule.forRoot(routes)],
    //need to exxpose the inbuilt routing module to appmodule
    exports:[RouterModule]
})

export class AppRouting{
    constructor(){

    }
}