import { Component } from '@angular/core';
import { HomeService } from '../HomeService/home.service';
import { RestServiceReferenceModel } from '../Models/service-ref-temp.model';

@Component({
    selector: 'service-reference',
    templateUrl: 'service_reference.component.html',
    styleUrls: ['./service_reference.component.css']
})

export class ServiceReferencePage{

    serviceReferenceNumber : number;
    numberNotFound : boolean = false;
    accountStatus : RestServiceReferenceModel;
    dataFetched : boolean = false;
    progressPercent : number;
    statusMessage : string;

    constructor(private service : HomeService) {
        
    }

    getServiceReferenceStatus(refNum : HTMLInputElement) {
        console.log('called');
        this.serviceReferenceNumber = parseInt(refNum.value);
        this.numberNotFound = false;
        if(!this.serviceReferenceNumber) {
            this.numberNotFound = true;
            return;
        } else {
            this.service.getServiceStatus(this.serviceReferenceNumber).subscribe(results => {
                this.dataFetched = true;
                this.accountStatus = results;
                console.log(this.accountStatus);
                if(this.accountStatus.serviceReference != null){
                    this.statusMessage = this.accountStatus.serviceReference.status + '. ' + this.accountStatus.serviceReference.remark;
                }
                else{
                    this.statusMessage = 'Invalid Service Reference Number';
                }
            })
        }
    }
}