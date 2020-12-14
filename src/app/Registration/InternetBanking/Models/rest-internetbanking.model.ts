import { InternetBanking } from './internetbanking.model';


export class RestInternetBanking{

    status:string;
    message:string;
    statusCode:string;
    internetBanking:InternetBanking;

    constructor(status:string, message:string, statusCode:string, internetBanking:InternetBanking){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.internetBanking = internetBanking;
    }

}