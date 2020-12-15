import { AccountModel } from './account.model';


export class SummaryModel {
    status : string;
    message : string;
    statusCode : string;
    account : AccountModel;
   

    constructor(status : string,
        message : string,
        statusCode : string,
        account : AccountModel){
        
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.account = account;
      
    }

}