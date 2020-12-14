export class RequestStatus{
    status:string;
    message:string;
    statusCode:String;

    constructor(status: string, message: string, statusCode: string) {
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }

}