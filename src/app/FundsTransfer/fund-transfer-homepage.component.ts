import { Component } from '@angular/core';
import { MyDataService } from './data-service';

@Component({
    selector: 'fund-transfer',
    templateUrl: 'fund-transfer-homepage.component.html',
    styleUrls: ['./fund-transfer-homepage.component.css']
})

export class FundsTransferHome{
    constructor(private service:MyDataService){
        this.service.fetchBeneficiary('1500012').subscribe(
            response=> {
               console.log(response);
            }
        );
    }
}