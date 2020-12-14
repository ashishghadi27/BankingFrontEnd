export class City {
    cityId : number;
    stateId : number;
    cityName : string;

    constructor(cityId : number, stateId : number, cityName : string) {
        this.cityId = cityId;
        this.stateId = stateId;
        this.cityName = cityName;
    }
}