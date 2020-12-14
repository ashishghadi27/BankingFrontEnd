import { AddressModel } from "./address.model";
import { UserModel } from "./user.model";

export class RestUser{
    status:string;
    message:string;
    statusCode:string;
    user:UserModel;
    addresses:AddressModel[];
}