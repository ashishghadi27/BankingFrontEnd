import { Transaction } from "./TransferSuccess/transaction-model";


export class RestTransaction{
    status:string;
    message:string;
    statusCode:string;
    transaction:Transaction;


    constructor(status:string, message:string, statusCode:string, transaction:Transaction){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.transaction= transaction;
    }

}
