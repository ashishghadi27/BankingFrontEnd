import { Beneficiary } from './beneficiary-model';

export class RestSingleBeneficiary{

    status:string;
    message:string;
    statusCode:string;
    beneficiary:Beneficiary;

    constructor(status:string,message:string,statucode:string,beneficiary:Beneficiary){
        this.status=status;
        this.message=message;
        this.statusCode=this.statusCode;
        this.beneficiary=beneficiary;
    }
}