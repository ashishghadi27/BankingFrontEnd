import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '../admin.service';
import { Admin } from '../AdminLogin/Models/admin-login.model';
import { RestServiceReference } from '../AdminLogin/Models/rest-service-ref.model';
import { RestSimpleTemplate } from '../AdminLogin/Models/rest-simple-template.model';
import { ServiceReferenceModel } from '../AdminLogin/Models/service-reference.model';
import { AccountModel } from './Models/account.model';
import { AddressModel } from './Models/address.model';
import { Branch } from './Models/branch.model';
import { DebitCard } from './Models/debit.model';
import { UserModel } from './Models/user.model';

@Component({
    selector: 'approve-request',
    templateUrl: 'approve-request.component.html',
    styleUrls: ['./approve-request.component.css']
})

export class ApproveRequest{

    
    admin:Admin;
    serviceList:ServiceReferenceModel[];
    branches:Branch[];
    restTemplate:RestSimpleTemplate;
    user:UserModel;
    permaAddress:AddressModel;
    branchForAccount:string;
    dataFetched:boolean = false;
    message:string;
    percent:Number = 0;
    serviceReferenceData: ServiceReferenceModel;

    constructor(private route:Router, private service:AdminService){
        this.checkSession();
    }

    checkSession(){
        this.admin = JSON.parse(sessionStorage.getItem('admin'));
        if(this.admin == null || this.admin == undefined){
            this.route.navigate(['/admin-login']);
        }
        else{
            this.getServiceList(this.admin.adminId + "");
        }
    }

    getServiceList(adminId:string){
        let restServiceReference:RestServiceReference;
        this.service.getListOfServiceReferenceByAdminId(adminId).subscribe(data=>{
            restServiceReference = data;
            if(restServiceReference.serviceReferences != null){
                this.serviceList = restServiceReference.serviceReferences;
            }
            else this.serviceList = [];
        });
    }

    logout(){
        sessionStorage.removeItem('admin');
        this.route.navigate(['/admin-login']);
    }

    getUser(data:ServiceReferenceModel){
        this.serviceReferenceData = data;
        this.service.getUser(data.userId + "").subscribe(userData => {
            if(userData.status === 'success')
            {
                this.dataFetched = true;
                this.user = userData.user;
                this.setAddress(userData.addresses);
                this.getBankBranches();
            }
            else{
                alert("Some Error Occurred");
            }
        })
    }

    setAddress(addresses:AddressModel[]){
        if(addresses[0].isPermanent == '1'){
            this.permaAddress = addresses[0];
        }
        else{
            this.permaAddress = addresses[1];
        }
    }

    getBankBranches(){
        this.service.getBranches().subscribe(data => {
            this.branches = data.branches;
        });
    }
    
    confirm(){
        //console.log('called');
        //console.log('Random PAssword: ' + this.generatePassword())
        this.createAccount();
        this.updateStatusAndRemark(this.serviceReferenceData);
    }

    updateStatusAndRemark(data:ServiceReferenceModel){
        this.service.updateStatusAndRemark(data.userId + "", 'Approved', 'Account Created').subscribe(updationData=>{
            if(updationData.status == 'success'){  
                this.getServiceList(this.admin.adminId + "");
            }
        });
        
    }

    reject(data:ServiceReferenceModel){
        this.service.updateStatusAndRemark(data.userId + "", 'Rejected', 'Please Contact Customer Support').subscribe(updationData=>{
            if(updationData.status == 'success'){  
                this.getServiceList(this.admin.adminId + "");
            }
        });
        
    }

    createAccount(){
        if(this.user.netBankingEnabled == '1' || this.user.debitEnabled == '1'){
            this.percent = 40;
        }
        else{
            this.percent = 20;
        }
        this.message = 'Account Creation Started'
        console.log(this.message);
        let account:AccountModel = new AccountModel();
        account.accountType = 'SAVINGS';
        account.balance = '10000';
        account.branchId = '1';
        account.userId = this.user.userId;
        this.service.createAccount(account).subscribe(accountData => {
            if(accountData.status == 'success'){
                console.log(accountData);
                if(this.user.netBankingEnabled == '1' || this.user.debitEnabled == '1'){
                    this.percent = 60;
                    this.message = 'Account Created';
                }
                else{
                    this.percent = 100;
                    this.message = 'Account Created';
                    let messageNew = 'Your Account has been created. Account No: ' + accountData.account.accountNo + '. ';
                                this.service.sendSms(messageNew, this.user.email).subscribe(
                                    data=>console.log(data)
                    );
                }
                if(this.user.netBankingEnabled == '1'){
                    this.service.enableInternetBanking(accountData.account.accountNo, accountData.account.userId, this.generatePassword()).subscribe(
                        (iB)=>{
                            if(iB.internetBanking.id != null || iB.internetBanking.id != undefined){
                                this.percent = 80;
                                this.message = 'Internet Banking Enabled';
                                let messageNew = 'Your Account has been approved. Account No: ' + iB.internetBanking.accountNo + '\n User ID: ' + iB.internetBanking.username + '\nPassword: ' + iB.internetBanking.password +  '\nTransaction Password: ' + iB.internetBanking.transPass + "\n If you have opted for debit card, It will be delivered to you residential address within 5 business days";
                                this.service.sendSms(messageNew, this.user.email).subscribe(
                                    data=>console.log(data)
                                );
                                if(this.user.debitEnabled == '1'){  
                                    this.service.registerDebitCard(this.createDebitCardObject(accountData.account.accountNo)).subscribe((debitData => {
                                        this.percent = 100;
                                        this.message = 'Debit Card Registered';
                                        this.message = 'SAVINGS Account Created';
                                    }));
                                    
                                }
                            }
                        }
                    );
                    
                }
                else if(this.user.debitEnabled == '1'){
                    this.service.registerDebitCard(this.createDebitCardObject(accountData.account.accountNo)).subscribe((debitData => {
                        this.percent = 100;
                        this.message = 'Debit Card Registered';
                        this.message = 'SAVINGS Account Created';
                    }));
                }
                
            }
        });
    }

    setBranch(branch:string){
        this.branchForAccount = branch;
    }


    generatePassword(){
        var chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        var string_length = 8;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    generateDebitCardNumber(){
        var chars = "123456789";
        var string_length = 16;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    generateCVV(){
        var chars = "123456789";
        var string_length = 3;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    generatePin(){
        var chars = "123456789";
        var string_length = 4;
        var randomstring = '';
        for (var i=0; i<string_length; i++) {
            var rnum = Math.floor(Math.random() * chars.length);
            randomstring += chars.substring(rnum,rnum+1);
        }
        return randomstring;
    }

    createDebitCardObject(accountNo:string):DebitCard{
        let debit:DebitCard = new DebitCard();
        debit.accountNo = accountNo;
        debit.debitCardNumber = this.generateDebitCardNumber();
        debit.isBlocked = '0';
        debit.pin = this.generatePin();
        debit.cvv = this.generateCVV();
        return debit;
    }

}