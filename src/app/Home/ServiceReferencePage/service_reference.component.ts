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

    setProgressBar(percent : number) : void {
        const elem = document.getElementById("prg");
        elem.style.width = percent + "%";
    }



    getServiceReferenceStatus(refNum : HTMLInputElement) {
        this.serviceReferenceNumber = parseInt(refNum.value);
        this.numberNotFound = false;
        if(!this.serviceReferenceNumber) {
            this.numberNotFound = true;
            return;
        } else {
            this.service.getServiceStatus(this.serviceReferenceNumber).subscribe(results => {
                this.dataFetched = true;
                this.accountStatus = results;

                if (this.accountStatus.serviceReference.status=="Not Verified") {
                    this.progressPercent = 2;
                    this.statusMessage = "Your documents are being verified.";
                } else if (this.accountStatus.serviceReference.status=="Under Verification") {
                    this.progressPercent = 50;
                    this.statusMessage = "Awaiting admin approval.";
                } else if (this.accountStatus.serviceReference.status=="Verified") {
                    this.progressPercent = 100;
                    this.statusMessage = "Request Approved !";
                }

                this.setProgressBar(this.progressPercent);


            })
        }
    }
}