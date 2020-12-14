import { AccountModel } from './account.model';
import { Transaction } from './transaction.model';

export class SummaryModel {
    status : string;
    message : string;
    statusCode : string;
    account : AccountModel;
    transaction : Transaction[];

    constructor(status : string,
        message : string,
        statusCode : string,
        account : AccountModel,
        transactions : Transaction[]) {

        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.account = account;
        this.transaction = transactions;
    }

}