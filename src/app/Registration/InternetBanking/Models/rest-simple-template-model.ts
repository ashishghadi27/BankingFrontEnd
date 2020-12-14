export class RestSimpleTemplate{

    status:string;
    message:string;
    statusCode:string;

    constructor(status:string, message:string, statusCode:string){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}