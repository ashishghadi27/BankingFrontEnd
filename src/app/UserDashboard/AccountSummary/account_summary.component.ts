import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SummaryModel } from '../DashboardModels/summary.model';
import { DashboardService } from '../DashboardService/dashboard.service';

@Component({
    selector: 'account-summary',
    templateUrl: 'account_summary.component.html',
    styleUrls: ['./account_summary.component.css']
})

export class AccountSummary{

    dataFetched : boolean = false;
    userId : number;

    ngOnInit() : void {
        this.getSummary();
    }

    constructor(private dashboardService : DashboardService) {
        this.userId = this.dashboardService.getUserId();
    }


    
    summary : SummaryModel;

    getSummary() : void {
        this.dashboardService.getAccountSummary(this.userId).subscribe(results => {
            this.dataFetched = true;
            this.summary = results;
        } );
    }

}