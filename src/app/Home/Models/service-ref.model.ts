export class ServiceReference {
    serviceId : number;
    userId : number;
    adminId : number;
    cId : number;
    status : string;
    remark : string;

    constructor(serviceId : number,
                userId : number,
                adminId :number,
                cId : number,
                status : string,
                remark : string) { 

        this.serviceId = serviceId;
        this.userId = userId;
        this.adminId = adminId;
        this.cId = cId;
        this.status = status;
        this.remark = remark;
        
    }
}