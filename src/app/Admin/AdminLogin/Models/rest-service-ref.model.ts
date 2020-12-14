import { ServiceReferenceModel } from './service-reference.model';

export class RestServiceReference{

    status:string;
    message:string;
    statusCode:string;
    serviceReferences:ServiceReferenceModel[];

    constructor(status:string, message:string, statusCode:string, serviceReferences:ServiceReferenceModel[]){
        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.serviceReferences = serviceReferences;
    }

}