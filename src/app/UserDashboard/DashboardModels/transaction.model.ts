export class Transaction {
    transactionId : number;
    accountNo : number;
    reason : string;
    type : string;
    startDate : Date;

    constructor(transactionId : number,
        accountNo : number,
        reason : string,
        type : string,
        startDate : Date) {
        
        this.transactionId = transactionId;
        this.accountNo = accountNo;
        this.reason = reason;
        this.type = type;
        this.startDate = startDate;
    }
}