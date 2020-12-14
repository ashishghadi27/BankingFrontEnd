import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication.service';
import {  Router } from '@angular/router';
import { RequestStatus } from '../Model/RestSimpleTemplate';
import { UserModel } from 'src/app/Admin/ApproveRequestDashBoard/Models/user.model';
import { AdminService } from 'src/app/Admin/admin.service';

@Component({
    selector: 'user-login',
    templateUrl: 'user_login.component.html',
    styleUrls: ['./user_login.component.css']
})

export class UserAuth{

    loginForm: FormGroup;
    userIdControl: FormControl;
    passwordControl: FormControl;
    restSimpleTemplate: RequestStatus;
    error:boolean;
    errormessage:string;
    uservalid:boolean;
    netbankingenabledvalid:boolean;
    user:UserModel;

    constructor(public dataService: AuthenticationService,formBuilder : FormBuilder, private route: Router, private service:AdminService){
      
      this.checkSession();
      
      this.userIdControl = new FormControl("", Validators.required);
      this.passwordControl = new FormControl("", Validators.compose([Validators.required, Validators.minLength(4), Validators.maxLength(40)]));

      this.loginForm = formBuilder.group({
          "userId":this.userIdControl,
          "password":this.passwordControl
      });
    }
  
    checkUser(userId:number){
      this.dataService.checkUser(userId).subscribe((data)=>{
        this.restSimpleTemplate = data;
        console.log("in checkuser");
        console.log(data);
        console.log(this.restSimpleTemplate.status);
        console.log(this.restSimpleTemplate.message);
        console.log(this.restSimpleTemplate.statusCode);
        if(this.restSimpleTemplate.status==="success"){
          this.uservalid=true;
        }else{
          this.uservalid=false;
        }
        
      });
    }
    
    checkInternetBanking(userId:number){
      this.dataService.checkInternetBanking(userId).subscribe((data)=>{
        this.restSimpleTemplate = data;
        console.log("in  nb");
        console.log(data);
        console.log(this.restSimpleTemplate.status);
        console.log(this.restSimpleTemplate.message);
        console.log(this.restSimpleTemplate.statusCode);

        if(this.restSimpleTemplate.status==="success"){
          this.netbankingenabledvalid=true;
        }
        else{
          this.netbankingenabledvalid=false;
        }
      });
    }

    checkLogin(){
      this.error=false;
      let userId = this.userIdControl.value;
      let password = this.passwordControl.value;
      this.dataService.checkLogin(userId, password).subscribe(
        data => {
          if(data.message === 'User Logged In'){
            this.getUser(userId);
          }
          else{
            this.error=true;
            this.errormessage="Invalid password";
          }
        }
      );

      /*this.checkUser(userId);
      console.log(this.uservalid);
      if(this.uservalid==true){
        console.log("userId correct");
        this.checkInternetBanking(userId);
        if(this.netbankingenabledvalid==true){
          console.log("internet banking enabled");
          this.dataService.checkLogin(userId,password).subscribe((data)=>{
            this.restSimpleTemplate = data;
            console.log("in login");
            console.log(data);
            if(this.restSimpleTemplate.status==="success"){
                this.route.navigate(['/userDashboard']);
            }else{
                console.log("Invalid password");
                this.error=true;
                this.errormessage="Invalid password";
            }
          });
        }
          else{
            console.log("internet banking not enabled");
            this.error=true;
            this.errormessage="Internet Banking is not enabled for your Account";
          }
        }else{
          console.log("incorrect userid");
          this.error=true;
          this.errormessage="Invalid User ID";
        }*/
    }

    saveSession(user:UserModel){
      sessionStorage.setItem('user', JSON.stringify(user));
    }

    checkSession(){
      this.user = JSON.parse(sessionStorage.getItem('user'));
      if(this.user != null || this.user != undefined){
        this.route.navigate(['/userDashboard']);
      }
  }

    getUser(userId:string){
      this.service.getUser(userId).subscribe(userData => {
          if(userData.status === 'success')
          {
            this.saveSession(userData.user);
            this.route.navigate(['/userDashboard']);
          }
          else{
              alert("Some Error Occurred");
              this.route.navigate(['/login']);
          }
      })
  }
}