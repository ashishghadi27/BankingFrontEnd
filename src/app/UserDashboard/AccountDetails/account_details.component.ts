import { Component } from '@angular/core';
import { AccountStatement } from '../AccountStatement/account_statement.component';
import { DetailsModel } from '../DashboardModels/details.model';
import { DashboardService } from '../DashboardService/dashboard.service';

@Component({
    selector: 'account-details',
    templateUrl: 'account_details.component.html',
    styleUrls: ['./account_details.component.css']
})

export class AccountDetails{

    dataFetched : boolean = false;

    ngOnInit() : void {
        this.getDetails();
    }

    constructor (private dashboardService : DashboardService) {
        
    }

    userId : number = 3;
    accountDetails : DetailsModel;
    fullName : string;
    dob : string;

    toShortFormat = function(date : Date) {

        let monthNames =["Jan","Feb","Mar","Apr",
                          "May","Jun","Jul","Aug",
                          "Sep", "Oct","Nov","Dec"];
        
        let day = date.getDate();
        
        let monthIndex = date.getMonth();
        let monthName = monthNames[monthIndex];
        
        let year = date.getFullYear();
        
        return `${day}-${monthName}-${year}`;  
    }


    getDetails() : void {
        this.dashboardService.getAccountDetails(this.userId).subscribe( results => {
            this.dataFetched = true;
            this.accountDetails = results;
            if (this.accountDetails.user.middleName == null) {
                this.fullName = this.accountDetails.user.firstName+" "+this.accountDetails.user.lastName;
            } else {
                this.fullName = this.accountDetails.user.firstName+" "+this.accountDetails.user.middleName+" "+this.accountDetails.user.lastName;
            }
            console.log(this.accountDetails.user.middleName);
            this.dob = this.toShortFormat(new Date(this.accountDetails.user.dob));
            
        });

        

        

    }

    
}