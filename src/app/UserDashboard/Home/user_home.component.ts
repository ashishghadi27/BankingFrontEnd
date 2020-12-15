import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'user-home',
    templateUrl: 'user_home.component.html',
    styleUrls: ['./user_home.component.css']
})

export class UserHome
{
    constructor(private route:Router){

    }

    goToForgotPass(){
        this.route.navigate(['forgotpassword'])
    }

    goToChangeTransPass(){
        this.route.navigate(['newtransactionpassword'])
    }

    logout(){
        sessionStorage.removeItem('user');
        this.route.navigate(['login']);
    }
}