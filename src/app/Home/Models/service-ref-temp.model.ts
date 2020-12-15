import { ServiceReference } from "./service-ref.model";

export class RestServiceReferenceModel {
    status : string;
    message : string;
    statusCode : string;
    serviceReference : ServiceReference;

    constructor(status: string, 
                message:string,
                statusCode:string,
                serviceReference : ServiceReference) { 

        this.status = status;
        this.message = message;
        this.statusCode = statusCode;
        this.serviceReference = serviceReference;
    
    }

}