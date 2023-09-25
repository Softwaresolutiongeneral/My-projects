import 'rxjs/add/operator/switchMap';
import { Component, OnInit, HostBinding,Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Gc,QuantumAllocation } from '../../grid-connectivity/services/gc';
 
import { NameChangeApplService } from './services/name-change-appl.service';
import { CommonService } from '../../shared/common/common.service';
import { CommonUtils } from '../../shared/common/common-utils';
import { BuyersList, DocumentList, NameChangeApplmodel, NewGenDeatils, billPayment } from '../../../app/transaction/vo/nametransfer';
import { ResolvedStaticSymbol } from '@angular/compiler';
import { saveAs } from 'file-saver';
import { addListener } from 'process';
import { ContactOfGeneratorReportComponent } from '../../report/components/contact-of-generator-report/contact-of-generator-report.component';


@Component({
  selector: 'name-change-appl',
  templateUrl: './name-change-appl.component.html',
  styleUrls:['./name-change-app.component.css'],
  providers: [NameChangeApplService]
})
export class NameChangeApplComponent implements OnInit{ 
    UserName:any;
    Usertype:any;
    rows:any;
    mCompServNumber: string="";
    statementMonth: string = "";
    statementYear: string = "";
    rowss:any=[];
    disablePayment : boolean = false;
    
    captive:string="";
    capacityInKV:string="";
    dispCompanyServiceNumber:any;
    disableCompanyName: boolean = false;
    FlowtypeList = [{"name" :'Captive',"code":'IS-CAPTIVE'},
                    {"name":'SaleToBoard',"code":'STB'},
                    {"name": 'ThirdParty',"code": 'THIRD-PARTY'} ];
    SchemeType = [{"name" :'REC',"code":'Y'},
                  {"name":'NON-REC',"code":'N'}];

 FLOWTYPE:string="";
 Scheme:string="";
 selectedFiles: File; 
 OrderFile: File;
 DfcFile:File;
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
buyerCompanyServices = [];
filteredServices = [];

folders:DocumentList[]=[];
edcnoc:DocumentList;
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
   disableApproval : boolean = true;
    Enableuploadorder: boolean =false;
    enableQuery:boolean = false;
    disableallbutton: boolean;
    modifiedReports: any[] = [];
    ncesloggedin: boolean;
    edcloggedin: boolean;
    steps: { title: string, number: number,active:boolean,StatusDate:Date,Remarks:string }[] = [
        { title: 'DRAFT', number: 1, active :false,StatusDate:null,Remarks:null },
        { title: 'SUBMITTED', number: 2, active :false,StatusDate:null,Remarks:null  },
        { title: 'NOC-ISSUED-BY-EDC', number: 3, active :false ,StatusDate:null,Remarks:null },
        { title: 'UNDER PROCESS BY NCES-AEE', number: 4, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER PROCESS BY NCES-EE', number: 5, active :false,StatusDate:null,Remarks:null  },
        { title: 'PAYMENT RAISED', number: 6, active :false,StatusDate:null,Remarks:null  },
        { title: 'PAYMENT RECEIVED', number: 7, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER APPROVAL BY NCES-AEE', number: 8, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER APPROVAL BY NCES-EE', number: 9, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER APPROVAL BY NCES-SE', number: 10, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER APPROVAL BY NCES-CE', number: 11, active :false,StatusDate:null,Remarks:null  },
        { title: 'UNDER EE APPROVE FOR ORDER ISSUE', number: 12, active :false,StatusDate:null,Remarks:null  },
        { title: 'APPROVAL ISSUED', number: 13, active :false,StatusDate:null,Remarks:null  },
    ];
    isdfcuser: boolean=false;
    isUploadedOrderCopy: boolean=false
    enableordercopyupload: boolean=false;
  //   newgendetails:NewGenDeatils;
//-------------------------------------------------------
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: NameChangeApplService,private commonService:CommonService,
    private commonUtils: CommonUtils,private ApplicationDetails:NameChangeApplmodel,
    private newgendetails:NewGenDeatils,
    private buyerrone: BuyersList
   
  ) { this.compCtrl = new FormControl({
    companyCode: this.buyerCompanyCode,
    companyName: this.buyerCompanyName,
   
});
this.UserName = CommonUtils.getLoginUserDetails(),
this.Usertype = CommonUtils.getLoginUserTypeName()
}

  ngOnInit() {
    this.gc = new Gc();
    this.route.paramMap
    .subscribe((_params: Params) => {
      console.log(_params)
      this.mCompServNumber=_params.get('serviceNo')
    });
        this.quantumAllocation = new QuantumAllocation();
       
       this.initCaptiveQuantumAllocation();
        this.fetchOrgList();
        //this.folders=this.commonUtils.getdocumentlist();
      
        //this.ApplicationDetails = new Array<NameTransferAppl>();
       // this.getGenDetails();
        // this.service.gcEvent.subscribe(_gc => {
        //     this.gc = _gc;
        //     console.log(this.gc);
        //   })
        //console.log(atob(this.Usertype) && this.mCompServNumber==null);
        console.log(atob(this.Usertype));
        if (atob(this.Usertype)=='Internal' && this.mCompServNumber==null|| atob(this.Usertype)=='EDC User' && this.mCompServNumber==null){
        try {
           
        
            this.router.navigateByUrl('name-change-appl/name-change-appl-list');
          }
          catch (e) {
            console.log(e);
          }
        }
        if (atob(this.Usertype)=='Internal'){
            this.ncesloggedin=true;
        }
        if (atob(this.Usertype)=='EDC User'){
             this.edcloggedin=true;
    
        }
      this.getGenDetails();
        
  }

  getGenDetails(){
    this.service.getGenDetailsByServiceNo(this.mCompServNumber).subscribe(x=>{
    this.ApplicationDetails=x;
    this.newgendetails=this.ApplicationDetails.newGenDetails;
    console.log(this.ApplicationDetails.newGenDetails);
    console.log(this.newgendetails);
    this.modifiedReports = [...this.ApplicationDetails.billPayment];
    if (atob(this.Usertype)=='EDC User'){
           this.ApplicationDetails.documentList.forEach(x => {
           if (x.docCode=="DOCOA2"){

            
            this.edcnoc=x;
            

           }    
        });
            
    }
    console.log(x);
   
    if (this.ApplicationDetails.applStatus=='NOC-ISSUED-BY-EDC' && this.UserName =='NCES-AEE'){

        this.disableApproval= false;
    }
    if (this.ApplicationDetails.applStatus=='UNDER PROCESS BY NCES-EE' && this.UserName =='NCES-EE'){

        this.disableApproval= false;
    }
    if (this.ApplicationDetails.applStatus=='PAYMENT RECEIVED' && this.UserName =='NCES-AEE'){
       
        this.disableApproval= false;
    }
   
    if (this.ApplicationDetails.applStatus =='UNDER APPROVAL BY NCES-EE' && this.UserName =='NCES-EE'){
      
        this.disableApproval= false;
    }
    if (this.ApplicationDetails.applStatus=='UNDER APPROVAL BY NCES-SE' && this.UserName =='NCES-SE'){
       
        this.disableApproval= false;
    }
    if (this.ApplicationDetails.applStatus=='UNDER APPROVAL BY NCES-CE' && this.UserName =='NCES-CE'){
       
        this.disableApproval= false;
    }
    if (this.ApplicationDetails.applStatus=='UNDER EE APPROVE FOR ORDER ISSUE' && this.UserName =='NCES-EE'){
       
        this.enableordercopyupload= true;
    }

    if (this.UserName =='NCES-EE' ||'NCES-AEE'||'NCES-SE'||'NCES-CE' && this.ApplicationDetails.applStatus=='PAYMENT-RECIEVED'){

        this.Enableuploadorder = true;
       
    }
    if (this.ApplicationDetails.applStatus=='DRAFT' || this.ApplicationDetails.applStatus=='RE-SUBMITTED'){

        this.disableallbutton= true;
    }
    if (this.ApplicationDetails.billPayment.length==0 && this.UserName =='NCES-EE'){
    
    this.disableApproval=true;

}

if(this.UserName.includes('DFC')){

    this.isdfcuser=true;
}
    if(this.ApplicationDetails.totalCharges != '0' && this.ApplicationDetails.totalCharges != undefined){
       this.disablePayment = true;
      }

      this.steps.forEach(element => {

        this.ApplicationDetails.applStatusList.forEach(x=>{
              if (element.title==x.applStatus){
                element.StatusDate=x.createdDate;
                element.Remarks=x.applRemarks;
              }

        })
        
        if (element.title == this.ApplicationDetails.applStatus){

          element.active=true;
          
        }
        else{
          element.active=false;
      }
     
      });
      console.log(this.steps);
  this.cleardocvar(); 
  this.setdocvar();
//   this.cleardoclist();
//    this.setdoclist();
   this.clearbuyerlist();
  this.getBuyerDetail();
//   this.Dissabesetter();
  this.enablesubmit();
  this.disbleallbuttons();

      
    })
}
disbleallbuttons(){
   
   
    if (this.ApplicationDetails.applStatus!='DRAFT'){
       
    this.disableControls=true;
    }
    else{
        this.disableControls=false;
    }
}
enablesubmit(){
    
    this.folders = this.folders.filter(folder => folder.isUploaded === 'true');
    console.log(this.folders.length+this.Uplodedfolders.length);
    if (this.folders.length==this.Uplodedfolders.length &&
        this.gc.captiveQuantumAllocation.length>0){
    this.Submit= false;
    }
    else{
        this.Submit=true;
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
// cleardoclist(){
//     console.log("called clear");

//     let length1 = this.Uplodedfolders.length;
//     for(let d=0; d<=length1;d++){
//     this.Uplodedfolders.pop();
//      }
//     let length2 = this.nonuploadedfolders.length;
//     for (let y = 0 ; y<=length2; y++){
//     this.nonuploadedfolders.pop();
//     }
// }
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

// setdoclist(){
   
   
   
//     console.log("called setter");
//     // this.folders.forEach(item=>{
//     //     if (item.isUploaded=='true'){
//     //        this.Uplodedfolders.push(item);
//     // }
//     // })
     
//      this.folders.forEach(item =>{
      
//          this.nonuploadedfolders.push(item);
          
   
//    }); 
//    console.log(this.Uplodedfolders);
// console.log(this.nonuploadedfolders);
// }
  
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
   this.quantumAllocation.buyerOrgCode=this.buyerData[i].buyerOrgId;
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
            this.compCtrl = new FormControl({
                companyCode: this.buyerCompanyCode,
                companyName: this.buyerCompanyName
            });
            this.reactiveComp = this.compCtrl.valueChanges.startWith(this.compCtrl.value)
                .map(val => this.displayFn(val))
                .map(companyName => this.filterBuyerCompanyServices(companyName));
        },
        error => {
            console.error('Error loading company!');
            console.error(error);
        });
}

onConsumerChange() {
    this.filteredServices = this.buyerCompanyServices
        .filter((item) => item.serviceId == this.quantumAllocation.buyerCompServiceId);
        console.log("filteredServices")

        console.log(this.filteredServices)
    this.quantumAllocation.buyerCompServiceNumber = this.filteredServices[0].serviceNumber;
    this.quantumAllocation.buyerCompServiceName = this.filteredServices[0].companyName;
    this.quantumAllocation.buyerCompServiceId = this.filteredServices[0].serviceId;
    this.quantumAllocation.captiveCompanyName = this.filteredServices[0].companyName;
    this.quantumAllocation.drawalVoltageName = this.filteredServices[0].voltageName;
}

initCaptiveQuantumAllocation() {
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
}


editCaptiveQuantumAllocation(_index: number) {
    this.quantumAllocationRowIndex = _index;
    this.quantumAllocation = Object.assign({}, this.gc.captiveQuantumAllocation[_index]);
}

deleteCaptiveQuantumAllocation(_index: number) {
    this.gc.captiveQuantumAllocation.splice(_index, 1);
    
}

// selectFile(event,documnetdetails:DocumentList) {  
   
//     // console.log("came in once"+documnetdetails.isUploaded)
//     const file = event.target.files.item(0);
//     var size = event.target.files[0].size;  
//     var type = event.target.files[0].type;
    
//     if(size > 2000000 )  
//     {  
//         alert("size must not exceeds 2 MB");  
       
//     }  
//     if(type != "application/pdf"){
//         alert("Please Upload an Pdf Format File");
//     }
//     else  
//     {  
//         this.selectedFiles = file; 
//         this.isfileSelected=false;
//         documnetdetails.isUploaded='false';
//         this.enableupload=false;
        
//             // if(documnetdetails.isUploaded == 'false'){
//             //     console.log("came in once")
//             //     documnetdetails.isUploaded = 'true' 
//             // }
//             //else {
//               //  alert("file already uploaded!!");
//            // }
       
       
//     }  

// }
selectnoc(event) {  
   
    // console.log("came in once"+documnetdetails.isUploaded)
    const file = event.target.files.item(0);
    var size = event.target.files[0].size;  
    var type = event.target.files[0].type;
    
    if(size > 2000000 )  
    {  
        alert("size must not exceeds 2 MB");  
       
    }  
    if(type != "application/pdf"){
        alert("Please Upload an Pdf Format File");
    }
   
    else  
    {  
        this.selectedFiles = file; 
        this.isfileSelected=false;
        //documnetdetails.isUploaded='false';
        this.enableupload=false;
       
       
    }  
   console.log(this.isfileSelected);
}
// upload(documnetdetails:DocumentList){
   
//     this.progress = 0;
//     //console.log(this.selectedFiles.name);

//     if (this.selectedFiles == undefined){
        
//         alert("No File is Selected Please Uploade an valid file");  
//     }
    
//    else {
//     documnetdetails.createdBy = this.ApplicationDetails.serviceNo;
//     this.service.uploadFile(this.selectedFiles,documnetdetails ).subscribe(  
//         res => {  
//             console.log(res);
          
          
//            if(res = 'success')  
//            {  
           
//               alert("file upload successfully ");  

//                 //this.nonuploadedfolders.splice(this.nonuploadedfolders.findIndex(x => x.docCode === documnetdetails.docCode));

//             this.getGenDetails();

//             //  let temp=this.folders.find(x => x.docCode === documnetdetails.docCode);
//             //  temp.isUploaded='true';
//             //  this.folders.splice(this.folders.indexOf(temp),1);
//             //  this.folders.push(temp);
//             //   this.folders.forEach(item =>{
//             //     if(item.id == documnetdetails.id){
//             //         item.isUploaded = 'Y'
//             //     }
//             // }); 
                
//            }  
//            else{  
//               alert("error while uploading fie details");  
//            }  
//         },  
       
//     );  
// }

// }
uploadnoc(){
   
    this.progress = 0;
    //console.log(this.selectedFiles.name);

    if (this.selectedFiles == undefined){
        
        alert("No File is Selected Please Uploade an valid file");  
    }
    
   else {
    this.edcnoc.createdBy = this.ApplicationDetails.serviceNo;
    this.service.uploadFile(this.selectedFiles,this.edcnoc ).subscribe(  
        res => {  
            console.log(res);
          
          
           if(res = 'success')  
           {  
           
              alert("noc uploaded successfully ");  

                //this.nonuploadedfolders.splice(this.nonuploadedfolders.findIndex(x => x.docCode === documnetdetails.docCode));

            this.getGenDetails();

           
                
           }  
           else{  
              alert("error while uploading fie details");  
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
   tempClass.buyerOrgCode= this.gc.captiveQuantumAllocation[i].buyerOrgCode ;
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
          console.log(this.ApplicationDetails);
          console.log(this.gc.captiveQuantumAllocation);
         this.ngOnInit();
         buyerlength =this.buyerData.length;
 //let applbuyerlength = this.ApplicationDetails.buyerDetailsList.length;
 
    
              this.getGenDetails();
  });
        
        


        
    

    
       error => {
        console.error('Error while saving data');
        console.error(error);
    
    }
  
}
// openDownload(data: Response) {
//     let content_type = data.headers.get('Content-type');
//     let x_filename = "Amr Downlode Status report.pdf";
//     console.log(content_type)
//     saveAs(data.blob(), x_filename);
//   }
downloadOrderCopy(doccode:string){

    
    // this.service.downloadedoc(downloadefile).subscribe(xs=>{
    //   this.openDownload(xs);
    // });
    this.service.downloadOrderCopy(this.ApplicationDetails.id.toString(),doccode).subscribe(res => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL, '_blank');
      });

  }



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
    ResetOrderCopy(){
        this.service.ResetOrderCopy(this.ApplicationDetails.id.toString()).subscribe(  
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
        ncesapprove(){
              this.service.ncesapprove(this.ApplicationDetails.id.toString(),this.UserName).subscribe(x =>{
            let resultApprove = x 
        
        if (resultApprove == 'success'){

            alert("Application Approved Successfully");
            this.router.navigateByUrl('name-change-appl/name-change-appl-list');
        }
        else {

            alert("Error in Application Approval");
        }
        
        
        
        
        })
            
            }

            openDownload(data: Response) {
                let content_type = data.headers.get('Content-type');
                let x_filename = "RENEWABLE ENERGY NAME TRANSFER BILL.pdf";
                console.log(content_type)
                saveAs(data.blob(), x_filename);
              }
             
              DownloadPayment(){
                this.service.downloadpaymentReciept(this.ApplicationDetails.id.toString()).subscribe(  
                  res => {  
                      console.log(res);
                      this.openDownload(res);
                     
                  },  
                 
              );  
              
              
              }
              downloadpayedReciept(){
                this.service.downloadpayedReciept(this.ApplicationDetails.id.toString()).subscribe(  
                  res => {  
                      console.log(res);
                      this.openDownload(res);
                     
                  },  
                 
              );  
              
              
              }
              RasiePayment(){

                this.service.raisepayment(this.ApplicationDetails.id.toString()).subscribe(  
                    res => {  
               if (res == 'success'){
                   
                alert('Payment Advise Raised Successfully,Please check the Payment Tab');
                this.getGenDetails();
                  }

                  else {
                   alert('Error in Raising Payment');

                  }

                    },);
              }
        
              selectFileOrder(event) {  
                const file = event.target.files.item(0);
                var size = event.target.files[0].size;  
                var type = event.target.files[0].type;
                this.OrderFile = file; 
            }
            selectDfcOrder(event) {  
                const file = event.target.files.item(0);
                var size = event.target.files[0].size;  
                var type = event.target.files[0].type;
                this.DfcFile = file; 
            }
            OrderCopyupload(){
   
               
              
                if (this.OrderFile == undefined){
                    
                    alert("No File is Selected Please Uploade an valid file");  
                }
                
               else {
                //documnetdetails.createdBy = this.ApplicationDetails.serviceNo;
                this.service.uploadOrderCopy(this.OrderFile,"DOCOA16",this.ApplicationDetails.id.toString() ).subscribe(  
                    res => {  
                        console.log(res);
                      
                      
                       if(res == 'success')  
                       {  
                          alert("Ordered upload successfully "); 
                          this.ngOnInit() ;
                        } 
                   
                       else{  
                          alert("error while uploading OrderCopy");  
                       }  
                    },  
                   
                );  
            }
            
            }
            OrderCopyuploadApproval(){
   
               
              
                if (this.OrderFile == undefined){
                    
                    alert("No File is Selected Please Uploade an valid file");  
                }
                
               else {
                //documnetdetails.createdBy = this.ApplicationDetails.serviceNo;
                this.service.uploadOrderCopy(this.OrderFile,"DOCOA17",this.ApplicationDetails.id.toString() ).subscribe(  
                    res => {  
                        console.log(res);
                      
                      
                       if(res = 'success')  
                       {  
                       
                        this.service.uploadOrderCopy(this.DfcFile,"DOCOA18",this.ApplicationDetails.id.toString()).subscribe(  
                            res => {  
                                console.log(res);
                                if(res = 'success')  
                                {  
                          alert("Ordered upload successfully "); 
                          this.ngOnInit() ;
                        } });
                    }
                        
                   
                       
                       else{  
                          alert("error while uploading OrderCopy");  
                       }  
                    },  
                   
                );  
            }
            
            }
        enterRemarks(){
            this.enableQuery=true;
        }
        saveRemarks(){
            this.service.returnApplication(this.ApplicationDetails.id.toString(),
                this.ApplicationDetails.applRemarks).subscribe (res => {
                  if (res = 'success'){

                    alert("Application Returned Successfully");
                    this.router.navigateByUrl('name-change-appl/name-change-appl-list');
                  }
                  else{

                    alert("Error in Application Return");
                  }

                })


        }
       

  
  updateModifiedReport(index: number, field: string, value: any) {
    if (!this.modifiedReports[index]) {
      this.modifiedReports[index] = { ...this.ApplicationDetails.billPayment[index] };
    }

    this.modifiedReports[index][field] = value;
  }
  SavePayment() {
    console.log(this.modifiedReports);
    this.ApplicationDetails.billPayment = [...this.modifiedReports];
   this.service.savepayment(this.ApplicationDetails.billPayment).subscribe(x =>{

        if (x == 'success'){
                 alert("Payment Saved Successfully");
                 this.savedetails();

        }
        else{
                alert("Error in Saving Payment");
        }


   });

    
  }
       
}