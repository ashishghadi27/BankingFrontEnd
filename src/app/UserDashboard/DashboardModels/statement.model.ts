import { AccountModel } from './account.model';
import { Branch } from './branch.model';
import { Transaction } from './transaction.model';

export class StatementModel {
    status : string;
    message : string;
    statusCode : string;
    firstName : string;
    middleName : string;
    lastName : string;
    account : AccountModel;
    branch : Branch;
    transactions : Transaction[];

    constructor(status :string,
                message :string, 
                statusCode :string,
                firstName :string,
                middleName : string,
                lastName :string,
                account : AccountModel,
                branch : Branch,
                transactions : Transaction[]) {

        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.account = account;
        this.branch = branch;
        this.transactions = transactions;

    }

}