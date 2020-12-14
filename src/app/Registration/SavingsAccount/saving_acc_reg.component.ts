import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestCityTemplate } from '../Models/rest-city-template.model';
import { RestStateTemplate } from '../Models/rest-state-template.model';
import { RegisterService } from '../Services/register.service';

@Component({
    selector: 'saving-acc-reg',
    templateUrl: 'saving_acc_reg.component.html',
    styleUrls: ['./saving_acc_reg.component.css']
})

export class SavingAccountRegistration{

    registerForm: FormGroup;
    firstname: FormControl;
    middlename: FormControl;
    lastname: FormControl;
    mobileno: FormControl;
    emailId: FormControl;
    aadharno: FormControl;
    Control: FormControl;
    dob: FormControl;
    Rline1: FormControl;
    Rline2: FormControl;
    Rpincode: FormControl;
    Pline1: FormControl;
    Pline2: FormControl;
    Ppincode: FormControl;
    invalid:boolean = false;

    constructor(private registerService:RegisterService, formBuilder : FormBuilder, private route: Router){
    
        this.firstname = new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z]+")]);
        this.middlename = new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z]+")]);
        this.lastname = new FormControl("", [Validators.required,Validators.pattern("[a-zA-Z]+")]);
        this.mobileno = new FormControl("",[Validators.required,Validators.minLength(10),Validators.maxLength(10),Validators.pattern("^[0-9]*$")]);
        this.emailId = new FormControl("", Validators.required);
        this.aadharno = new FormControl("",[Validators.required,Validators.pattern("^[2-9]{1}[0-9]{11}")]);
        this.dob = new FormControl("", Validators.required);
        this.Rline1 = new FormControl("", Validators.required);
        this.Rline2 = new FormControl("", Validators.required);
        this.Rpincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        this.Pline1 = new FormControl("", Validators.required);
        this.Pline2 = new FormControl("", Validators.required);
        this.Ppincode = new FormControl("", [Validators.required,Validators.minLength(6),Validators.maxLength(6),Validators.pattern("^[0-9]*$")]);
        
        this.registerForm = formBuilder.group({
            "firstname" : this.firstname,
            "middlename" : this.middlename,
            "lastname" : this.lastname,
            "mobileno" : this.mobileno,
            "emailId" : this.emailId,
            "aadharno" : this.aadharno,
            "dob" : this.dob,
            "Rline1" : this.Rline1,
            "Rline2" : this.Rline2,
            "Rpincode" : this.Rpincode,
            "Pline1" : this.Pline1,
            "Pline2" : this.Pline2,
            "Ppincode" : this.Ppincode,
            
        });
        
        
    }

    datafetched: boolean = false;
    ngOnInit() : void{
        this.getStates();
        this.getCities();
    }

    restStateTemplate:RestStateTemplate;
    restCityTemplate:RestCityTemplate;
    selectedValue:string="1";

    //constructor(private registerService : RegisterService) {    }

    getStates() : void{
        this.registerService.getStates().subscribe(results => {
            this.datafetched=true;
            this.restStateTemplate = results
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

    selectChangeHandler(event:any) {
        this.selectedValue = event.target.value;
        console.log(this.selectedValue);
        this.getCities();
    }

    selectedValue1:string=this.selectedValue;
 
    /*
        get f() { return this.registerForm.controls; }

    register(){
        this.invalid = false;
        // check for validity
        if(!this.registerForm.valid){
          // show an error message
          this.invalid = true;
          return;
        }
        //this.submitted = true;    
        //onsole.log(this.submitted);*/

        /*let user : User = new User(this.f.title, this.f.firstName, this.f.middleName,this.f.lastname,this.f.fathername,this.f.mobileno,this.f.email,this.f.adharno,this.f.dob,this.netBankingEnabled,this.f.debitEnabled);
        let requestStatus : RestSimpleTemplate = new RestSimpleTemplate("success","User created",100);
        let restUserTemplate : RestUserTemplate = new RestUserTemplate(requestStatus,user);
        
        this.registerService.createUser(restUserTemplate).subscribe(data => {
          this.message=data});
        this.registerForm.reset();

    */
    

}