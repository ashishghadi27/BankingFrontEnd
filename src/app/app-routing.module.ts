import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { WebHome } from './Home/HomePage/web_home.component';
import { InternetBankingRegistration } from './Registration/InternetBanking/internet_banking_reg.component';
import { SavingAccountRegistration } from './Registration/SavingsAccount/saving_acc_reg.component';

const routes : Routes = [
    // route object: JSON objects
    //{path:"", component: HomeComponent}, bad practice also negative effect on SEO
    {path:"", redirectTo:"home", pathMatch : "full"},//blank address bar
    {path:"home", component: WebHome},
    //registration module component
    {path:"saving",component: SavingAccountRegistration},
    {path:"internetbanking", component: InternetBankingRegistration},
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