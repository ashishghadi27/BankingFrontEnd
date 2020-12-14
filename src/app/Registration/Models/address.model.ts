export class Address{
    addressId:number;
    userId:number;
    stateId:number;
    cityId:number;
    line1: string;
    line2: string;
    landmark:string;
    pincode:number;
    isPermanent:number;

    constructor(addressId:number,
        userId:number,
        stateId:number,
        cityId:number,
        line1: string,
        line2: string,
        landmark:string,
        pincode:number,
        isPermanent:number){
            this.addressId = addressId;
            this.userId = userId;
            this.stateId = stateId;
            this.cityId = cityId;
            this.line1 = line1;
            this.line2 = line2;
            this.landmark = landmark;
            this.pincode = pincode;
            this.isPermanent = isPermanent;
        }
}