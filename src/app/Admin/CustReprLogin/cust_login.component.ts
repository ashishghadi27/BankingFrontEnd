import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { CustomerRepresenativeModel } from './Models/custLogin.Model';
import { RestCustRepresModel } from './Models/rest-custLogin.model';

@Component({
    selector: 'cust-login',
    templateUrl: 'cust_login.component.html',
    styleUrls: ['./cust_login.component.css']
})

export class CustRepresLogin{

    loginForm: FormGroup;
    usernameControl: FormControl;
    passwordControl: FormControl;
    invalid:boolean = false;

    constructor(private service:AdminService, formBuilder : FormBuilder, private route: Router){
    
        this.checkSession();
        this.usernameControl = new FormControl("", Validators.required);
        this.passwordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

        this.loginForm = formBuilder.group({
            "username":this.usernameControl,
            "password":this.passwordControl
        });
        
    }

    checkSession(){
        let custRepres:CustomerRepresenativeModel = JSON.parse(sessionStorage.getItem('cust'));
        console.log(custRepres);
        if(custRepres != null || custRepres != undefined){
            this.router();
        }
    }

    login(frm:any){
        this.invalid = false;
        let username = this.usernameControl.value;
        let password = this.passwordControl.value;
        let restCustTemplate:RestCustRepresModel;
        this.service.custLogin(username,password).subscribe(
            (data)=>{
                restCustTemplate = data;
                console.log(restCustTemplate);
                if(restCustTemplate.customerRepres != null){
                    console.log("Login Success");
                    this.saveSession(restCustTemplate.customerRepres);
                    this.router();
                }
                else{
                    this.invalid = true;
                }
            }
        );
    }

    saveSession(cust:CustomerRepresenativeModel){
        sessionStorage.setItem('cust', JSON.stringify(cust));
    }

    router(){
        this.route.navigate(['/documentVerification']);
    }

}