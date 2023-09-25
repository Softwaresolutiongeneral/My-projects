export class NameChangeApplmodel{
   
        id: number;
        buyerDetailsList ?: Array<BuyersList>;
        documentList ?: Array<DocumentList>;
        billPayment ?: Array<billPayment>;
        applStatusList ?: Array<NametransferStatuslog>;
        newgendetail ?: NewGenDeatils;
        fuelTypeCode: string
        serviceId:string
        createdDate: string
        createdBy:string
        serviceNo: string
        serviceExsitingName: string
        serviceNewName: string
        flowtype: string
        applStatus: string
        applFlowType: string
        typeOfSs: string
        applScheme:string;
        dateOfCommission:string;
        isRec:string;
        substationName:string;
        injectionVoltage:string;
        capacity:string;
        aggrementValidityDate:string;
        typeofappl:string;
        totalCharges:string;
        cusAddrs:string;
        ispaid:string;
        applRemarks:string;
    }


export class BuyersList{
    id:String
    applicationId: string;
    enabled: string;
    buyerCompanyName: string;
    drawalVoltageCode: string;
    remarks: string;
    quantum: string;
    createdDate: string;
    buyerOrgId: string;
    createdBy: string;
    buyerOrgCode: string;
    drawalVoltageName:string;
    buyerServiceId: string;
    buyerServiceNo:string;
    buyerInjectionVoltage: string;
    buyerInjectionVoltageName: string;
    sellerServiceNo: string;
    sellerId: string;
    sharePercentage : string;
}
export class DocumentList{
    id:string;
    applicationId:string;
    createdBy:string;
    createdDate:string;
    docCode:string;
    docDesc:string;
    docName:string;
    isUploaded:string;
}

export class billPayment {

    acHeadCharge:string; 
    applid:string;
    chargeDesc:string;
    chargeTotalAmount:string;
    chargecode:string;
    createdDate:string;
    id:string;

}
export class NewGenDeatils {
applId: string;
bankAccountNO: string;
bankIfscCode: string;
bankName: string;
cin: string;
companyTypeCode:string; 
contactDesignation: string;
contactFullName: string;
contactPhoneNo: string;
contactEmail: string;
gst: string;
id: string;
pan: string;
plantAddr: string;
regOfficeAddr: string;
tan:string;
}
export class NametransferStatuslog{
    
    applRemarks:string;
    applStatus:string;
    applid:string;
    createdDate : Date;
    id:string;

    
}