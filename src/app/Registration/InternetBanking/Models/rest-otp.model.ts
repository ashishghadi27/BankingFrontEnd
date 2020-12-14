import { RestSimpleTemplate } from './rest-simple-template-model';

export class RestOTPTemplate{

    requestStatus:RestSimpleTemplate;
    userId:number;
    otp:number;

    constructor(requestStatus:RestSimpleTemplate, userId:number, otp:number){
        this.requestStatus = requestStatus;
        this.userId = userId;
        this.otp = otp;
    }

}