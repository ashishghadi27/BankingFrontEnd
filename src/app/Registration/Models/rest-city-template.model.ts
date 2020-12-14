import { City } from './city.model';
import { RestSimpleTemplate } from './rest-simple.template.model';

export class RestCityTemplate{
    requestStatus:RestSimpleTemplate;
    cityList:City[];

    constructor(requestStatus:RestSimpleTemplate,cityList:City[]){
        this.requestStatus = requestStatus;
        this.cityList = cityList;
    }
}