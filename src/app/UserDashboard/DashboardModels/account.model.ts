export class AccountModel {
    accountNo : number;
    userId : number;
    branchId : number;
    accountType : string;
    balance : number;

    constructor(accountNo : number,
                userId : number,
                branchId : number,
                accountType : string,
                balance : number){
        this.accountNo = accountNo;
        this.userId = userId;
        this.branchId = branchId;
        this.accountType = accountType;
        this.balance = balance;
    }

}