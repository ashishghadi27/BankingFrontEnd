export class User{
    title:string;
    firstName:string;
    middleName:string;
    lastname:string;
    fathername:string;
    mobileno:string;
    email:string;
    aadharno:string;
    dob:Date;
    netBankingEnabled:number;
    debitEnabled:number;

    constructor(title:string,
        firstName:string,
        middleName:string,
        lastname:string,
        fathername:string,
        mobileno:string,
        email:string,
        aadharno:string,
        dob:Date,
        netBankingEnabled:number,
        debitEnabled:number,){
            this.title = title;
            this.firstName = firstName;
            this.middleName = middleName;
            this.lastname = lastname;
            this.fathername = fathername;
            this.mobileno = mobileno;
            this.email = email;
            this.aadharno = aadharno;
            this.dob = dob;
            this.netBankingEnabled = netBankingEnabled;
            this.debitEnabled = debitEnabled;
        }
}