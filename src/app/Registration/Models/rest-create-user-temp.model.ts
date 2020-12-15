import { User } from "src/app/UserDashboard/DashboardModels/user.model";

export class RestCreateUsertemplate {
    status : string;
    message : string;
    statusCode : string;
    user : User;
    
    constructor(status : string, message:string, statusCode:string, user:User) {
        this.status = status; 
        this.message = message;
        this.statusCode = statusCode;
        this.user = user;
    }
}