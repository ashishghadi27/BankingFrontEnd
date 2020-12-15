import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestOTPTemplate } from '../Models/rest-otp-template.model';
import { RestStateTemplate } from '../Models/rest-state-template.model';
import { RestCityTemplate } from '../Models/rest-city-template.model';

import { Address } from '../Models/address.model';
import { User } from 'src/app/UserDashboard/DashboardModels/user.model';
import { RestCreateUsertemplate } from '../Models/rest-create-user-temp.model';
import { ServiceReference } from 'src/app/Home/Models/service-ref.model';
import { RestServiceReferenceModel } from 'src/app/Home/Models/service-ref-temp.model';
import { RestSimpleTemplate } from '../Models/rest-simple-template.model';
import { Occupation } from 'src/app/UserDashboard/DashboardModels/occupation.model';
import { InternetBanking } from '../InternetBanking/Models/internetbanking.model';
import { RestInternetBanking } from '../InternetBanking/Models/rest-internetbanking.model';

@Injectable({ providedIn: 'root' })

export class RegisterService{
    baseUrl : string = "http://localhost:2798/RestApiGladiator";

    constructor(private http: HttpClient){  }

    params : HttpParams;

    getUserId(accountNo : number):Observable<RestOTPTemplate>{
        let params = new HttpParams().set("accountNo",accountNo.toString());
        return this.http.get<RestOTPTemplate>(`${this.baseUrl}/register/getUserId`,{params: params});
    }

    getStates():Observable<RestStateTemplate>{
        return this.http.get<RestStateTemplate>(`${this.baseUrl}/utility/states`);
    }

    getCities(stateId : number):Observable<RestCityTemplate>{
        let params = new HttpParams().set("stateId",stateId.toString());
        return this.http.get<RestCityTemplate>(`${this.baseUrl}/utility/cities`,{params: params});
    }

    createUser(user:User) : Observable<RestCreateUsertemplate>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(user);
        console.log(body);
        return this.http.post<RestCreateUsertemplate>(this.baseUrl + '/register/createUser', body,{'headers':headers})
    }

    insertAddress(address : Address) : Observable<RestSimpleTemplate>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(address);
        console.log(body);
        return this.http.post<RestSimpleTemplate>(this.baseUrl + '/register/insertAddress', body,{'headers':headers})
    }

    insertOccupation(occupation:Occupation) : Observable<RestSimpleTemplate>{
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(occupation);
        console.log(body);
        return this.http.post<RestSimpleTemplate>(this.baseUrl + '/register/insertOccupation', body,{'headers':headers})
    }

    generateServiceReference(userId:string, status:string, remark:string):Observable<RestServiceReferenceModel>{
        const headers = { 'content-type': 'application/json'}
        let body = {
            "userId":userId,
            "status":status,
            "remark":remark
        }
        console.log(body);
        return this.http.post<RestServiceReferenceModel>(this.baseUrl + '/admin/generateServiceReference', body,{'headers':headers})
    }

    checkAccountNo(accountNo: number) : Observable<RestOTPTemplate> {
        let params = new HttpParams().set("accountNo",accountNo.toString());
        return this.http.get<RestOTPTemplate>(`${this.baseUrl}/login/checkAccountNo`,{params: params});
    }

    registerForNetBanking(netBanking : InternetBanking) : Observable<RestInternetBanking> {
        const headers = { 'content-type': 'application/json'}
        const body=JSON.stringify(netBanking);
        console.log(body);
        return this.http.post<RestInternetBanking>(this.baseUrl+'/register/registerInternetBanking', body,{'headers':headers})
    }
}