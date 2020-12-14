export class RestSimpleTemplate{
    status: string;
    message: string;
    statusCode: number;

    constructor(status: string, message: string, statusCode: number){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
    }
}