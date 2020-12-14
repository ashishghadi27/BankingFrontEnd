import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/UserDashboard/DashboardModels/user.model';
import { RestCityTemplate } from '../Models/rest-city-template.model';
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

    title:string = 'Mr.';
    netBanking = '0';
    debit = '0';


    constructor(private registerService:RegisterService, formBuilder : FormBuilder, private route: Router){
    
        this.firstname = new FormControl("", [Validators.required]);
        this.middlename = new FormControl("", [Validators.required]);
        this.lastname = new FormControl("", [Validators.required]);
        this.fathername = new FormControl("");
        this.mobileno = new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]);
        this.emailId = new FormControl("", Validators.required);
        this.aadharno = new FormControl("",[Validators.required,Validators.pattern("^[2-9]{1}[0-9]{11}")]);
        this.dob = new FormControl("", Validators.required);
        this.Rline1Control = new FormControl("", Validators.required);
        this.Rline2 = new FormControl("", Validators.required);
        this.Rpincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        this.Pline1 = new FormControl("", Validators.required);
        this.Pline2 = new FormControl("", Validators.required);
        this.rLandmark = new FormControl("", Validators.required);
        this.pLandmark = new FormControl("", Validators.required);
        this.Ppincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        
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
            "pLandmark" : this.pLandmark
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
            //this.getCities();
            //console.log(this.restStateTemplate.requestStatus.message);
            }
        );
    }

    getStatesTwo() : void{
        this.registerService.getStates().subscribe(results => {
            this.datafetched=true;
            this.restStateTemplateSecond = results
            //this.getCities();
            //console.log(this.restStateTemplate.requestStatus.message);
            }
        );
    }
    getCities() : void{
        this.registerService.getCities(Number(this.selectedValue)).subscribe(results =>{
            this.datafetched=true;
            this.restCityTemplate = results;
            console.log(this.restCityTemplate.requestStatus.message);
        })
    }

    getCitiesSecond() : void{
        this.registerService.getCities(Number(this.selectedValueTwo)).subscribe(results =>{
            this.datafetched=true;
            this.restCityTemplateSecond = results;
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
    }

    setCity2(event:any){
        this.citySelectedValueTwo = event.target.value;
    }

    selectedValue1:string=this.selectedValue;

    isPerma(){
        this.isPermanent = !this.isPermanent;
        if(this.isPermanent){
            console.log("Value" + this.Rline1Control.value);
            this.Pline1.setValue(this.Rline1Control.value + '');
            this.Pline2.setValue(this.Rline2.value + '');
            this.pLandmark.setValue(this.rLandmark.value + '');
            this.citySelectedValueTwo = this.citySelectedValueOne;
            this.selectedValue1 = this.selectedValue;

        }
        else{
            let  empty = '';
            this.Pline1.setValue('');
        }
    }
 
    register(){
        this.invalid = false;
        // check for validity
        if(!this.registerForm.valid){
          // show an error message
          this.invalid = true;
          return;
        }
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
       

    }

    setTitle(event:any){
        this.title = event.target.value;
    }

}