import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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

    constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router) {
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
        let userId=this.dataService.id;


        this.dataService.setNewLoginPassword(userId,password).subscribe((data) => {
            this.restTemplate = data;
            console.log(data);
            if(this.restTemplate.status==="success"){
                if (password===confirmpassword) {
                    console.log("success");
                }
                else{
                    error=true;
                    console.log("passwords do not match");
                }

            }else{
               error=true;
               console.log("something went wrong"); 
            }
            

        });
    }

}