import { Occupation } from './occupation.model';
import { RestSimpleTemplate } from './rest-simple.template.model';

export class RestOccupationTemplate{
    requestStatus:RestSimpleTemplate;
    occupation:Occupation;

    constructor(requestStatus:RestSimpleTemplate,occupation:Occupation){
        this.requestStatus = requestStatus;
        this.occupation = occupation;
    }
}