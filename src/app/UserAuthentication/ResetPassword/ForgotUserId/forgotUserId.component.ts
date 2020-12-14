import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication.service';
import { RestUserIdAndOtpTemplate } from '../../Model/RestUserIdAndOtpTemplate';

@Component({
  selector: 'forgot-User-Id',
  templateUrl: 'forgotUserId.component.html',
  styleUrls: ['./forgotUserId.component.css']
})

export class ForgotUserId {

  ForgotUserIdForm: FormGroup;
  OtpCheckForm: FormGroup;
  accountNoControl: FormControl;
  otpControl: FormControl;
  restTemplate: RestUserIdAndOtpTemplate;
  error: boolean;
  errormessage: string;
  otpvisible: boolean;
  userId: number;
  otp: number;
  checkable: boolean = true;

  constructor(public dataService: AuthenticationService, formBuilder: FormBuilder, private route: Router) {
    this.accountNoControl = new FormControl("", Validators.required);
    this.otpControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

    this.ForgotUserIdForm = formBuilder.group({
      "accountNo": this.accountNoControl
    });

    this.OtpCheckForm = formBuilder.group({
      "otp": this.otpControl
    });
  }


  checkAccountNo() {
    let accountNo = this.accountNoControl.value;
    this.dataService.checkAccountNo(accountNo).subscribe((data) => {
      this.restTemplate = data;
      console.log(data);
      if (this.restTemplate.requestStatus.status === "success") {
        console.log("account no correct");
        this.otpvisible = true;
        this.otp = this.restTemplate.otp;
        this.userId = this.restTemplate.userId;
        this.checkable = false;
      }
      else {
        this.error = true;
        this.errormessage = "Invalid Account Number";
        this.ForgotUserIdForm.reset();
      }
    });
  }

  checkOtp() {
    let enteredOtp = this.otpControl.value;
    if (enteredOtp == this.otp) {
      alert("Your User ID is " + this.userId);
      this.route.navigate(['/login']);
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