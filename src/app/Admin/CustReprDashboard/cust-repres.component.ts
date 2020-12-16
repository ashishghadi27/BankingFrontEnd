import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { RestServiceReference } from '../AdminLogin/Models/rest-service-ref.model';
import { RestSimpleTemplate } from '../AdminLogin/Models/rest-simple-template.model';
import { ServiceReferenceModel } from '../AdminLogin/Models/service-reference.model';
import { AddressModel } from '../ApproveRequestDashBoard/Models/address.model';
import { UserModel } from '../ApproveRequestDashBoard/Models/user.model';
import { CustomerRepresenativeModel } from '../CustReprLogin/Models/custLogin.Model';

@Component({
    selector: 'cust-repres',
    templateUrl: 'cust-repres.component.html',
    styleUrls: ['./cust-repres.component.css']
})

export class CustomerRepresentative{

    cust:CustomerRepresenativeModel;
    serviceList:ServiceReferenceModel[];
    serviceReferenceData:ServiceReferenceModel;
    restTemplate:RestSimpleTemplate;
    user:UserModel;
    permaAddress:AddressModel;

    constructor(private service:AdminService, private route: Router){
        this.checkSession();
        this.getServiceList(this.cust.cId + "");
    }

    getServiceList(cid:string){
        let restServiceReference:RestServiceReference;
        this.service.getListOfServiceReferenceByCid(cid).subscribe(data=>{
            restServiceReference = data;
            if(restServiceReference.serviceReferences != null){
                this.serviceList = restServiceReference.serviceReferences;
            }
            else this.serviceList = [];
        });
    }

    updateStatusAndRemark(data:ServiceReferenceModel){
        this.service.updateStatusAndRemark(data.userId + "", 'Details Verfied', 'Awaiting Admin Verification').subscribe(updationData=>{
            if(updationData.status == 'success'){  
                this.getServiceList(this.cust.cId + "");
            }
        });
        this.getServiceList(this.cust.cId + "");
    }

    verify(){
        this.updateStatusAndRemark(this.serviceReferenceData);
    }

    checkSession(){
        this.cust = JSON.parse(sessionStorage.getItem('cust'));
        if(this.cust == null || this.cust == undefined)
            this.route.navigate(['/customer-repres-login']);
    }

    logout(){
        sessionStorage.removeItem('cust');
        this.route.navigate(['/customer-repres-login']);
    }

    getUser(data:ServiceReferenceModel){
        this.serviceReferenceData = data;
        this.service.getUser(data.userId + "").subscribe(userData => {
            if(userData.status === 'success')
            {
                this.user = userData.user;
                this.setAddress(userData.addresses);
            }
            else{
                alert("Some Error Occurred");
            }
        })
    }

    setAddress(addresses:AddressModel[]){
        console.log(addresses)
        if(addresses[0].isPermanent == '1'){
            this.permaAddress = addresses[0];
        }
        else{
            this.permaAddress = addresses[1];
        }
    }

}