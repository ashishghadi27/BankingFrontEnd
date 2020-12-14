import { RequestStatus } from "./RestSimpleTemplate";

export class RestUserIdAndOtpTemplate{
    requestStatus:RequestStatus;
    userId:number;
    otp:number;

    constructor(requestStatus:RequestStatus,userId:number,otp:number) {
        this.requestStatus = requestStatus;
        this.userId = userId;
        this.otp = otp;
    }

}
