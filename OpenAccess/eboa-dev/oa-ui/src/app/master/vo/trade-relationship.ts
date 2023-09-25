
export class TradeRelationship{
     id?:string;
     quantum?:string;
     sanctionedCapacity?:string;
     sellerSanctionedCapacity?:string;
     fromDate?:string;
     toDate?:string;
	 statusCode?:string;
     sellerCompanyId?:string;
     sellerCompanyName?:string;
     sellerCompanyCode?:string;
     sellerOrgId?:string;
     sellerOrgName?:string;
     sellerCompServiceId?:string;
     sellerCompServiceNumber?:string;
     buyerCompanyId?:string;
     buyerCompanyName?:string;
     buyerCompanyCode?:string;
     buyerCompServiceId?:string;
     buyerCompServiceNumber?:string;
     buyerOrgId?:string;
     buyerOrgName?:string;
     buyerOrgCode?:string;
     referenceNumber?:string;
     remarks?:string;
     signupId?:string;
     createdBy?:string;
     createdDate?:string;
     modifiedBy?:string;
     modifiedDate?:string;
     isCaptive?:string;
     sharePercent?:string;
     c1?:string;
     c2?:string;
     c3?:string;
     c4?:string;
     c5?:string;
     peakUnits?:string
     offPeakUnits?:string;
     intervalTypeCode?:string;
     traderelationshipSourceCode?:string;
     agreementType?:string;
     constructor(){
         this.c1="0";
         this.c2="0";
         this.c3="0";
         this.c4="0";
         this.c5="0";
         this.peakUnits="0";
         this.offPeakUnits="0";
     }
}