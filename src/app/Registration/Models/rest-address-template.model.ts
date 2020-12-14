import { Address } from './address.model';
import { RestSimpleTemplate } from './rest-simple.template.model';

export class RestAddressTemplate{
    requestStatus:RestSimpleTemplate;
    address:Address;

    constructor(requestStatus:RestSimpleTemplate,address:Address){
        this.requestStatus = requestStatus;
        this.address = address;
    }
}