import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddressModel } from 'src/app/Admin/ApproveRequestDashBoard/Models/address.model';
import { RestServiceReferenceModel } from 'src/app/Home/Models/service-ref-temp.model';
import { ServiceReference } from 'src/app/Home/Models/service-ref.model';
import { Occupation } from 'src/app/UserDashboard/DashboardModels/occupation.model';
import { User } from 'src/app/UserDashboard/DashboardModels/user.model';
import { Address } from '../Models/address.model';
import { RestCityTemplate } from '../Models/rest-city-template.model';
import { RestCreateUsertemplate } from '../Models/rest-create-user-temp.model';
import { RestSimpleTemplate } from '../Models/rest-simple-template.model';
import { RestStateTemplate } from '../Models/rest-state-template.model';
import { RegisterService } from '../Services/register.service';

@Component({
    selector: 'saving-acc-reg',
    templateUrl: 'saving_acc_reg.component.html',
    styleUrls: ['./saving_acc_reg.component.css']
})

export class SavingAccountRegistration{

    butDisabled: boolean = true;
    butDisabledTwo: boolean = true;
    registerForm: FormGroup;
    firstname: FormControl;
    middlename: FormControl;
    lastname: FormControl;
    fathername: FormControl;
    mobileno: FormControl;
    emailId: FormControl;
    aadharno: FormControl;
    Control: FormControl;
    dob: FormControl;
    Rline1Control: FormControl;
    Rline2: FormControl;
    Rpincode: FormControl;
    Pline1: FormControl;
    Pline2: FormControl;
    Ppincode: FormControl;
    rLandmark: FormControl;
    pLandmark: FormControl;
    invalid:boolean = false;
    isPermanent:boolean = false;

    occtype: FormControl;
    srcincome: FormControl;
    annualIncome: FormControl;

    grossAnnual : number;

    adminId :number = 1002;
    cId : number = 1;
    SerRefStatus : string = "Not Verified";
    SerRefRemark : string = "Document Verification Pending";

    registeredUserTemp : RestCreateUsertemplate;
    restSimpleTemplate : RestSimpleTemplate;
    restSerRefTemp : RestServiceReferenceModel;

    state1Feteched:boolean = false;
    state2Feteched:boolean = false;
    city1Feteched:boolean = false;
    city2Feteched:boolean = false;

    title:string = 'Mr.';
    netBanking = '0';
    debit = '0';
    debitBool:boolean = false;
    netBankingBool:boolean = false;
    agreeBool:boolean= false;

    constructor(private registerService:RegisterService, formBuilder : FormBuilder, private route: Router){
    
        this.firstname = new FormControl("", [Validators.required]);
        this.middlename = new FormControl("", [Validators.required]);
        this.lastname = new FormControl("", [Validators.required]);
        this.fathername = new FormControl("");
        this.mobileno = new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]);
        this.emailId = new FormControl("", Validators.required);
        this.aadharno = new FormControl("",[Validators.required]);
        this.dob = new FormControl("", Validators.required);
        this.Rline1Control = new FormControl("", Validators.required);
        this.Rline2 = new FormControl("", Validators.required);
        this.Rpincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        this.Pline1 = new FormControl("", Validators.required);
        this.Pline2 = new FormControl("", Validators.required);
        this.rLandmark = new FormControl("", Validators.required);
        this.pLandmark = new FormControl("", Validators.required);
        this.Ppincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        this.occtype = new FormControl("", Validators.required);
        this.srcincome = new FormControl("", Validators.required);
        this.annualIncome = new FormControl("", Validators.required);
        
        this.registerForm = formBuilder.group({
            "firstname" : this.firstname,
            "middlename" : this.middlename,
            "lastname" : this.lastname,
            "fathername" : this.fathername,
            "mobileno" : this.mobileno,
            "emailId" : this.emailId,
            "aadharno" : this.aadharno,
            "dob" : this.dob,
            "Rline1" : this.Rline1Control,
            "Rline2" : this.Rline2,
            "Rpincode" : this.Rpincode,
            "Pline1" : this.Pline1,
            "Pline2" : this.Pline2,
            "Ppincode" : this.Ppincode,
            "rLandmark": this.rLandmark,
            "pLandmark" : this.pLandmark,
            "occtype" : this.occtype,
            "srcincome" : this.srcincome,
            "annualIncome" : this.annualIncome
        });
        
        
    }

    datafetched: boolean = false;
    ngOnInit() : void{
        this.getStates();
        this.getCities();
        this.getStatesTwo();
        this.getCitiesSecond();
    }

    restStateTemplate:RestStateTemplate;
    restStateTemplateSecond:RestStateTemplate;
    restCityTemplate:RestCityTemplate;
    restCityTemplateSecond:RestCityTemplate;
    selectedValue:string="1";
    selectedValueTwo:string="1";
    citySelectedValueOne:string;
    citySelectedValueTwo:string;

    //constructor(private registerService : RegisterService) {    }

    getStates() : void{
        this.registerService.getStates().subscribe(results => {
            this.datafetched=true;
            this.restStateTemplate = results
            this.state1Feteched = true;
            //this.getCities();
            //console.log(this.restStateTemplate.requestStatus.message);
            }
        );
    }

    getStatesTwo() : void{
        this.registerService.getStates().subscribe(results => {
            this.datafetched=true;
            this.restStateTemplateSecond = results
            this.state2Feteched = true;
            //this.getCities();
            //console.log(this.restStateTemplate.requestStatus.message);
            }
        );
    }
    getCities() : void{
        this.registerService.getCities(Number(this.selectedValue)).subscribe(results =>{
            this.datafetched=true;
            this.restCityTemplate = results;
            this.city1Feteched = true;
            console.log(this.restCityTemplate.requestStatus.message);
        })
    }

    getCitiesSecond() : void{
        this.registerService.getCities(Number(this.selectedValueTwo)).subscribe(results =>{
            this.datafetched=true;
            this.restCityTemplateSecond = results;
            this.city2Feteched = true;
            console.log(this.restCityTemplateSecond.requestStatus.message);
        })
    }

    selectChangeHandler(event:any) {
        this.selectedValue = event.target.value;
        console.log(this.selectedValue);
        this.butDisabled=false;
        this.getCities();
    }

    selectChangeHandlerSecond(event:any) {
        this.selectedValueTwo = event.target.value;
        console.log(this.selectedValueTwo);
        this.butDisabledTwo=false;
        this.getCitiesSecond();
    }

    setCity1(event:any){
        this.citySelectedValueOne = event.target.value;
        console.log(this.citySelectedValueOne);
    }

    setCity2(event:any){
        this.citySelectedValueTwo = event.target.value;
    }


    isPerma(){
        this.isPermanent = !this.isPermanent;
    }

    preRegister(){
        if(this.agreeBool){
            this.register();
        }
        else{
            alert('Please Agree to terms and conditions');
        }
    }
 
    register(){
        this.invalid = false;
        // check for validity
        // if(!this.registerForm.valid){
        //   // show an error message
        //   this.invalid = true;
        //   return;
        // }
        let user:User = new User(
            null,
            this.title,
            this.firstname.value,
            this.middlename.value,
            this.lastname.value,
            this.fathername.value,
            this.mobileno.value,
            this.emailId.value,
            this.aadharno.value,
            this.dob.value,
            Number(this.netBanking),
            Number(this.debit)
        );

        

        console.log(user);
        this.registerService.createUser(user).subscribe(results => {
            console.log("successful")
            this.registeredUserTemp = results

            if (this.isPermanent == true) {
                let address : Address = new Address(
                    null,
                    this.registeredUserTemp.user.userId,
                    Number(this.selectedValue),
                    Number(this.citySelectedValueOne),
                    this.Rline1Control.value,
                    this.Rline2.value,
                    this.rLandmark.value,
                    this.Rpincode.value,
                    1
                )

                this.registerService.insertAddress(address).subscribe(message =>{
                    this.restSimpleTemplate = message;
                    console.log("same address")
                })

            } else {
                let residentialAddress : Address = new Address(
                    null,
                    this.registeredUserTemp.user.userId,
                    Number(this.selectedValue),
                    Number(this.citySelectedValueOne),
                    this.Rline1Control.value,
                    this.Rline2.value,
                    this.rLandmark.value,
                    this.Rpincode.value,
                    0
                )

                let permanentAddress : Address = new Address(
                    null,
                    this.registeredUserTemp.user.userId,
                    Number(this.selectedValueTwo),
                    Number(this.citySelectedValueTwo),
                    this.Pline1.value,
                    this.Pline2.value,
                    this.pLandmark.value,
                    this.Ppincode.value,
                    1
                )

                this.registerService.insertAddress(residentialAddress).subscribe(message =>{
                    this.restSimpleTemplate = message;
                    console.log("res. address "+this.restSimpleTemplate.message)
                })
                this.registerService.insertAddress(permanentAddress).subscribe(message =>{
                    this.restSimpleTemplate = message;
                    console.log("perm. address "+this.restSimpleTemplate.message)
                })
            }
            
            if (this.annualIncome.value == "less50K") {
                this.grossAnnual = 49999;
            } else if (this.annualIncome.value == "less1L") {
                this.grossAnnual = 99999;
            } else if (this.annualIncome.value == "more1L") {
                this.grossAnnual = 100001;
            }

            let occupation : Occupation = new Occupation(
                null,
                this.registeredUserTemp.user.userId,
                this.occtype.value,
                this.srcincome.value,
                this.grossAnnual
            )

            this.registerService.insertOccupation(occupation).subscribe(message => {
                this.restSimpleTemplate = message
                console.log(this.restSimpleTemplate.message)
            })


            this.registerService.generateServiceReference(this.registeredUserTemp.user.userId + "", this.SerRefStatus, this.SerRefRemark).subscribe(results => {
                this.restSerRefTemp = results;
                console.log(this.restSerRefTemp.message)
                this.route.navigate(['/accountStatus']);
            })

        });

    }

    setTitle(event:any){
        this.title = event.target.value;
    }

    setDebit(event:any){
        this.debitBool = !this.debitBool;
        if(this.debitBool){
            this.debit = '1';
        }
        else{
            this.debit = '0';
        }
    }
    
    setNetBanking(event:any){
        this.netBankingBool = !this.netBankingBool;
        if(this.netBankingBool){
            this.netBanking = '1';
        }
        else{
            this.netBanking = '0';
        }
    }
    
    setAgree(event:any){
        this.agreeBool = !this.agreeBool;
    }

}