export class Occupation{
    occupationId: number;
    userId: number;
    occupationType: string;
    sourceOfIncome: string;
    grossAnnual:string;

    constructor(occupationId: number, userId: number,occupationType:string,sourceOfIncome:string,grossAnnual:string){
        this.occupationId = occupationId;
        this.userId = userId;
        this.occupationType = occupationType;
        this.sourceOfIncome = sourceOfIncome;
        this.grossAnnual = grossAnnual;
    }
}