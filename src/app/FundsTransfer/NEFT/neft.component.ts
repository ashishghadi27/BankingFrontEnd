import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MyDataService } from '../data-service';
import { ActivatedRoute, Router } from '@angular/router';
import { RestTransaction } from '../rest-transaction';
import { Beneficiary } from '../AddBeneficiary/beneficiary-model';
import { SummaryModel } from '../summary.model';
import { AccountModel } from '../account.model';
import { DashboardService } from 'src/app/UserDashboard/DashboardService/dashboard.service';


@Component({
    selector: 'neft',
    templateUrl: 'neft.component.html',
    styleUrls: ['./neft.component.css']
})

export class NEFT{
    neftForm:FormGroup;
    fromAccControl: FormControl;
    toAccControl: FormControl;
    amountControl: FormControl;
    dateControl: FormControl;
    remarkControl: FormControl;
    beneficiary:Beneficiary[];

    summary:SummaryModel;
    account:AccountModel;
    msg:string;
    balanceCheck:boolean=false;
    userId:number;
    accNo:string = '1500012';

    constructor(private service:MyDataService, formBuilder:FormBuilder,private route:Router, private utilService:DashboardService){
        this.amountControl = new FormControl("", Validators.compose([Validators.required,this.rangeCheck]));
        this.fromAccControl = new FormControl(this.accNo, Validators.required);
        this.toAccControl=new FormControl("", Validators.required);
        this.dateControl=new FormControl("", Validators.required);
       // this.dateControl=new Date().toLocaleDateString;
        this.remarkControl=new FormControl("", Validators.required);
        let date= new Date();
        //let td = (document.getElementById('transactionDate')).innerHTML=date.toString();
        this.neftForm=formBuilder.group({

            "accountNo":this.toAccControl, 
            "reason" :this.remarkControl,
            "amount":this.amountControl,
            "transDate":this.dateControl,
            "fromAcc":this.fromAccControl
        });
        this.userId = this.utilService.getUserId();
        this.service.getAccountDetails(this.userId).subscribe(
            (data)=> {
                this.summary=data;
                this.account = data.account;
                this.accNo = data.account.accountNo + "";
                this.service.fetchBeneficiary(this.accNo).subscribe(
                    response=> {
                        this.beneficiary = response.beneficiaries;
                        console.log(this.beneficiary);
                    }
                );
            }
        );
        
        this.dateControl.setValue(this.service.getTodayDate());
    }

    addTransaction(frm:any){
        let accNo = this.fromAccControl.value;
        let reason = this.remarkControl.value;
        let amount = this.amountControl.value;
        let date:Date=new Date;
        let toAcc = this.toAccControl.value;
        let restTransactionTemplate:RestTransaction;

        this.service.getAccountDetails(this.userId).subscribe(
            (data)=> {
                this.summary=data;
                this.account = data.account;
                console.log(this.summary);
                if(this.account.balance > this.amountControl.value){
                    this.service.addTransaction(accNo,reason,"NEFT",date,date,amount,toAcc).subscribe(
                       (data)=>{
                           restTransactionTemplate=data;
                           let updatedBalance:any= this.account.balance-this.amountControl.value;
                           this.service.updateBalance(updatedBalance, accNo).subscribe(
                                (data)=>{
                                    if(data.message == 'Balance updated'){
                                        this.route.navigateByUrl('userDashboard/imps/transfer_success/' + restTransactionTemplate.transaction.transactionId);
                                    }
                                }
                            );
                           
                       }
                    );  
               }
               else{
                  this.balanceCheck=true;
               }
            }

        );

        
    }

    addNew(){
        this.route.navigate(['userDashboard/add_beneficiary/' + this.accNo]);
    }
   
    rangeCheck(amount:FormControl){
        if(amount.value > 1000000){
            return{ 
                "range": true
            }
        }
    }
}