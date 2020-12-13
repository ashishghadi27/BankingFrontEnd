export class Branch {
    branchId : number;
    branchName : string;
    ifsc : string;

    constructor(branchId : number,
                branchName : string,
                ifsc : string) { 

        this.branchId = branchId;
        this.branchName = branchName;
        this.ifsc = ifsc;

    }

}