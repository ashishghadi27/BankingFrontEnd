import { Beneficiary } from './beneficiary-model';

export class RestBeneficiary{

    status:string;
    message:string;
    statusCode:string;
    beneficiaries:Beneficiary[];

    constructor(status:string,message:string,statucode:string,beneficiary:Beneficiary[]){
        this.status=status;
        this.message=message;
        this.statusCode=this.statusCode;
        this.beneficiaries=beneficiary;
    }
}