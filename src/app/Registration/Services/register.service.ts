import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RestOTPTemplate } from '../Models/rest-otp-template.model';
import { RestStateTemplate } from '../Models/rest-state-template.model';
import { RestCityTemplate } from '../Models/rest-city-template.model';
import { User } from '../Models/user.model';
import { Address } from '../Models/address.model';
import { Occupation } from '../Models/occupation.model';
import { RestUserTemplate } from '../Models/rest-user-template.model';
import { RestAddressTemplate } from '../Models/rest-address-template.model';
import { RestOccupationTemplate } from '../Models/rest-occupation-template.model';

@Injectable({ providedIn: 'root' })

export class RegisterService{
    baseUrl : string = "http://localhost:2021/SpringRest";

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

    createUser(restUserTemplate:RestUserTemplate){
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(restUserTemplate);
        console.log(body);
        return this.http.post(this.baseUrl + '/register/createUser', body,{'headers':headers})
    }

    insertAddress(restAddressTemplate:RestAddressTemplate){
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(restAddressTemplate);
        console.log(body);
        return this.http.post(this.baseUrl + '/register/insertAddress', body,{'headers':headers})
    }

    insertOccupation(restOccupationTemplate:RestOccupationTemplate){
        const headers = { 'content-type': 'application/json'}  
        const body=JSON.stringify(restOccupationTemplate);
        console.log(body);
        return this.http.post(this.baseUrl + '/register/insertOccupation', body,{'headers':headers})
    }
}