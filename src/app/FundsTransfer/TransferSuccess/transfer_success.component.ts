import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyDataService } from '../data-service';
import { Transaction } from './transaction-model';

@Component({
    selector: 'transfer-success',
    templateUrl: 'transfer_success.component.html',
    styleUrls: ['./transfer_success.component.css']
})

export class TransferSuccessful{
    transaction: Transaction;
    transId:string;
    fetched:boolean = false;

    constructor(private service:MyDataService, private route:ActivatedRoute){
        this.transId = this.route.snapshot.paramMap.get('id');
        this.fetchTransaction();
    }

    fetchTransaction(){
        this.service.fetchTransaction(this.transId).subscribe((data)=>{
            this.transaction=data.transaction;
            this.fetched = true;
            console.log(this.transaction);
        })
    }


}