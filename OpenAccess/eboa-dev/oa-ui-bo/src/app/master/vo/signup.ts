import { TradeRelationship } from './../vo/trade-relationship';
import { Generator } from './../vo/powerplant' ;

export class Signup {

        id?:string;                                                  
        companyName?:string;                            /*Company Name */
        companyCode?:string;  // autogenerated          /*Company Code (auto-generated)*/
        companyAddress?:string;                         /*Company Address*/
        applicationDate?:string; 
        dateOfApproval?:string; 
        classType?:string; 
        buyerTypes?:string; 
        generationCapacity?:string; 
        purposeCode?:string;    
        purposeName?:string;    //buyer,seller,trader       /*Purpose - (Buyer / Seller / Trader)*/
        registrationNumber?:string;                     /*Registration Number*/                
        registrationDate?:string;                       /*Registration Date*/
        dateOfCommission?:string;                       /*Date of Commission*/
        orgName?:string;                                /*EDC Name */
        orgId?:string;  
        substationName?:string;                         /*Substation Name*/
      //  substationCode?:string;
        substationId?:string;
        feederName?:string;                             /*Feeder Name*/
       // feederCode?:string;    
        feederId?:string;
        plantClassTypeCode?:string;
        plantClassTypeName?:string;
        buyerTypeCode?:string;
        buyerTypeName?:string;
        voltageCode?:string;                                /*Voltage*/
        voltageName?:string;  
        htscNumber?:string;                       
        htscNumberOld?:string;                             /*HTSC Number*/
        tariff?:string;                                 /*Tariff*/
        totalCapacity?:string;                          /*Total Capacity*/
        isCaptive?:string;  // y or n                   /*Is Captive (Y/N)*/
        userName?:string;                               /*User Name*/
        userId?:string;  // for logging                 /*User id (for logging)*/
        password?:string;  // for logging               /*Password (for logging)*/
        powerPlantTypeCode?:string; 
        powerPlantTypeDesc?:string;                      /*PowerPlant Type*/
        powerPlantName?:string;  //auto-generated  substation name+org name  /*PowerPlant Name*/
        fuelCode?:string;  
        fuelName?:string;                             /*Fuel Used */
        noOfGenerators?:string;                           /*No. Of Generators*/
        //generatorMakeCode?:string;                        
        //generatorMakeDesc?:string;                        /*Generator-Type*/
        generatorModelCode?:string;                       
        generatorModelName?:string;
        isComplete?:string                                /*Signup Completed (Y/N) */
        isREC?:string; //y or n                           /*REC/Non-REC (if Fuel=Wind) */
        windPassCode?:string;                             /*Wind Pass Name ( if Fuel = Wind) */
        windPassName?:string;
        meterNumber?:string;                                  /*Meter Number*/
        meterMakeCode?:string;                                /*Meter Make*/
        meterMakeName?:string;                                /*Meter Make*/
        modemNumber?:string;                                     /*Modem Number*/
        meterCt1?:string;                                     /*Meter ct 1*/
        meterCt2?:string;                                     /*Meter ct 2*/
        meterCt3?:string;                                     /*Meter ct 3*/
        meterBt1:string;                                      /*Meter Bt 1 */
        meterBt2:string;                                      /*Meter Bt 2 */
        meterBt3:string;                                      /*Meter Bt 3 */
        accuracyClassCode?:string;                            /*Accuracy Class*/
        accuracyClassName?:string;                            /*Accuracy Class*/
        isABTMeter?:string;                                   /* isABTMeter*/
        multiplicationFactor?:string;                         /*Multiplication factor*/
        guModel1?:string;                                     /*GenUnit Model 1*/
        guCapacity1?:string;                                  /*GenUnit Capacity 1*/
        noOfGu1?:string;                                      /*GenUnit GenerationUnit 1*/
        guModel2?:string;                                     /*GenUnit Model 2*/
        guCapacity2?:string;                                  /*GenUnit Capacity 2*/
        noOfGu2?:string;                                      /*GenUnit GenerationUnit 2*/
        guModel3?:string;                                     /*GenUnit Model 3*/
        guCapacity3?:string;                                  /*GenUnit Capacity 3*/
        noOfGu3?:string;                                      /*GenUnit GenerationUnit 3*/
        guModel4?:string;                                     /*GenUnit Model 4*/
        guCapacity4?:string;                                  /*GenUnit Capacity 4*/
        noOfGu4?:string;                                      /*GenUnit GenerationUnit 4*/
        guModel5?:string;                                     /*GenUnit Model 5*/
        guCapacity5?:string;                                  /*GenUnit Capacity 5*/
        noOfGu5?:string;                                      /*GenUnit GenerationUnit 5*/
        guModel6?:string;                                     /*GenUnit Model 6*/
        guCapacity6?:string;                                  /*GenUnit Capacity 6*/
        noOfGu6?:string;                                      /*GenUnit GenerationUnit 6*/
        surplusEnergy?:string ;
        surplusEnergyCode?: string;                               /*SurPlus Energy */
        addressLine?:string;                                  /*Address Line*/
        village?:string;                                      /*Village*/
        town?:string;                                         /*Town*/
        talukCode?:string;
        talukName?:string;                                    /*Taluk*/
        city?:string;                                         /*City*/
        districtCode?:string;
        districtName?:string;                                 /*District*/
        stateCode?:string;
        stateName?:string;   
        turbineSlNo?:string; 
        turbineRotorDia?:string; 
        turbineHubHeight?:string; 
        isDlmsMeter?:string; 
        meterCtRatio?:string; 
        meterPtRatio?:string ;  
        totalGeneratorUnit?:string ;                              
        signupTradeRelationships: Array<TradeRelationship>; 
        genUnits: Array<Generator>;
        createdBy?:string;
        createdDate?:string;
        modifiedBy?:string;
        modifiedDate?:string;
        acceleratedDepreciation?:string;
    }
