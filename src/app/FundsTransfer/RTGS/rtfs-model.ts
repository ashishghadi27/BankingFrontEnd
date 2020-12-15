class RtgsTransaction{
    fromAccount:number;
    toAccount:number;
    amount:number;
    reason:string;
    type :string="RTGS";
    endDate : Date = new Date();
    startDate:Date = new Date();
    
   constructor(accountNo:number, reason:string, type:string, startDate:Date, endDate:Date, amount:number ){
       this.toAccount= accountNo;
       this.reason=reason;
       this.type=type;
       this.startDate=startDate;
       this.endDate=endDate;
       this.amount=amount;

   }
}