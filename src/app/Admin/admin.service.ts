import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestAdmin } from './AdminLogin/Models/rest-admin.model';
import { RestServiceReference } from './AdminLogin/Models/rest-service-ref.model';
import { RestSimpleTemplate } from './AdminLogin/Models/rest-simple-template.model';
import { RestUser } from './ApproveRequestDashBoard/Models/rest-user.model';
import { AccountModel } from './ApproveRequestDashBoard/Models/account.model';
import { RestAccount } from './ApproveRequestDashBoard/Models/rest-account.model';
import { RestBranch } from './ApproveRequestDashBoard/Models/restBranch.model';
import { InternetBankingModel } from './ApproveRequestDashBoard/Models/internet-banking.model';
import { RestInternetBanking } from './ApproveRequestDashBoard/Models/rest.internet-banking.template';
import { DebitCard } from './ApproveRequestDashBoard/Models/debit.model';
import { RestDebitModel } from './ApproveRequestDashBoard/Models/rest-Debit.model';
import { RestCustRepresModel } from './CustReprLogin/Models/rest-custLogin.model';

@Injectable({
    providedIn: 'root' //no need to register
})

export class AdminService{
    
    baseUrl:string = "http://localhost:2798/RestApiGladiator";
    requestMapping:string = "/admin"

    constructor(private http: HttpClient){
        
    }

    login(username:string, password:string): Observable<RestAdmin>{
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('password', password);
        let apiLink:string = this.baseUrl + this.requestMapping + "/adminLogin";
        return this.http.get<RestAdmin>(apiLink, {params:params});
    }

    getListOfServiceReference(): Observable<RestServiceReference>{
        let apiLink:string = this.baseUrl + this.requestMapping + "/getServiceReferenceList";
        return this.http.get<RestServiceReference>(apiLink);
    }

    getListOfServiceReferenceByAdminId(adminId:string): Observable<RestServiceReference>{
        let params = new HttpParams();
        params = params.append('adminId', adminId);
        let apiLink:string = this.baseUrl + this.requestMapping + "/getServiceReferenceListByAdmin";
        return this.http.get<RestServiceReference>(apiLink, {params:params});
    }

    getListOfServiceReferenceByCid(cId:string): Observable<RestServiceReference>{
        let params = new HttpParams();
        params = params.append('cId', cId);
        let apiLink:string = this.baseUrl + this.requestMapping + "/getServiceReferenceListByCid";
        return this.http.get<RestServiceReference>(apiLink, {params:params});
    }

    updateAdminIdAndCid(userId:string, adminId:string, cId:string):Observable<RestSimpleTemplate>{
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('adminId', adminId);
        params = params.append('cId', cId);
        let apiLink:string = this.baseUrl + this.requestMapping + "/updateAdminAndCustRepres";
        return this.http.put<RestAdmin>(apiLink, {}, {params:params});
    }

    updateStatusAndRemark(userId:string, status:string, remark:string):Observable<RestSimpleTemplate>{
        let params = new HttpParams();
        params = params.append('userId', userId);
        params = params.append('status', status);
        params = params.append('remark', remark);
        let apiLink:string = this.baseUrl + this.requestMapping + "/updateStatus";
        return this.http.put<RestAdmin>(apiLink, {}, {params:params});
    }

    getUser(userId:string):Observable<RestUser>{
        let params = new HttpParams();
        params = params.append('userId', userId);
        let apiLink:string = this.baseUrl + this.requestMapping + "/getUserDetails";
        return this.http.get<RestUser>(apiLink,{params:params});
    }

    createAccount(account:AccountModel):Observable<RestAccount>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(account);
        console.log(body);
        return this.http.post<RestAccount>(this.baseUrl + '/register/createAccount', body,{'headers':headers})
    }

    enableInternetBanking(accountNo:string, userId:string, password:string):Observable<RestInternetBanking>{
        let internetBanking:InternetBankingModel = new InternetBankingModel();
        internetBanking.accountNo = accountNo;
        internetBanking.password = password;
        internetBanking.isBlocked = '0';
        internetBanking.impsUpperLimit = '50000';
        internetBanking.neftUpperLimit = '1000000';
        internetBanking.rtgsUpperLimit = '2000000';
        internetBanking.username = userId;
        internetBanking.transPass = password;
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(internetBanking);
        console.log(body);
        return this.http.post<RestInternetBanking>(this.baseUrl + '/register/registerInternetBanking', body,{'headers':headers})
    }

    registerDebitCard(debit:DebitCard):Observable<RestDebitModel>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(debit);
        console.log(body);
        return this.http.post<RestDebitModel>(this.baseUrl + '/register/registerDebitCard', body,{'headers':headers})
    }

    getBranches():Observable<RestBranch>{
        let apiLink:string = this.baseUrl + "/dashboard/getAllBranches";
        return this.http.get<RestBranch>(apiLink);
    }

    custLogin(username:string, password:string): Observable<RestCustRepresModel>{
        let params = new HttpParams();
        params = params.append('username', username);
        params = params.append('password', password);
        let apiLink:string = this.baseUrl + this.requestMapping + "/custRepresLogin";
        return this.http.get<RestCustRepresModel>(apiLink, {params:params});
    }

    sendSms(internetBanking:InternetBankingModel, phoneNo:string){
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic YnlzaTg3MjI6RGlsS2YxSWg='
        }
        let body = "{\n\t\"to\":\"9664359034\",\n\t\"content\":\"Welcome to D7 sms , we will help you to talk with your customer effectively\",\n\t\"from\":\"SMSINFO\",\n\t\"dlr\":\"yes\",\n\t\"dlr-method\":\"GET\", \n\t\"dlr-level\":\"2\", \n\t\"dlr-url\":\"http://yourcustompostbackurl.com\"\n}";
        console.log(phoneNo);
        let message = 'Your Account has been approved. Account No: ' + internetBanking.accountNo + '\n User ID: ' + internetBanking.username + '\nPassword: ' + internetBanking.password +  '\nTransaction Password: ' + internetBanking.transPass;
        let link = 'https://rest-api.d7networks.com/secure/send';
        this.http.post(link, body,{'headers':headers}).subscribe(data=>{
            console.log(data);
        })
        
    }

}