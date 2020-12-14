import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { RestUserIdAndOtpTemplate } from '../../Model/RestUserIdAndOtpTemplate';

@Component({
    selector: 'forgot-pass',
    templateUrl: 'forgotPassword.component.html',
    styleUrls: ['./forgotPassword.component.css']
})

export class ForgotPassword {

    ForgotPasswordForm: FormGroup;
    OtpCheckForm: FormGroup;
    userIdControl: FormControl;
    otpControl: FormControl;
    restTemplate: RestUserIdAndOtpTemplate;
    errormessage: string;
    error: boolean;
    otpvisible: boolean;
    id: number;
    otp: number;
    checkable: boolean = true;

    constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router) {
        this.userIdControl = new FormControl("", Validators.required);
        this.otpControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

        this.ForgotPasswordForm = formBuilder.group({
            "userId": this.userIdControl,
        });

        this.OtpCheckForm = formBuilder.group({
            "otp": this.otpControl
        });
    }

    checkUserForOtp() {
        let userId = this.userIdControl.value;
        this.dataService.checkUserForOtp(userId).subscribe((data) => {
            this.restTemplate = data;
            console.log(data);

            if (this.restTemplate.requestStatus.status === "success") {
                console.log("userId correct");
                this.otpvisible = true;
                this.otp = this.restTemplate.otp;
                this.id=userId;
                this.checkable = false;
            }
            else {
                this.error = true;
                this.errormessage = "Invalid UserID";
                this.ForgotPasswordForm.reset();
            }
        });
    }

    checkOtp() {
        let enteredOtp = this.otpControl.value;
        if (enteredOtp == this.otp) {
            this.dataService.id=this.id;
            this.route.navigate(['/newpassword']);
        } else {
            this.error = true;
            this.errormessage = "Invalid OTP";
            this.OtpCheckForm.reset();
        }
    }

    back(): void {
        this.route.navigate(['/login']);
    }

}
