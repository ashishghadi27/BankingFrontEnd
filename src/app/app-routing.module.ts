import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { AdminLogin } from './Admin/AdminLogin/admin_login.component';
import { ApproveRequest } from "./Admin/ApproveRequestDashBoard/approve-request.component";
import { CustomerRepresentative } from "./Admin/CustReprDashboard/cust-repres.component";
import { CustRepresLogin } from "./Admin/CustReprLogin/cust_login.component";
import { MainAdminDashboard } from './Admin/MainAdminDashboard/main-admin-dash.component';
import { DefaultError } from './CommonPages/DefaultErrorPage/default_error.component';
import { WebHome } from './Home/HomePage/web_home.component';
import { AccountDetails } from './UserDashboard/AccountDetails/account_details.component';
import { AccountStatement } from './UserDashboard/AccountStatement/account_statement.component';
import { AccountSummary } from './UserDashboard/AccountSummary/account_summary.component';
import { UserHome } from './UserDashboard/Home/user_home.component';

const routes : Routes = [
    // route object: JSON objects
    //{path:"", component: HomeComponent}, bad practice also negative effect on SEO
    {path:"", redirectTo:"home", pathMatch : "full"},//blank address bar
    {path:"home", component: WebHome},
    {path:"admin-login", component: AdminLogin},
    {path:"mainAdminDash", component: MainAdminDashboard},
    {path:"approveRequestDash", component: ApproveRequest},
    {path:"customer-repres-login", component: CustRepresLogin},
    {path:"documentVerification", component: CustomerRepresentative},
    //my paths
    {
        path:"userDashboard",
        component: UserHome,
        children : [
            {
                path: "accountSummary",
                component: AccountSummary
            },
            {
                path: "accountDetails",
                component: AccountDetails
            },
            {
                path: "accountStatement",
                component: AccountStatement
            },
            {
                path: "",
                redirectTo: "accountDetails",
                pathMatch: "full"
            }
        ]
    },
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