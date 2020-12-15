import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/admin.service';
import { UserModel } from 'src/app/Admin/ApproveRequestDashBoard/Models/user.model';
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
    user:UserModel;

    constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router, private utilService:AdminService) {
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
                this.utilService.getUser(userId).subscribe((userData)=>{
                    if(userData.user != null){
                        this.utilService.sendSms("Your OTP is:" + this.restTemplate.otp + "\n Please don't share this OTP.", userData.user.email.trim()).subscribe(
                            data=>console.log(data)
                        );
                    }
                    else{
                        this.error = true;
                        this.errormessage = "Invalid UserID";
                        this.ForgotPasswordForm.reset();
                    }
                })
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
