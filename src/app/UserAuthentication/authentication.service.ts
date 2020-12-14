import { Injectable } from '@angular/core';
import { RequestStatus }from './Model/RestSimpleTemplate' ;
import {RestUserIdAndOtpTemplate} from './Model/RestUserIdAndOtpTemplate'
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root' //no need to register
})

export class AuthenticationService{

    baseUrl:string = "http://localhost:8080/SpringRest/login/";
    id:number;

    constructor(private http: HttpClient){
        
    }

    checkUser(userId:number): Observable<RequestStatus>{
        let params = new HttpParams();
        params = params.append('userId',userId+"");
        let apiLink:string = this.baseUrl +"checkUser";
        return this.http.get<RequestStatus>(apiLink, {params:params})
    }

    checkInternetBanking(userId:number): Observable<RequestStatus>{
        let params = new HttpParams();
        params = params.append('userId', userId+"");
        let apiLink:string = this.baseUrl +"checkInternetBanking";
        return this.http.get<RequestStatus>(apiLink, {params:params})
    }

    checkLogin(userId:number,password:string): Observable<RequestStatus>{
        let params = new HttpParams();
        params = params.append('userId', userId+"");
        params = params.append('password', password);
        let apiLink:string = this.baseUrl +"checkLogin";
        return this.http.post<RequestStatus>(apiLink, {params:params})
    }

    checkAccountNo(accountNo:number): Observable<RestUserIdAndOtpTemplate>{
        let params = new HttpParams();
        params = params.append('accountNo', accountNo+"");
        let apiLink:string = this.baseUrl +"checkAccountNo";
        return this.http.get<RestUserIdAndOtpTemplate>(apiLink, {params:params})
    }

    checkUserForOtp(userId:number): Observable<RestUserIdAndOtpTemplate>{
        let params = new HttpParams();
        params = params.append('userId', userId+"");
        let apiLink:string = this.baseUrl +"checkUserForOtp";
        return this.http.get<RestUserIdAndOtpTemplate>(apiLink, {params:params})
    }

    setNewLoginPassword(userId:number,password:string): Observable<RequestStatus>{
        let params = new HttpParams();
        params = params.append('password', password);
        params = params.append('userId', userId+"");
        let apiLink:string = this.baseUrl +"setNewLoginPassword";
        return this.http.put<RequestStatus>(apiLink, {params:params})
    }





}