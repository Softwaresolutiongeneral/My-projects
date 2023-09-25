import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,Input, ViewChild, ViewEncapsulation, ChangeDetectorRef  } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Gc,QuantumAllocation } from '../../grid-connectivity/services/gc';
import { HttpHeaders } from '@angular/common/http';
import { NameChangeApplService } from './services/name-change-appl.service';
import { CommonService } from '../../shared/common/common.service';
import { CommonUtils } from '../../shared/common/common-utils';
import { BuyersList, DocumentList, NameChangeApplmodel, NewGenDeatils } from '../vo/nametransfer';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { saveAs } from 'file-saver';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HostListener, ElementRef } from '@angular/core';
import { MatStepper } from '@angular/material';
import { MatTabGroup } from '@angular/material/tabs';
import { NameTransferPayment, credit, net } from '../vo/nametransferpayment';
import { v4 as uuidv4 } from 'uuid';
import { NgForm } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdminLayoutComponent } from '../../layouts/admin/admin-layout.component';
import { Console } from 'console';

@Component({
  selector: 'name-change-appl',
  templateUrl: './name-change-appl.component.html',
  styleUrls:['./name-change-app.component.css'],
  providers: [NameChangeApplService],
  
 
})
export class NameChangeApplComponent implements OnInit{ 
   
    @ViewChild('scrollTarget') scrollTarget: ElementRef | undefined;
    myControl = new FormControl('');
    
    paymentForm: FormGroup;
    
    filteredOptions: Observable<string[]>;
    rows:any;
    mCompServNumber: string="";
    buyerCompanyServices: any; 
    statementMonth: string = "";
    statementYear: string = "";
    rowss:any=[];
    
    captive:string="";
    capacityInKV:string="";
    dispCompanyServiceNumber:any;
    disableCompanyName: boolean = false;
    FlowtypeList = [{"name" :'Captive',"code":'IS-CAPTIVE'},
                    {"name":'SaleToBoard',"code":'STB'},
                    {"name": 'ThirdParty',"code": 'THIRD-PARTY'} ];
    SchemeType = [{"name":'NON-REC',"code":'N'}];

    TypeOfApplication = [{"name" :'Name Change',"code":'Name Change'},
                    {"name":'Name Transfer',"code":'Name Transfer'},
                    {"name": 'Name Change And Utility Change',"code": 'Name Change And Utility Change'} ];

 FLOWTYPE:string="";
 Scheme:string="";
 selectedFiles: File; 
 progress = 0;
 Isfile : boolean = false;
 fileName: string ;
 //ApplicationDetails : [NameTransferAppl];
//  --------------------------------------
gc: Gc;
callFlag: boolean = false;
quantumAllocation: QuantumAllocation;
quantumAllocationRowIndex: number;

@Input() voltages = [];
 orgList = [];

compCtrl: FormControl;
buyerCompanyCode: String;
buyerCompanyName: String;
reactiveComp: any;
disableControls: boolean = true;    

filteredServices = [];

folders:DocumentList[]=[];
Uplodedfolders:DocumentList[]=[];
buyerData:BuyersList[]=[];
buyerDataforsave:BuyersList[]=[];
quantumallocationlist : QuantumAllocation[]=[]
buyerdetialsforvol: object;
IsSavedOnce:boolean=false;
    cloneOrders: any[]=[];
    nonuploadedfolders:DocumentList[]=[];
    isfileSelected: boolean=true;
    Submit: boolean=true;
   // buyerrone: BuyersList;
   enableupload:boolean=true;
   dissableflowtypchange:boolean=false;
    disablebuyer: boolean;
    UserName: any;
    disablesave:boolean=false;
    enablepayment: boolean=false;
    disablesaveedonce: boolean=false;
    remarksavailable: boolean;
    isShippingCompleted = true;
  isBillingCompleted = true;
  isPlaceOrderCompleted = false;
  activeStep: number = 3; // Change this value to set the active step
  downloadProgress: number = 50;
  steps: { title: string, number: number,active:boolean,StatusDate:Date,Remarks:string }[] = [
    { title: 'DRAFT', number: 1, active :false,StatusDate:null,Remarks:null },
    { title: 'SUBMITTED', number: 2, active :false,StatusDate:null,Remarks:null  },
    { title: 'UNDER NCES PROCESS', number: 3, active :false,StatusDate:null,Remarks:null  },
    { title: 'PAYMENT RAISED', number: 4, active :false,StatusDate:null,Remarks:null  },
    { title: 'PAYMENT RECEIVED', number: 5, active :false,StatusDate:null,Remarks:null  },
    { title: 'UNDER NCES APPROVAL', number: 6, active :false,StatusDate:null,Remarks:null  },
    { title: 'APPROVAL ISSUED', number: 7, active :false,StatusDate:null,Remarks:null  },
];
    newgendetailsaved: NewGenDeatils;
     activenumber:number =1;
  flowtypeshow: boolean=false;
//-------------------------------------------------------
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NameChangeApplService,private commonService:CommonService,
    private commonUtils: CommonUtils,private ApplicationDetails:NameChangeApplmodel,
    private Banklist:NameTransferPayment,private PayBank:NameTransferPayment,
    private Processpayment:NameTransferPayment,private fb: FormBuilder,
    private buyerrone: BuyersList,private elementRef: ElementRef,
    private adminpage : AdminLayoutComponent,private _formBuilder: FormBuilder
   
  ) { this.compCtrl = new FormControl({
    companyCode: this.buyerCompanyCode,
    companyName: this.buyerCompanyName
});

this.paymentForm = this.fb.group({
    param1: [''],
    param2: [''],
    
});

this.UserName = CommonUtils.getLoginUserDetails();
}

  ngOnInit() {
    
    this.gc = new Gc();
    this.mCompServNumber= this.UserName;
        this.quantumAllocation = new QuantumAllocation();
       
       this.initCaptiveQuantumAllocation();
        this.fetchOrgList();


        if (this.mCompServNumber != null && this.mCompServNumber != undefined){
            
                this.getGenDetailsApplied();

        }
        
        //this.folders=this.commonUtils.getdocumentlist();
      
        //this.ApplicationDetails = new Array<NameTransferAppl>();
       // this.getGenDetails();
        // this.service.gcEvent.subscribe(_gc => {
        //     this.gc = _gc;
        //     console.log(this.gc);
        //   })
  
}

  debug() {
    console.log('isBillingCompleted:', this.isBillingCompleted);
    // Add more debug statements as needed
  }
  
getGenDetailsApplied(){
    
    this.service.getGenDetailsByServiceNoApplied(this.mCompServNumber).subscribe(x=>{
      
      if(x === 'success'){
         
            this.getGenDetails();
        }
    else{
          alert("Please click the Apply Button to proceed !!");
       }
    
    
    })


}

  getGenDetails(){
    this.activenumber=1;
    this.service.getGenDetailsByServiceNo(this.mCompServNumber).subscribe(x=>{
    this.ApplicationDetails=x;
    console.log(this.ApplicationDetails.applStatusList);
   this.newgendetailsaved = x.newGenDetails;
   
    if(this.newgendetailsaved !== null &&
        this.newgendetailsaved !== undefined){
          
            this.IsSavedOnce=true;
        }

        this.steps.forEach(element => {

          this.ApplicationDetails.applStatusList.forEach(x=>{
                if (element.title==x.applStatus){
                  element.StatusDate=x.createdDate;
                  element.Remarks=x.applRemarks;
                }
          })
          if(this.ApplicationDetails.applStatus==='UNDER APPROVAL BY NCES-AEE' || this.ApplicationDetails.applStatus === 'UNDER APPROVAL BY NCES-EE' || this.ApplicationDetails.applStatus === 'UNDER APPROVAL BY NCES-SE' || this.ApplicationDetails.applStatus === 'UNDER APPROVAL BY NCES-CE' || this.ApplicationDetails.applStatus === 'UNDER EE APPROVE FOR ORDER ISSUE' && element.number === 6){
            element.active = true;
          }
          if(this.ApplicationDetails.applStatus==='NOC-ISSUED-BY-EDC' || this.ApplicationDetails.applStatus === 'UNDER PROCESS BY NCES-AEE' || this.ApplicationDetails.applStatus === 'UNDER PROCESS BY NCES-EE' && element.number === 3){
            element.active = true;
          }
          if (element.title == this.ApplicationDetails.applStatus){

            element.active=true;
            
          }
        //   else{
        //     element.active=false;
        // }
       
        });
      
  this.cleardocvar(); 
  this.setdocvar();
  this.cleardoclist();
   this.setdoclist();
   this.clearbuyerlist();
  this.getBuyerDetail();
//   this.Dissabesetter();
  this.enablesubmit();
  this.disbleallbuttons();

      
    })
}
disbleallbuttons(){
    if (this.ApplicationDetails.applStatus=='DRAFT' || this.ApplicationDetails.applStatus =='RE-SUBMITTED'){
    this.disableControls=false;
    if(this.ApplicationDetails.applStatus=='RE-SUBMITTED'){
    this.remarksavailable = true;
    }
    }
    else{
        this.disableControls=true;
        this.remarksavailable = false;
    }
    if(this.ApplicationDetails.applStatus=='PAYMENT RAISED' ){
        this.enablepayment = true;
    }
}
enablesubmit(){
    let j = 0;
    for (let i=0; i<this.Uplodedfolders.length; i++){
    if (this.Uplodedfolders[i].docCode =='DOCOA08' || 
        this.Uplodedfolders[i].docCode =='DOCOA09' ||
        this.Uplodedfolders[i].docCode =='DOCOA1'){

            j=j+1;
    }
    if (j==1 || j==0 || j==2){
        this.Submit=true;
    }
    if (j==3){
        this.Submit=false;
    }
}

}

Dissabesetter(){
this.nonuploadedfolders.forEach(x => {
    x.isUploaded="true";    
});

}
clearbuyerlist(){
    let buyerlength =this.gc.captiveQuantumAllocation.length;
                //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
                
                   for (let l=0; l<=buyerlength;l++)
                   {
                       console.log("comes in---"+l);
                   this.gc.captiveQuantumAllocation.pop();
                   }
}
cleardoclist(){
    console.log("called clear");

    let length1 = this.Uplodedfolders.length;
    for(let d=0; d<=length1;d++){
    this.Uplodedfolders.pop();
     }
    let length2 = this.nonuploadedfolders.length;
    for (let y = 0 ; y<=length2; y++){
    this.nonuploadedfolders.pop();
    }
}
cleardocvar(){

   let lengthfolders = this.folders.length;
    for (let l=0; l<=lengthfolders;l++)
    {
    this.folders.pop();
    }
}

setdocvar(){
this.folders=this.ApplicationDetails.documentList;

this.dissableflowtypchange=false;
this.folders.forEach(x =>{
    if(x.isUploaded == "true"){
        this.dissableflowtypchange=true;
    }

});
}

setdoclist(){
   
   
   
    console.log("called setter");
    this.folders.forEach(item=>{
        if (item.isUploaded=='true'){
           this.Uplodedfolders.push(item);
    }
    })
     
     this.folders.forEach(item =>{
      
         this.nonuploadedfolders.push(item);
          
   
   }); 
   console.log(this.Uplodedfolders);
console.log(this.nonuploadedfolders);
}

downloadOrderCopy(doccode:string){

    
  // this.service.downloadedoc(downloadefile).subscribe(xs=>{
  //   this.openDownload(xs);
  // });
  this.service.downloadOrderCopy(this.ApplicationDetails.id.toString(),doccode).subscribe(res => {
      const fileURL = URL.createObjectURL(res);
      window.open(fileURL, '_blank');
    });

}
  getBuyerDetail(){
  //console.log(this.ApplicationDetails);
 
    // for (let l=0; l<=this.ApplicationDetails.documentList.length-1;l++){
    //     let tempClass = new DocumentList();
    //     tempClass = this.ApplicationDetails.documentList[l];
    //     this.folders.push(tempClass);
    // }
  

  

   this.buyerData=this.ApplicationDetails.buyerDetailsList;
   
   console.log(this.buyerData.length);

    // for (let j=0 ;j<=this.gc.captiveQuantumAllocation.length;j++){
    //   this.deleteCaptiveQuantumAllocation(j);
    // }

    console.log(this.gc.captiveQuantumAllocation);
  
    for (let i=0;i<this.buyerData.length;i++){
   
  
    
    this.quantumAllocation.buyerCompServiceId=this.buyerData[i].buyerServiceId;
   this.quantumAllocation.buyerCompServiceNumber=this.buyerData[i].buyerServiceNo;
   
   this.quantumAllocation.buyerCompServiceName=this.buyerData[i].buyerCompanyName;
   this.quantumAllocation.buyerOrgId=this.buyerData[i].buyerOrgId;
   this.quantumAllocation.buyerOrgCode=this.buyerData[i].buyerOrgCode;
   this.quantumAllocation.buyerOrgName=this.buyerData[i].buyerOrgCode;
   this.quantumAllocation.captiveCompanyName=this.buyerData[i].buyerCompanyName;
   this.quantumAllocation.quantum=this.buyerData[i].quantum;
   this.quantumAllocation.drawalVoltageCode=this.buyerData[i].drawalVoltageCode;
   this.quantumAllocation.drawalVoltageName=this.buyerData[i].drawalVoltageName;
   this.quantumAllocation.remarks=this.buyerData[i].remarks;
   this.quantumAllocation.sharePercentage=this.buyerData[i].sharePercentage;
   this.quantumAllocation.createdBy='user';
   var currentDate = new Date();
   this.quantumAllocation.createdDate=currentDate.toLocaleString();
   this.quantumAllocation.modifiedBy='user';
   this.quantumAllocation.modifiedDate=currentDate.toLocaleString();
   this.quantumAllocation.Enabled='';

   
   
   this.addCaptiveQuantumAllocation();
 //this.cleardoclist();
   
  
   
}


  }


  numberFormat(event){
    this.commonService.numberOnly(event);
  }
  fetchOrgList() {
    this.commonService.fetchEDCs().subscribe(
        result => {
            this.orgList = result;
        },
        error => {
            console.error('Error loading states!');
            console.error(error);
        }
    );
    
}




  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
}
filterBuyerCompanyServices(val: string) {
    return val ? this.buyerCompanyServices.filter((s) => s.companyName.match(new RegExp(val, 'gi'))) : this.buyerCompanyServices;


}

fetchBuyerCompanyServices(orgId: string) {
    this.commonService.getBuyerCompanyServicesByOrgId(orgId).subscribe(
        result => {
            this.buyerCompanyServices = result;
            console.log("fetchBuyerCompanyServices")

            console.log(result)
        //     this.compCtrl = new FormControl({
        //         companyCode: this.buyerCompanyCode,
        //         companyName: this.buyerCompanyName
        //     });
        //     this.reactiveComp = this.compCtrl.valueChanges.startWith(this.compCtrl.value)
        //         .map(val => this.displayFn(val))
        //         .map(companyName => this.filterBuyerCompanyServices(companyName));
        // },
        
        
        // error => {
        //     console.error('Error loading company!');
        //     console.error(error);
        // 
        this.filteredOptions = this.myControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || '')),
          );
        });
        
    }

onConsumerChange() {
    console.log(this.buyerCompanyServices);
    this.filteredServices = this.buyerCompanyServices
        .filter((item) => item.serviceNumber == this.quantumAllocation.buyerCompServiceNumber);
        console.log(this.filteredServices)

        console.log(this.filteredServices)
    this.quantumAllocation.buyerCompServiceNumber = this.filteredServices[0].serviceNumber;
    this.quantumAllocation.buyerCompServiceName = this.filteredServices[0].companyName;
    this.quantumAllocation.buyerCompServiceId = this.filteredServices[0].serviceId;
    this.quantumAllocation.captiveCompanyName = this.filteredServices[0].companyName;
    this.quantumAllocation.drawalVoltageName = this.filteredServices[0].voltageName;
    this.quantumAllocation.buyerOrgName=this.filteredServices[0].orgCode;
    this.quantumAllocation.buyerOrgId=this.filteredServices[0].orgName;
}

initCaptiveQuantumAllocation() {
    this.disablebuyer=false
    if (!this.gc.captiveQuantumAllocation) {
        this.gc.captiveQuantumAllocation = [];
    }
    this.quantumAllocation = new QuantumAllocation();
    this.quantumAllocationRowIndex = -1;
}

addCaptiveQuantumAllocation() {
    if (!this.gc.captiveQuantumAllocation) {
        this.gc.captiveQuantumAllocation = [];
    }

    this.gc.captiveQuantumAllocation.push(Object.assign({}, this.quantumAllocation));
    this.service.setGc(this.gc);

    this.initCaptiveQuantumAllocation();
    this.disablebuyer=false;

    
}

updateCaptiveQuantumAllocation() {
    let tempArray = [];
    for (let index = 0; index < this.gc.captiveQuantumAllocation.length; index++) {
        if (this.quantumAllocationRowIndex == index) {
            tempArray.push(Object.assign({}, this.quantumAllocation));
        } else {
            tempArray.push(this.gc.captiveQuantumAllocation[index]);
        }
    }

    this.gc.captiveQuantumAllocation = tempArray;
    this.service.setGc(this.gc);

    this.initCaptiveQuantumAllocation();
    this.disablebuyer=false;
}


editCaptiveQuantumAllocation(_index: number) {
    this.scrollToEnd();
     this.disablebuyer=true;
    this.quantumAllocationRowIndex = _index;
    this.quantumAllocation = Object.assign({}, this.gc.captiveQuantumAllocation[_index]);
}

deleteCaptiveQuantumAllocation(_index: number) {
    this.gc.captiveQuantumAllocation.splice(_index, 1);
    
}

selectFile(event,documnetdetails:DocumentList) {  
   
    // console.log("came in once"+documnetdetails.isUploaded)
    const file = event.target.files.item(0);
    var size = event.target.files[0].size;  
    var type = event.target.files[0].type;
    
    if(size > 2000000 )  
    {  
        alert("size must not exceeds 2 MB");  
       
    }  
    else if(type != "application/pdf"){
        alert("Please Upload an Pdf Format File");
    }
    else  
    {  
       
        this.selectedFiles = file; 
        this.isfileSelected=false;
        documnetdetails.isUploaded='false';
        this.enableupload=false;
        
            // if(documnetdetails.isUploaded == 'false'){
            //     console.log("came in once")
            //     documnetdetails.isUploaded = 'true' 
            // }
            //else {
              //  alert("file already uploaded!!");
           // }
       
       
    }  

}
upload(documnetdetails:DocumentList){
   
    this.progress = 0;
    console.log(this.selectedFiles);

    if (this.selectedFiles == undefined){
        
        alert("No File is Selected Please Upload an valid file");  
    }
    
   else {
    documnetdetails.createdBy = this.ApplicationDetails.serviceNo;
    this.service.uploadFile(this.selectedFiles,documnetdetails ).subscribe(  
        res => {  
            console.log(res);
          
          
           if(res = 'success')  
           {  
           
              alert("file upload successfully ");  

                //this.nonuploadedfolders.splice(this.nonuploadedfolders.findIndex(x => x.docCode === documnetdetails.docCode));

            this.getGenDetails();

            //  let temp=this.folders.find(x => x.docCode === documnetdetails.docCode);
            //  temp.isUploaded='true';
            //  this.folders.splice(this.folders.indexOf(temp),1);
            //  this.folders.push(temp);
            //   this.folders.forEach(item =>{
            //     if(item.id == documnetdetails.id){
            //         item.isUploaded = 'Y'
            //     }
            // }); 
                
           }  
           else{  
              alert("error while uploading file details");  
           }  
        },  
       
    );  
}

}

// save(applndetails:NameChangeApplmodel){
//  let saveresult;
//     this.service.save(this.gc.captiveQuantumAllocation,applndetails).subscribe(  
//         res => {  
//             console.log(res);
//             saveresult = res; 
//         },);
//         return saveresult;
// }
savedetails(){
   
    console.log(this.gc.captiveQuantumAllocation);
 let buyerlength =this.buyerData.length;
 //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
 
    for (let l=0; l<=buyerlength;l++)
    {
        console.log("comes in---"+l);
    this.buyerData.pop();
    }

    
    console.log(this.buyerData);
      for (let i = 0; i<=this.gc.captiveQuantumAllocation.length-1;i++){
       
        let tempClass = new BuyersList();
        
         tempClass.id =i.toString();
         //this.buyerData.push(this.buyerrone);
        //console.log(this.buyerData);
   console.log("came in in bug--"+i);
   tempClass.applicationId= this.ApplicationDetails.id.toString(); 
   tempClass.enabled= this.gc.captiveQuantumAllocation[i].Enabled
   tempClass.buyerCompanyName= this.gc.captiveQuantumAllocation[i].buyerCompServiceName ;
   tempClass.drawalVoltageCode= this.gc.captiveQuantumAllocation[i].drawalVoltageCode ;
   tempClass.remarks= this.gc.captiveQuantumAllocation[i].remarks ;
   tempClass.quantum= this.gc.captiveQuantumAllocation[i].quantum ;
  // tempClass.createdDate= this.gc.captiveQuantumAllocation[i].createdDate ;
   tempClass.buyerOrgId= this.gc.captiveQuantumAllocation[i].buyerOrgId;
   tempClass.createdBy= this.gc.captiveQuantumAllocation[i].createdBy ;
   tempClass.buyerOrgCode= this.gc.captiveQuantumAllocation[i].buyerOrgName ;
   tempClass.drawalVoltageName= this.gc.captiveQuantumAllocation[i].drawalVoltageName;
   tempClass.buyerServiceId= this.gc.captiveQuantumAllocation[i].buyerCompServiceId ;
   tempClass.buyerServiceNo= this.gc.captiveQuantumAllocation[i].buyerCompServiceNumber;
   tempClass.buyerInjectionVoltage= this.gc.captiveQuantumAllocation[i] .injectionVoltageCode;
   tempClass.buyerInjectionVoltageName= this.gc.captiveQuantumAllocation[i].injectionVoltageName;
   tempClass.sellerServiceNo= this.ApplicationDetails.serviceNo
   tempClass.sellerId= this.ApplicationDetails.serviceId ;
   tempClass.sharePercentage = this.gc.captiveQuantumAllocation[i].sharePercentage ;
       //console.log(tempClass);
      
       this.ApplicationDetails.buyerDetailsList.push(tempClass);
       

      }
      
      console.log(this.buyerData);
    //   for (let m=0; m<=applbuyerlength;m++){

    //     this.ApplicationDetails.buyerDetailsList.pop();
    //  }
     console.log(this.ApplicationDetails.buyerDetailsList);
     //this.ApplicationDetails.buyerDetailsList.push(this.buyerData);
     console.log(this.ApplicationDetails.buyerDetailsList);
      this.service.savedetails(this.ApplicationDetails).subscribe
      (x=>{
          this.ApplicationDetails=x;
          this.IsSavedOnce=true;
          
          console.log(this.gc.captiveQuantumAllocation);
         this.ngOnInit();
         buyerlength =this.buyerData.length;
 //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
 
    
              this.getGenDetails();
             
              //this.getGenDetailsApplied();
  });
        
       error => {
        console.error('Error while saving data');
        console.error(error);
    
    }
}

savedetailsdup(){
   
    console.log(this.gc.captiveQuantumAllocation);
 let buyerlength =this.buyerData.length;
 //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
 
    for (let l=0; l<=buyerlength;l++)
    {
        console.log("comes in---"+l);
    this.buyerData.pop();
    }

    
    console.log(this.buyerData);
      for (let i = 0; i<=this.gc.captiveQuantumAllocation.length-1;i++){
       
        let tempClass = new BuyersList();
        
         tempClass.id =i.toString();
         //this.buyerData.push(this.buyerrone);
        //console.log(this.buyerData);
   console.log("came in in bug--"+i);
   tempClass.applicationId= this.ApplicationDetails.id.toString(); 
   tempClass.enabled= this.gc.captiveQuantumAllocation[i].Enabled
   tempClass.buyerCompanyName= this.gc.captiveQuantumAllocation[i].buyerCompServiceName ;
   tempClass.drawalVoltageCode= this.gc.captiveQuantumAllocation[i].drawalVoltageCode ;
   tempClass.remarks= this.gc.captiveQuantumAllocation[i].remarks ;
   tempClass.quantum= this.gc.captiveQuantumAllocation[i].quantum ;
  // tempClass.createdDate= this.gc.captiveQuantumAllocation[i].createdDate ;
   tempClass.buyerOrgId= this.gc.captiveQuantumAllocation[i].buyerOrgId;
   tempClass.createdBy= this.gc.captiveQuantumAllocation[i].createdBy ;
   tempClass.buyerOrgCode= this.gc.captiveQuantumAllocation[i].buyerOrgName ;
   tempClass.drawalVoltageName= this.gc.captiveQuantumAllocation[i].drawalVoltageName;
   tempClass.buyerServiceId= this.gc.captiveQuantumAllocation[i].buyerCompServiceId ;
   tempClass.buyerServiceNo= this.gc.captiveQuantumAllocation[i].buyerCompServiceNumber;
   tempClass.buyerInjectionVoltage= this.gc.captiveQuantumAllocation[i] .injectionVoltageCode;
   tempClass.buyerInjectionVoltageName= this.gc.captiveQuantumAllocation[i].injectionVoltageName;
   tempClass.sellerServiceNo= this.ApplicationDetails.serviceNo
   tempClass.sellerId= this.ApplicationDetails.serviceId ;
   tempClass.sharePercentage = this.gc.captiveQuantumAllocation[i].sharePercentage ;
       //console.log(tempClass);
      
       this.ApplicationDetails.buyerDetailsList.push(tempClass);
       

      }
      
      console.log(this.buyerData);
    //   for (let m=0; m<=applbuyerlength;m++){

    //     this.ApplicationDetails.buyerDetailsList.pop();
    //  }
     console.log(this.ApplicationDetails.buyerDetailsList);
     //this.ApplicationDetails.buyerDetailsList.push(this.buyerData);
     console.log(this.ApplicationDetails.buyerDetailsList);
      this.service.savedetails(this.ApplicationDetails).subscribe
      (x=>{
          this.ApplicationDetails=x;
          this.IsSavedOnce=true;
          
          console.log(this.gc.captiveQuantumAllocation);
        // this.ngOnInit();
         buyerlength =this.buyerData.length;
 //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
 
    
             /// this.getGenDetails();
  });
        
       error => {
        console.error('Error while saving data');
        console.error(error);
    
    }
}

// openDownload(data: Response) {
//     // let content_type = data.headers.get('Content-type');
//      let x_filename = "Amr Downlode Status report.pdf";
//     // console.log(content_type)
//     // saveAs(data.blob(), x_filename);
//    let get= new Blob([data.body(), x_filename], { type: 'application/pdf' });
//     const fileURL = URL.createObjectURL(data.blob());
//      window.open(fileURL, '_blank');
//      console.log("dsfsdfdfd");
//   }


downloadedoc(downloadefile:DocumentList){

    
        // this.service.downloadedoc(downloadefile).subscribe(xs=>{
        //   this.openDownload(xs);
        // });
        this.service.downloadedoc(downloadefile).subscribe(res => {
            const fileURL = URL.createObjectURL(res);
            window.open(fileURL, '_blank');
          });
    
      }

      fileReset(resetdoc:DocumentList){
        this.service.fileReset(resetdoc).subscribe(  
            res => {  
                console.log(res);
              
              
               if(res == 'success')  
               {  
                
                  alert("file Resetted successfully ");  
                  //this.Uplodedfolders.splice(this.Uplodedfolders.findIndex(x => x.docCode === resetdoc.docCode));
                //   this.ngOnInit();
                  this.getGenDetails();
                
                
                }
    
               else{    
                  alert("error while reseting file");  
               }  
            },  
           
        );  
    
    }

submit(){
       
            this.service.submission(this.ApplicationDetails).subscribe(x =>{
            
                if(x == 'success')  
                {  
                 
                   alert("Application Submitted SuccessFully");  
                   //this.Uplodedfolders.splice(this.Uplodedfolders.findIndex(x => x.docCode === resetdoc.docCode));
                 //   this.ngOnInit();
                  this.getGenDetails();
                 
                 
                 }
     
                else{    
                   alert("Error Submitting Application");  
                }  
             },  
            
         );  
     
        }
        private _filter(value: string): any[] {
            const filterValue = value.toLowerCase();
            return this.buyerCompanyServices.filter(option =>
              option.serviceNumber.toLowerCase().includes(filterValue)
            );
          }
          
          private scrollToEnd(): void {
            if (this.scrollTarget && this.scrollTarget.nativeElement) {
              this.scrollTarget.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            }
          } 

          openDownload(data: Response) {
            let content_type = data.headers.get('Content-type');
            let x_filename = "RENEWABLE ENERGY NAME TRANSFER BILL.pdf";
            console.log(content_type)
            saveAs(data.blob(), x_filename);
          }
          
          DownloadPayment(){
            this.service.downloadReciept(this.ApplicationDetails.id.toString()).subscribe(  
              res => {  
                  console.log(res);
                  this.openDownload(res);
                 
              },  
             
          );  
          
          
          }


          DownloadPayedBill(){
            this.service.downloadpaymentReciept(this.ApplicationDetails.id.toString()).subscribe(  
              res => {  
                  console.log(res);
                  this.openDownload(res);
                 
              },  
             
          );  
          
          
          }

          @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

          Banklistfetch(){
         
            this.PayBank.cusAddress=this.ApplicationDetails.cusAddrs;
            this.PayBank.cusname=this.ApplicationDetails.serviceExsitingName;
            this.PayBank.totalamount=this.ApplicationDetails.totalCharges;
            const randomId: string = uuidv4();
            this.PayBank.id=randomId;
            this.service.Banklist(this.PayBank).subscribe(x =>{
            console.log(x);
            this.Banklist=x;
            }
            );     
            this.tabGroup.selectedIndex = 4;

          }

          paymentprocess(a:any,b :string){

            console.log(a);
            console.log(b);

            if (b == 'Net') {
                if (!this.Processpayment.net) {
                    this.Processpayment.net = []; // Initialize if undefined
                }
                this.Processpayment.net.push(a); // Use parentheses for push method
                this.Processpayment.credit = [];
                this.Processpayment.debit = [];
            }
            if (b == 'Credit') {
                if (!this.Processpayment.credit) {
                    this.Processpayment.credit = []; // Initialize if undefined
                }
                this.Processpayment.credit.push(a); // Use parentheses for push method
                this.Processpayment.debit = [];
                this.Processpayment.net = [];
            }
            if (b == 'debit') {
                if (!this.Processpayment.debit) {
                    this.Processpayment.debit = []; // Initialize if undefined
                }
                this.Processpayment.debit.push(a); // Use parentheses for push method
                this.Processpayment.credit = [];
                this.Processpayment.net = [];
            }
             this.Processpayment.cusAddress= this.ApplicationDetails.cusAddrs;
             this.Processpayment.cusname= this.ApplicationDetails.serviceExsitingName;
             this.Processpayment.totalamount=this.ApplicationDetails.totalCharges;
             this.Processpayment.serviceno=this.ApplicationDetails.serviceNo;
             this.Processpayment.iserr='';
             this.Processpayment.message='';
            const randomId: string = uuidv4();
            this.Processpayment.id=randomId;
            console.log(this.Processpayment);
            this.service.paymentprocess(this.Processpayment).subscribe(x =>{
 

       if (x != 'failure'){
         // this.service.sendRequest(x);
        //  console.log(y);
        //  this.service.openHtmlInNewTab(y);
         

         

       }
       this.paymentForm.patchValue({
        param1: x,
    
        // Patch other form control values as needed
    });
    
                    // Construct the body in the format you mentioned
                    // const body = `Qin=${encodeURIComponent(x)}`;
                    // console.log(body);
                    // Add other form values to the body as needed

                    // Create and submit the form element
                    const formElement = document.createElement('form');
                    formElement.method = 'POST';
                    formElement.action = 'http://192.168.150.122/awp/TNEB/htbankurl.php';
                    formElement.target = '_blank';
                
                    const inputElement = document.createElement('input');
                    inputElement.type = 'hidden';
                    inputElement.name = 'Qin';
                    inputElement.value = x;
                    formElement.appendChild(inputElement);
                
                    document.body.appendChild(formElement);
                
                    formElement.submit();
       

             });
          }

          NewGenDeatils(){

            this.adminpage.openContactVerificationDialogNameTransfer(this.ApplicationDetails.id);
            this.disablesave=true;
          }
          UpdateNewGenDetails(){

            this.adminpage.openContactVerificationDialogNameTransfer(this.ApplicationDetails.id);
            
          }
          onValueChange(newValue: any) {
            // This function will be called when the value changes
            if (newValue==='Name Change And Utility Change'){

                 this.flowtypeshow=true;              
            }
        
            // Call your desired function here
            // For example:
            // this.yourFunction();
          }

}