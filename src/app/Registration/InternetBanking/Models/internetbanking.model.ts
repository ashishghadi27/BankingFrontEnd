export class InternetBanking{
    id:number;
    accountNo:number;
    username:string;
    password:string;
    transPass:string;
    impsUpperLimit:number;
    neftUpperLimit:number;
    rtgsUpperLimit:number;
    isBlocked:number;

    constructor(id:number, accountNo:number, username:string, password:string, transPass:string, 
                impsUpperLimit:number, neftUpperLimit:number, rtgsUpperLimit:number, 
                isBlocked:number){
        this.id = id;
        this.accountNo = accountNo;
        this.username = username;
        this.password = password;
        this.transPass = transPass;
        this.impsUpperLimit = impsUpperLimit;
        this.neftUpperLimit = neftUpperLimit;
        this.rtgsUpperLimit = rtgsUpperLimit;
        this.isBlocked = isBlocked;
    }

}