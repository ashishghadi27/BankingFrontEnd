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
import { ForgotPassword } from "./UserAuthentication/ResetPassword/ForgotPassword/forgotPassword.component";
import { ForgotUserId } from "./UserAuthentication/ResetPassword/ForgotUserId/forgotUserId.component";
import { NewPassword } from "./UserAuthentication/ResetPassword/NewPassword/newPass.component";
import { NewTransactionPassword } from "./UserAuthentication/ResetPassword/NewTransactionPassword/newTransPass.component";
import { UserAuth } from "./UserAuthentication/Login/user_login.component";
import { InternetBankingRegistration } from './Registration/InternetBanking/internet_banking_reg.component';
import { SavingAccountRegistration } from './Registration/SavingsAccount/saving_acc_reg.component';
import { FundsTransferHome } from "./FundsTransfer/fund-transfer-homepage.component";
import { IMPS } from "./FundsTransfer/IMPS/imps.component";
import { NEFT } from "./FundsTransfer/NEFT/neft.component";
import { RTGS } from "./FundsTransfer/RTGS/rtgs.component";
import { TransferSuccessful } from "./FundsTransfer/TransferSuccess/transfer_success.component";
import { AddBeneficiary } from "./FundsTransfer/AddBeneficiary/add_beneficiary.component";
import { ServiceReferencePage } from "./Home/ServiceReferencePage/service_reference.component";
import { AccountLocked } from "./CommonPages/AccountLocked/accountLocked.component";

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
    {path:"serviceStatus", component: ServiceReferencePage},
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
                path:"imps",
                component:IMPS
            },
            {
                path:"neft",
                component:NEFT
            },
            {
                path:"rtgs",
                component:RTGS
            },
            {
                path:"rtgs",
                component:RTGS
            },
            {
                path:"transfer_success/:id",
                component:TransferSuccessful
            },
            {
                path:"add_beneficiary/:accNo",
                component:AddBeneficiary
            },
            {
                path:"newtransactionpassword",
                component:NewTransactionPassword},
            {
                path: "",
                redirectTo: "accountDetails",
                pathMatch: "full"
            }
        ]
    },
    {path:"login",component:UserAuth},
    {path:"forgotpassword",component:ForgotPassword},
    {path:"forgotuserid",component:ForgotUserId},
    {path:"newpassword",component:NewPassword},
    {path:"saving",component: SavingAccountRegistration},
    {path:"internetbanking", component: InternetBankingRegistration},
    {path:"fundsTransfer", component: FundsTransferHome},
    {path:"accountLocked", component: AccountLocked},
    
    {
        path:"accountStatus",
        component:ServiceReferencePage
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