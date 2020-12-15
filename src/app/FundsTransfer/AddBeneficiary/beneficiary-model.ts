export class Beneficiary{
    bAccNo:number;
    bName:string;
    bankName:string;
    ifsc:string;
    nickName:string;
    accountNo:number = 234235233;

    constructor(bAccNo: number, bName : string,accountNO:number, bankName : string, ifsc:string, nickName  : string){
        this.bAccNo=bAccNo;
        this.bName=bName;
        this.bankName=bankName;
        this.ifsc=ifsc;
        this.nickName=nickName;
    }
}