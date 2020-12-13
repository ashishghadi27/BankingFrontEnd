
import { AddressModel } from './address.model';
import { Occupation } from './occupation.model';
import { User } from './user.model';

export class DetailsModel {
    status : string;
    message : string;
    statusCode : string;
    user : User;
    residentialAddress : AddressModel;
    permanentAddress : AddressModel;
    occupation : Occupation;

    constructor(status : string,
                message : string,
                statusCode : string,
                user : User,
                residentialAddress : AddressModel,
                permanentAddress : AddressModel,
                occupation : Occupation) {

        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.user = new User(   user.userId,
                                user.title,
                                user.firstName, 
                                user.middleName, 
                                user.lastName, 
                                user.fatherName, 
                                user.mobileNo, 
                                user.email, 
                                user.aadhar, 
                                user.dob, 
                                user.netBankingEnabled, 
                                user.debitEnabled);
        this.residentialAddress = residentialAddress;
        this.permanentAddress = permanentAddress;
        this.occupation = occupation;
        
    }

}