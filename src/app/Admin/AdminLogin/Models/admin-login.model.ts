export class Admin{
    adminId:number;
    name:string;
    username:string;
    password:string;
    role: string;

    constructor(adminId:number, name: string, username: string, password: string, role: string){
        this.adminId = adminId;
        this.name = name;
        this.password = password;
        this.username = username;
        this.role = role;
    }

}