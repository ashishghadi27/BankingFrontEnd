
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StatementModel } from '../DashboardModels/statement.model';
import { DashboardService } from '../DashboardService/dashboard.service';

@Component({
    selector: 'account-statement',
    templateUrl: 'account_statement.component.html',
    styleUrls: ['./account_statement.component.css']
})

export class AccountStatement{

    dataFetched : boolean = false;

    ngOnInit() : void {
        this.getStatementWithoutDates();
    }

    constructor (private dashboardService : DashboardService, private route : ActivatedRoute) {

    }

    noStartDate : boolean = false;
    noEndDate : boolean = false;
    timelineError : boolean = false;
    lastDateError : boolean = false;
    firstDateError : boolean = false;
    userId : number = 3;
    startDate : string;
    endDate : string;
    statement : StatementModel;

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


    getStatementWithoutDates() : void {
        this.dataFetched = false;
        this.startDate = null;
        this.endDate = null;
        this.dashboardService.getAccountStatement(this.userId, this.startDate, this.endDate)
        .subscribe(results =>{
            this.dataFetched = true;
            this.statement = results;
        } );
    }

    getStatementWithDates(frm : any) : void {
    
        this.dataFetched = false;
        this.timelineError = false;
        this.lastDateError = false;
        this.firstDateError = false;
        this.noStartDate = false;
        this.noEndDate = false;
        this.startDate = this.toShortFormat(new Date(frm.stmtStartDate));
        this.endDate = this.toShortFormat(new Date(frm.stmtEndDate));
        if (!frm.stmtStartDate) {
            this.noStartDate = true;
            return;
        } else if (!frm.stmtEndDate) {
            this.noEndDate = true;
            return;
        } else if (new Date(frm.stmtStartDate) > new Date()) {
            this.firstDateError = true;
            return;
        } else if (new Date(frm.stmtStartDate) > new Date(frm.stmtEndDate)) {
            this.timelineError = true;
            return;
        } else if (new Date(frm.stmtEndDate) > new Date()) {
            this.lastDateError = true;
            this.endDate = this.toShortFormat(new Date());
        }
        
        
    //    this.startDate = frm.stmtStartDate;
    //    this.endDate = frm.stmtEndDate;

        this.dashboardService.getAccountStatement(this.userId, this.startDate, this.endDate)
        .subscribe(results => {
            this.dataFetched = true;
            this.statement = results;
        });
    }
}

