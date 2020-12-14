import { RestSimpleTemplate } from './rest-simple.template.model';
import { User } from './user.model';

export class RestUserTemplate{
    requestStatus:RestSimpleTemplate;
    user:User;

    constructor(requestStatus:RestSimpleTemplate,user:User){
        this.requestStatus = requestStatus;
        this.user = user;
    }
}