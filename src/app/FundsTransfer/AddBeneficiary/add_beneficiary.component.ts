import { Component } from '@angular/core';
import { MyDataService } from '../data-service';
import { ActivatedRoute, Router } from '@angular/router';
import { Beneficiary } from './beneficiary-model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RestBeneficiary } from './rest-beneficiary';
import { RestSingleBeneficiary } from './rest-singlebene.model';

@Component({
    selector: 'add-beneficiary',
    templateUrl: 'add_beneficiary.component.html',
    styleUrls: ['./add_beneficiary.component.css']
})

export class AddBeneficiary{
    message :any;
    beneficaryForm: FormGroup;
    bNameControl : FormControl;
    bAccNoControl : FormControl;
    rebAccNoControl : FormControl;
    bankNameControl : FormControl;
    bNickNameControl : FormControl;
    ifscControl : FormControl;
    accNo:number;
    error : boolean;

    //constructor(private service:MyDataService){}

    constructor(formBuilder: FormBuilder, private service:MyDataService, private route: Router, private routerObj:ActivatedRoute){

        this.accNo = Number(this.routerObj.snapshot.paramMap.get('accNo'));

        this.bNameControl = new FormControl("",Validators.required);
        this.bAccNoControl = new FormControl("",Validators.required);
        this.rebAccNoControl = new FormControl("",Validators.required);
        this.bankNameControl = new FormControl("",Validators.required);
        this.bNickNameControl = new FormControl("",Validators.required);
        this.ifscControl = new FormControl("",Validators.required);
        //this.bNickNameControl = new FormControl; 
        this.beneficaryForm = formBuilder.group({
            "bName":this.bNameControl,
            "beneficairyAccNumber":this.bAccNoControl,
            "name":this.bNameControl,
            "bankName":this.bankNameControl,
            "ifsc":this.ifscControl,
            "nickName":this.bNickNameControl,
            "accountNo":this.accNo
        })

        //this.beneficaryForm.reset();
    }

    createBeneficiary(frm:any){
        let beneficairyAccNumber = this.bAccNoControl.value;
        let bName = this.bNameControl.value;
        let bankName = this.bankNameControl.value;
        let ifsc = this.ifscControl.value;
        let nickName = this.bNickNameControl.value;
        let accountNo = this.accNo;
        let restBeneficiaryTemplate : RestSingleBeneficiary;

        this.service.addBeneficiary(beneficairyAccNumber,accountNo,bName,bankName,ifsc,nickName).subscribe(
            (data)=>{
                restBeneficiaryTemplate=data;
                if(restBeneficiaryTemplate.beneficiary != null){
                    console.log("Beneficiary Added");
                }

            }
        )
    }


}