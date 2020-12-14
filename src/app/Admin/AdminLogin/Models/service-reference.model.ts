export class ServiceReferenceModel{

    public serviceId?:number;
    public userId?:number;
    public adminId?:number;
    public cId?:number;
    public status?:string;
    public remark?:string;

    constructor(
        serviceId:number,
        userId:number,
        adminId:number,
        cId:number,
        status:string,
        remark:string
    ){
        this.serviceId = serviceId;
        this.userId = userId;
        this.adminId = adminId;
        this.cId = cId;
        this.status = status;
        this.remark = remark; 
    }

}