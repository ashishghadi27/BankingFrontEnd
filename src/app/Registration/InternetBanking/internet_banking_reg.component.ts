import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Admin/admin.service';
import { AuthenticationService } from 'src/app/UserAuthentication/authentication.service';
import { RestOTPTemplate } from '../Models/rest-otp-template.model';
import { RegisterService } from '../Services/register.service';
import { InternetBanking } from './Models/internetbanking.model';
import { RestInternetBanking } from './Models/rest-internetbanking.model';

@Component({
    selector: 'internet-banking-reg',
    templateUrl: 'internet_banking_reg.component.html',
    styleUrls: ['./internet_banking_reg.component.css']
})

export class InternetBankingRegistration{
    
    registerForm: FormGroup;

    submitted = false;
    passwordsConfirmed = false;

    AccountNo : FormControl;
    lpassword : FormControl;
    confirmPassword : FormControl;
    tpassword : FormControl;
    tconfirmPassword : FormControl;

    otpForm : FormGroup;
    OTPEntered : FormControl;

    accountNo : number;
    loginPassword : string;
    confirmLoginPassword : string;
    transactionPassword : string;
    confirmTransactionPassword : string;



    accountExists : boolean = true;

    userId : number;
    OTPGenerated : number;
    lpmismatch : boolean = false;
    tpmismatch : boolean = false;
    otpmismatch : boolean = false;
    userEmail:string;

    ngOnInit() : void{
        //this.getUserId();
    }

    constructor(private registerService : RegisterService, formBuilder : FormBuilder, private utilService:AdminService, private authService:AuthenticationService, private route:Router) {  

        this.AccountNo = new FormControl("",Validators.required);
        this.lpassword = new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]));
        this.confirmPassword = new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]));
        this.tpassword = new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]));
        this.tconfirmPassword = new FormControl("",Validators.compose([Validators.required, Validators.minLength(6)]));

        this.registerForm = formBuilder.group({
            "accountNo" : this.AccountNo,
            "loginPassword" : this.lpassword,
            "confirmLoginPassword" : this.confirmPassword,
            "transactionPassword" : this.tpassword,
            "confirmTransactionPassword" : this.tconfirmPassword
        })

        this.OTPEntered = new FormControl("",Validators.required);

        this.otpForm = formBuilder.group({
            "OTPEntered" : this.OTPEntered
        })

    }

    restOTPTemplate : RestOTPTemplate;

    restOTPTemplateTwo : RestOTPTemplate;
    restRegNetBankingTemp : RestInternetBanking;

    generateOTP() {
        console.log('called');
        this.accountNo = Number(this.AccountNo.value);
        this.loginPassword = this.lpassword.value;
        this.confirmLoginPassword = this.confirmPassword.value;
        this.transactionPassword = this.tpassword.value;
        this.confirmTransactionPassword = this.tconfirmPassword.value;

        this.registerService.checkAccountNo(this.accountNo).subscribe((result) => {
            this.restOTPTemplateTwo = result;
            //console.log(this.restOTPTemplateTwo);
            if (this.restOTPTemplateTwo.userId == null) {
                this.accountExists = false;
                return;
            } else {
                this.userId = this.restOTPTemplateTwo.userId;
                this.OTPGenerated = this.restOTPTemplateTwo.otp;
                
                this.authService.checkInternetBanking(this.userId).subscribe((iData)=>{
                    if (this.loginPassword != this.confirmLoginPassword || this.transactionPassword != this.confirmTransactionPassword) {
                        if (this.loginPassword != this.confirmLoginPassword) {
                            this.lpmismatch = true;
                        }
                        if (this.transactionPassword != this.confirmTransactionPassword) {
                            this.tpmismatch = true;
                        }
                        return;
                    } else {
                        this.passwordsConfirmed = true;
                        if(iData.message != 'Net Banking is Enabled'){
                            this.utilService.getUser(this.userId + "").subscribe((userData)=>{
                                if(userData.user != null){
                                    this.userEmail = userData.user.email;
                                    this.utilService.sendSms("Your OTP is:" + this.restOTPTemplateTwo.otp + "\n Please don't share this OTP.", userData.user.email.trim()).subscribe(
                                        data=>console.log(data)
                                    );
                                }
                            })
                        }
                        else{
                            alert('Net Banking is Already Enabled. Please Log In');
                            this.route.navigate(['/login']);
                        }
                    }
    
                    
                })

                
            }
        })
    }

    onSubmit() {
        let otpEntered = Number(this.OTPEntered.value);
        if (otpEntered != this.OTPGenerated) {
            this.otpmismatch = true;
        } else {
            let netBanking = new InternetBanking(
                null,
                this.accountNo,
                this.userId.toString(),
                this.loginPassword,
                this.transactionPassword,
                50000,
                1000000,
                2000000,
                0
            )

            this.registerService.registerForNetBanking(netBanking).subscribe((res) => {
                this.restRegNetBankingTemp = res;
                console.log(this.restRegNetBankingTemp.message);
                alert('Internet Banking Enabled');
                let messageNew = 'Your Account has been approved. Account No: ' + this.restRegNetBankingTemp.internetBanking.accountNo + '\n User ID: ' + this.restRegNetBankingTemp.internetBanking.username + '\nPassword: ' + this.restRegNetBankingTemp.internetBanking.password +  '\nTransaction Password: ' + this.restRegNetBankingTemp.internetBanking.transPass;
                this.utilService.sendSms(messageNew, this.userEmail.trim()).subscribe(
                    data=>{
                            console.log(data);
                            this.route.navigate(['/login']);
                    }
                );
                
            })
        }
    }

}