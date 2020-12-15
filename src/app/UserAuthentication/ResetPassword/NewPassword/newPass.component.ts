import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { RequestStatus } from '../../Model/RestSimpleTemplate';

@Component({
    selector: 'new-pass',
    templateUrl: 'newPass.component.html',
    styleUrls: ['./newPass.component.css']
})

export class NewPassword {

    newPasswordForm: FormGroup;
    passwordControl: FormControl;
    confirmPasswordControl: FormControl;
    restTemplate: RequestStatus;
    error: boolean;
    errormessage: string;

    constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router) {
        this.passwordControl = new FormControl("", Validators.required);
        this.confirmPasswordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

        this.newPasswordForm = formBuilder.group({
            "password": this.passwordControl,
            "confirmpassword": this.confirmPasswordControl
        });
    }

    passwordMatch(password: string, confirmpassword: string): boolean {
        if (password === confirmpassword) {
            return true;
        }
        return false;
    }

    setLoginPassword() {
        let password = this.passwordControl.value;
        let confirmpassword = this.confirmPasswordControl.value;
        var userId:number= this.dataService.id;
        console.log(userId);
        if (this.passwordMatch(password, confirmpassword) == true) {
            this.dataService.setNewLoginPassword(userId, password).subscribe((data) => {
                this.restTemplate = data;
                console.log(data);
                if (this.restTemplate.status === "success") {
                    alert('Pasword Updated');
                    this.route.navigate(['login']);
                }
                else {
                    this.error = true;
                    console.log("password not updated");
                    this.errormessage = "password not updated";
                }
            });
        } else {
            this.error = true;
            console.log("passwords do not match");
            this.errormessage = "Passwords do not match";
        }

    }

}