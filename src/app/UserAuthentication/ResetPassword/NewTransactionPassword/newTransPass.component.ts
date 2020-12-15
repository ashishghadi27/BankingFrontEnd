import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DashboardService } from 'src/app/UserDashboard/DashboardService/dashboard.service';
import { AuthenticationService } from '../../authentication.service';
import { RequestStatus } from '../../Model/RestSimpleTemplate';

@Component({
    selector: 'new-trans-pass',
    templateUrl: 'newTransPass.component.html',
    styleUrls: ['./newTransPass.component.css']
})

export class NewTransactionPassword{

    newPasswordForm: FormGroup;
    passwordControl: FormControl;
    confirmPasswordControl: FormControl;
    restTemplate:RequestStatus;

    constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router, private dashService:DashboardService) {
        this.passwordControl = new FormControl("", Validators.required);
        this.confirmPasswordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

        this.newPasswordForm = formBuilder.group({
            "password": this.passwordControl,
            "confirmpassword": this.confirmPasswordControl
        });
    }

    setTransactionPassword() {
        let password = this.passwordControl.value;
        let confirmpassword = this.confirmPasswordControl.value;
        let error = false;
        let userId=this.dashService.getUserId();
        if(userId == undefined || userId == null){
            this.route.navigate(['/login']);
        }
        this.dashService.getAccountSummary(userId).subscribe((data)=>{
            let accNo = data.account.accountNo;
            if(password===confirmpassword){
                if(accNo != null || accNo != undefined){
                    this.dataService.setNewTransPassword(accNo,password).subscribe((data) => {
                        this.restTemplate = data;
                        console.log(data);
                        if(this.restTemplate.status==="success"){
                            alert('Transaction Password Updated');
                            this.route.navigate(['/userDashboard']);            
                        }else{
                           error=true;
                           console.log("something went wrong"); 
                        }
                    });
                }
            }
            else{
                error=true;
                console.log("passwords do not match");
            }
            
        })
    }

}