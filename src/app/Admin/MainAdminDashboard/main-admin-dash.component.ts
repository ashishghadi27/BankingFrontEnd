import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../AdminLogin/Models/admin-login.model';
import { RestServiceReference } from '../AdminLogin/Models/rest-service-ref.model';
import { RestSimpleTemplate } from '../AdminLogin/Models/rest-simple-template.model';
import { ServiceReferenceModel } from '../AdminLogin/Models/service-reference.model';

@Component({
    selector: 'main-admin-dash',
    templateUrl: 'main-admin-dash.component.html',
    styleUrls: ['./main-admin-dash.component.css']
})

export class MainAdminDashboard{

    admin:Admin;
    serviceList:ServiceReferenceModel[];
    restTemplate:RestSimpleTemplate;

    constructor(private service:AdminService, private route: Router){
        this.checkSession();
        this.getServiceList();
    }

    getServiceList(){
        let restServiceReference:RestServiceReference;
        this.service.getListOfServiceReference().subscribe(data=>{
            restServiceReference = data;
            if(restServiceReference.serviceReferences != null){
                this.serviceList = restServiceReference.serviceReferences;
            }
            else this.serviceList = [];
        });
    }

    updateAdminAndCid(admintd:HTMLInputElement, cidtd:HTMLInputElement, data:ServiceReferenceModel){
        this.service.updateAdminIdAndCid(data.userId + '', admintd.value, cidtd.value).subscribe(data => {
            this.restTemplate = data;
            console.log(this.restTemplate.message);
        });
        this.getServiceList();
    }


    checkSession(){
        this.admin = JSON.parse(sessionStorage.getItem('admin'));
        if(this.admin == null || this.admin == undefined)
            this.route.navigate(['/admin-login']);
    }

    logout(){
        sessionStorage.removeItem('admin');
        this.route.navigate(['/admin-login']);
    }

}