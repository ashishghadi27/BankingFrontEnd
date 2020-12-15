export class Transaction{
    transactionId:number; 
    accountNo : number;
    reason :string;
    type : string;
    endDate : Date;
    amount : number;
    toAccount:string
    status : string;
    message : string;
    statusCode : string;
   

    constructor( transactionId:number, accountNo : number, reason :string, type : string, endDate : Date,amount : number,status : string,
        message : string,
        statusCode : string){
        this.transactionId=transactionId;
        this.accountNo=accountNo;
        this.reason=reason;
        this.type=type;
        this.endDate=endDate;
        this.amount=amount;
        
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;

    }
}