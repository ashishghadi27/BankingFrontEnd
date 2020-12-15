import { AddBeneficiary } from './AddBeneficiary/add_beneficiary.component';
import { Beneficiary } from './AddBeneficiary/beneficiary-model';
import { RestBeneficiary } from './AddBeneficiary/rest-beneficiary';
import { RestTransaction } from './rest-transaction';
import { Transaction } from './TransferSuccess/transaction-model';
import { Observable } from 'rxjs';
import { SummaryModel } from './summary.model';
import { AccountModel } from './account.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestSimpleTemplate } from '../Admin/AdminLogin/Models/rest-simple-template.model';
import { RestSingleBeneficiary } from './AddBeneficiary/rest-singlebene.model';

@Injectable({
    providedIn: 'root' //no need to register
})

export class MyDataService{

   
    baseUrl:string="http://localhost:2798/RestApiGladiator";
    

    constructor(private http:HttpClient){ 

    }

    addBeneficiary(bAccNo: number, accountNo:number, bName : string,  bankName : string, ifsc:string, nickName  : string){
        const headers = { 'content-type': 'application/json'} 
        let body = {
            "beneficiaryAccNo":bAccNo,
            "accountNo":accountNo,
            "beneficiaryName":bName,
            "bankName":bankName,
            "ifsc":ifsc,
            "nickName":nickName
        }
        console.log(body);
        let apiLink:string=this.baseUrl+"/beneficiary/addPayee";
        return this.http.post<RestSingleBeneficiary>(apiLink,body,{headers : headers});
    }

    addTransaction(accountNo:number, reason:string, type:string, startDate:Date, endDate:Date, amount:number, toAccount:string ){
        const headers = { 'content-type': 'application/json'} 
        let body = {
            "accountNo":accountNo,
            "reason":reason,
            "type":type,
            "startDate":startDate,
            "endDate":endDate,
            "amount":amount,
            "flow":"debit",
            "toAccount":toAccount
        }

        let apiLink:string=this.baseUrl+"/transaction/createTransaction";
        return this.http.post<RestTransaction>(apiLink,body,{headers : headers});
    }

    fetchTransaction(id:string):Observable<RestTransaction>{
        let params = new HttpParams();
        params = params.append('transactionId',id);
        let apiLink:string=this.baseUrl+"/transaction/successTransaction";
        return this.http.get<RestTransaction>(apiLink, {params:params});
    }

    fetchBeneficiary(id:string):Observable<RestBeneficiary>{
        let params = new HttpParams();
        const headers = { 'content-type': 'application/json'} 
        params = params.append('accountNo',id);
        let apiLink = this.baseUrl+"/beneficiary/displayBeneficiary";
        return this.http.get<RestBeneficiary>(apiLink, {params:params});
    }

    getAccountDetails(userid:number):Observable<SummaryModel>{
        const headers = { 'content-type': 'application/json'} 
        let apiLink:string=this.baseUrl+"/account/displaySummary/"+userid;
        return this.http.get<SummaryModel>(apiLink,{headers : headers});
    }

    updateBalance(balance:string, accountNo:string){
        let params = new HttpParams();
        params = params.append('balance',balance);
        params = params.append('accountNo',accountNo);
        let apiLink:string=this.baseUrl+"/transaction/updateBalance";
        return this.http.put<RestSimpleTemplate>(apiLink,{},{params:params});
    }

    getTodayDate(){
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        let yyyy = today.getFullYear();
        let date = yyyy + '-' + mm + '-' + dd;
        return date;
    }
}