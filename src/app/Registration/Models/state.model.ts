import { Country } from './country-model';

export class State{
    stateId:number;
    country:Country;
    stateName:string;

    constructor(stateId:number, country:Country,stateName:string) {
        this.stateId = stateId;
        this.country = country;
        this.stateName = stateName;
    }
}