import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserModel } from 'src/app/Admin/ApproveRequestDashBoard/Models/user.model';
import { DetailsModel } from '../DashboardModels/details.model';
import { StatementModel } from '../DashboardModels/statement.model';
import { SummaryModel } from '../DashboardModels/summary.model';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    baseUrl : string = "http://localhost:2798/RestApiGladiator";

    constructor(private http : HttpClient, private route:Router) {
        
    }

    params : HttpParams;

    getAccountSummary(userId : number): Observable<SummaryModel> {

        return this.http.get<SummaryModel>(`${this.baseUrl}/account/displaySummary/${userId}`);
    }

    getAccountDetails(userId : number): Observable<DetailsModel> {
        let params = new HttpParams().set("userId", userId.toString());
        return this.http.get<DetailsModel>(`${this.baseUrl}/dashboard/getDetails`,{params: params});
    }

    getAccountStatement(userId: number, startDate : string, endDate : string) : Observable<StatementModel> {
        
        if (startDate == null && endDate == null) {
            this.params = new HttpParams().set("userId", userId.toString());
        } else {
            this.params = new HttpParams().set("userId", userId.toString()).set("startDate", startDate).set("endDate",endDate);
        }
        
        return this.http.get<StatementModel>(`${this.baseUrl}/dashboard/getStatement`,{params: this.params});
    }

    getUserId():number{
        let user:UserModel = JSON.parse(sessionStorage.getItem('user'));
        if(user == null || user == undefined){
            this.route.navigate(['/login']);
            return null;
        }
        else{
            return Number(user.userId);
        }
    }

    getUserName():string{
        let user:UserModel = JSON.parse(sessionStorage.getItem('user'));
        if(user == null || user == undefined){
            this.route.navigate(['/login']);
            return null;
        }
        else{
            return user.firstName + " " +user.lastName;
        }
    }
}