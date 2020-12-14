import { Component } from '@angular/core';
import { RestOTPTemplate } from '../Models/rest-otp-template.model';
import { RegisterService } from '../Services/register.service';

@Component({
    selector: 'internet-banking-reg',
    templateUrl: 'internet_banking_reg.component.html',
    styleUrls: ['./internet_banking_reg.component.css']
})

export class InternetBankingRegistration{
    ngOnInit() : void{
        this.getUserId();
    }

    constructor(private registerService : RegisterService) {    }

    accountNo : number = 101;
    restOTPTemplate : RestOTPTemplate;

    getUserId():void{
        this.registerService.getUserId(this.accountNo).subscribe(results => {
            this.restOTPTemplate = results
            console.log(this.restOTPTemplate.otp);
            }
        );
    }

    registerForm: FormGroup;
    submitted = false;
    /*loginForm: FormGroup;
    accountNoControl: FormControl;
    passwordControl: FormControl;
    CpasswordControl: FormControl;
    TpasswordControl: FormControl;
    TCpasswordControl: FormControl;
    OTPControl: FormControl;
    invalid:boolean = false;
    
     constructor(private service:RegisterService, formBuilder : FormBuilder, private route: Router){
    
        this.accountNoControl = new FormControl("", Validators.required);
        this.passwordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));
        this.CpasswordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40),this.validateAreEqual.bind(this)]));
        this.TpasswordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));
        this.TCpasswordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));
        this.OTPControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));
    

        this.loginForm = formBuilder.group({
            "accountNo":this.accountNoControl,
            "Lpassword":this.passwordControl,
            "CLpassword":this.CpasswordControl,
            "Tpassword":this.TpasswordControl,
            "CTpassword":this.TCpasswordControl,
        },{
            validator1: ConfirmedValidator('passwordControl', 'CpasswordControl'),
            validator2: ConfirmedValidator('TpasswordControl', 'TCpasswordControl')
        });
        
    }
    /*login(frm:any){
        this.invalid = false;
        let accountNo = this.accountNoControl.value;
        let password = this.passwordControl.value;
        let Tpassword = this.TpasswordControl.value;
        let otp = this.OTPControl.value;
        let restInternetBankingTemplate:RestInternetBanking;
        //let restOtpTemplate:RestOTPTemplate;
        
        this.service.getinternetBanking(accountNo,password,Tpassword).subscribe(
            (data)=>{
                restInternetBankingTemplate = data;
                if(restInternetBankingTemplate.internetBanking != null){// && restOtpTemplate.otp==otp){
                    console.log("Internet Banking Register Success");
                    this.route.navigate(['/saving']);
                }
                else{
                    this.invalid = true;
                }
            }
        );
    }*/

   /* constructor(private formBuilder: FormBuilder) {}
    ngOnInit() {
        this.registerForm = this.formBuilder.group(
          {
            AccountNo: ["", [Validators.required]],
            password: ["", [Validators.required, Validators.minLength(6)]],
            confirmPassword: ["", Validators.compose([Validators.required])],
            tpassword: ["", [Validators.required, Validators.minLength(6),]],
            tconfirmPassword: ["", Validators.required],
            lastName: ["", [Validators.required]],
          },
          {
            // Used custom form validator name
            //validator: Validators.compose{[[CompareLPasswords("password", "confirmPassword"), PasswordValidation.PasswordRule])},
            validator: CompareTPasswords("password","confirmPassword"),
//                       CompareTPasswords("tpassword","tconfirmPassword"),
          },

        );
    }
    
      // Getter function in order to get form controls value
      get f() {
        return this.registerForm.controls;
      }
    
      onSubmit() {
        this.submitted = true;
    
        // Returns false if form is invalid
        if (this.registerForm.invalid) {
          return;
        }
    
        console.log("Form Values" + JSON.stringify(this.registerForm.value));
      }*/
}