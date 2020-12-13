export class User {
    userId : number;
    title : string;
    firstName : string;
    middleName : string;
    lastName : string;
    fatherName : string;
    mobileNo : string;
    email : string;
    aadhar : string;
    dob : Date;
    netBankingEnabled : number;
    debitEnabled : number;

    constructor(userId : number,
                title : string,
                firstName : string,
                middleName : string,
                lastName : string,
                fatherName : string,
                mobileNo : string,
                email : string,
                aadhar : string,
                dob : Date,
                netBankingEnabled : number,
                debitEnabled : number) {

        this.userId = userId;
        this.title = title;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.fatherName = fatherName;
        this.mobileNo = mobileNo;
        this.email = email;
        this.aadhar = aadhar;
        this.dob = dob;
        this.netBankingEnabled = netBankingEnabled;
        this.debitEnabled = debitEnabled;
        
    }

}