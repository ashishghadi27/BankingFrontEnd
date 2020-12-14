import { RestSimpleTemplate } from './rest-simple.template.model';
import { State } from './state.model';

export class RestStateTemplate{
    requestStatus:RestSimpleTemplate;
    stateList:State[];

    constructor(requestStatus:RestSimpleTemplate,stateList:State[]){
        this.requestStatus = requestStatus;
        this.stateList = stateList;
    }
}