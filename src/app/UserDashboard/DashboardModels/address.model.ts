import { City } from './city.model';
import { State } from './state.model';

export class AddressModel {
    addressId : number;
    userId : number;
    state : State;
    city : City;
    line1 : string;
    line2 : string;
    landmark : string;
    pincode : number;
    isPermanent : number;

    constructor(addressId: number,
                userId: number,
                state : State,
                city: City,
                line1: string,
                line2 : string,
                landmark: string,
                pincode : number,
                isPermanent: number) {

        this.addressId = addressId;
        this.userId = userId;
        this.state = state;
        this.city = city;
        this.line1 = line1;
        this.line2 = line2;
        this.landmark = landmark;
        this.pincode = pincode;
        this.isPermanent = isPermanent;
        
    }

}