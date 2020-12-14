export class Occupation {
    occupationId : number;
    userId : number;
    occupationType : string;
    sourceOfIncome : string;
    grossAnnual : number;

    constructor(occupationId : number,
                userId : number, 
                occupationType : string, 
                sourceOfIncome : string, 
                grossAnnual : number) {

        this.occupationId = occupationId;
        this.userId = userId;
        this.occupationType = occupationType;
        this.sourceOfIncome = sourceOfIncome;
        this.grossAnnual = grossAnnual;

    }

}