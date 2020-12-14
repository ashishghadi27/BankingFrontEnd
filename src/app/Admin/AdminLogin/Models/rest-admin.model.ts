import { Admin } from './admin-login.model';

export class RestAdmin{

    status:string;
    message:string;
    statusCode:string;
    admin:Admin;

    constructor(status:string, message:string, statusCode:string, admin:Admin){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.admin = admin;
    }

}