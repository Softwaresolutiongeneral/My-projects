import { Component, OnInit, OnDestroy, ViewChild, HostListener, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { Service } from '../../vo/company.v1';
import { CompanyService } from '../../company/services/company.service';
import { AuthUser } from '../../../user/services/authuser';
import { CommonUtils } from '../../../shared/common/common-utils';
import { NameChangeApplService } from '../services/name-change-appl.service';
import { NameChangeApplmodel } from '../../vo/nametransfer';
@Component({
   selector: 'name-change-appl-verify-new-user',
   templateUrl: './name-change-appl-verify-new-user.component.html',
   providers: [NameChangeApplService,NameChangeApplmodel],
  })
  export class VerifyContactInfoNameChangeDialogComponent {
    utils: CommonUtils = new CommonUtils();
    isSubmitDisabled: boolean=true;
    hideCin: boolean=true;
    hideLlpin: boolean=true;
    message: string="";
    serviceVO: Service = new Service();
    companyTypes =[
      {"key":"COMPANY","name":"Company"},
      {"key":"LLP","name":"LLP"},
      {"key":"PARTNERSHIP","name":"Partnership Firm"},
      {"key":"SOLE-PROP","name":"Sole Proprietor"},
      {"key":"OTHERS","name":"Others"}
    ];
  bank: any;
  bankList=[];
  filteredBankList=[];
  appldetail: NameChangeApplmodel =new NameChangeApplmodel();
    appldetailid: number;

      constructor(public dialogRef: MatDialogRef<VerifyContactInfoNameChangeDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, public companyService: CompanyService
      ,private service: NameChangeApplService,
      @Inject(MAT_DIALOG_DATA) public applicationdetials: number) {

      }

  ngOnInit() {
    this.loadBankNames();
   
    console.log(this.applicationdetials);
    
    //this.getnewgendetails();
    // var user: AuthUser = JSON.parse(sessionStorage.getItem('user'));
    // if(user.companyServiceId == null || user.companyServiceId ==''){
    //   //not a generator/consumer - so contact info need not be verified
    //   this.dialogRef.close(true);
    // }
    // else{
    //   console.log(user.companyServiceId)
    //   this.companyService.getServiceContactInfoById(user.companyServiceId).subscribe(
    //     _service => {
    //       this.serviceVO = _service;
    //       this.hideCin =!(this.serviceVO.companyTypeCode=='COMPANY');
    //       this.hideLlpin =!(this.serviceVO.companyTypeCode=='LLP');
    //       if(this.serviceVO.isContactVerified ==="Y"){
    //         this.dialogRef.close(true);
    //       }
    //       else
    //       {
    //         this.isSubmitDisabled = false;
    //       }

    //     }
    //   );
    // }
  }
  ngAfterViewInit() {
    // This code will run after the view has been initialized.
    this.getnewgendetails();
  }


    sessClose(): void {
        this.dialogRef.close(false);
    }

    loadBankNames(){
      this.companyService.getBank().subscribe(xs=>{
        this.bankList = xs;
      });
    }


    checkOrgInfo(){
      var _compType = this.serviceVO.companyTypeCode;
      if(!this.utils.isNullOrEmpty(this.serviceVO.cin) && !this.utils.isAlphaNumeric(this.serviceVO.cin,21) ){
          return "CIN should consist of Alpha-Numeric characters totaling 21 digits";
      }
      if(!this.utils.isNullOrEmpty(this.serviceVO.llpin) && !this.utils.isAlphaNumeric(this.serviceVO.llpin,7) ){
          return "LLPIN should consist of Alpha-Numeric characters totaling 7 digits";
      }
      if(!this.utils.isNullOrEmpty(this.serviceVO.pan) && !this.utils.isAlphaNumeric(this.serviceVO.pan,10) ){
          return "PAN should consist of Alpha-Numeric characters totaling 10 digits";
      }
      if(!this.utils.isNullOrEmpty(this.serviceVO.gst) && !this.utils.isAlphaNumeric(this.serviceVO.gst,15) ){
          return "GST should consist of Alpha-Numeric characters totaling 15 digits";
      }
      if(!this.utils.isNullOrEmpty(this.serviceVO.tan) && !this.utils.isAlphaNumeric(this.serviceVO.tan,10) ){
        return "TAN should consist of Alpha-Numeric characters totaling 15 digits";
    }
      if(this.utils.isNullOrEmpty(_compType)){
        return 'Company Type is mandatory';
      }
      else{
        _compType = _compType.toLocaleUpperCase();
        if (_compType == 'COMPANY') {
            if(this.utils.isNullOrEmpty(this.serviceVO.cin) || this.utils.isNullOrEmpty(this.serviceVO.pan)){
              return "CIN and PAN is mandatory!!";
            }
        }else if ( _compType == 'LLP' ) {
          if( this.utils.isNullOrEmpty(this.serviceVO.llpin) || this.utils.isNullOrEmpty(this.serviceVO.pan)){
            return "LLPIN and PAN is mandatory!!";
          }
      } else if(_compType == 'PARTNERSHIP' || _compType == 'SOLE-PROP' ) {
          if(this.utils.isNullOrEmpty(this.serviceVO.pan)){
            return "PAN is mandatory!";
          }

        }
      }
      return "";
    }

    canSubmit(){
      var submit:boolean = true;
      this.message ="";
      this.message = this.checkOrgInfo();
      if(this.message != ""){
        return false;
      }
       if(this.serviceVO.contactFullName == null || this.serviceVO.contactFullName == ""){
         submit = false;
       }
       if(this.serviceVO.contactDesignation == null || this.serviceVO.contactDesignation == ""){
         submit = false;
       }
       if(this.serviceVO.contactEmail == null || this.serviceVO.contactEmail == ""){
         submit = false;
       }
       if(this.serviceVO.contactPhoneNo == null || this.serviceVO.contactPhoneNo == ""){
         submit = false;
       }
       if(this.serviceVO.plantAddr == null || this.serviceVO.plantAddr == ""){
         submit = false;
       }
       if(this.serviceVO.regOfficeAddr == null || this.serviceVO.regOfficeAddr == ""){
         submit = false;
       }
       if(submit==false){
         this.message = "All contact fields are mandatory!";
         return false;
       }

       if(this.serviceVO.gst == null || this.serviceVO.gst == ""){
        this.message = "Please enter the GST";
         return false;
      }
       var mailformat =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; //email format
       var phonenoFromat =/^\d{10}$/g; //only 10 digits allowed

       if(!this.serviceVO.contactPhoneNo.match(phonenoFromat)){
        this.message = "Only 10 digits allowed for Phone Number - Please fix it!";
        return false;
       }

       if(!this.serviceVO.contactEmail.match(mailformat)){
        this.message = "Invalid Email Format. Please fix it!";
        return false;
       }

       return submit;
    }

    valueChange(){
      this.isSubmitDisabled = false;
      this.message = "";
      this.hideCin =!(this.serviceVO.companyTypeCode=='COMPANY');
      this.hideLlpin =!(this.serviceVO.companyTypeCode=='LLP');
    }
    verifyContactInfo(): void {
      this.isSubmitDisabled = true;
      if(this.canSubmit()){

        console.log(this.serviceVO);
        
        this.service.savenewgendetails(this.serviceVO,this.applicationdetials.toString()).subscribe(x =>
        {
            if (x=="success"){
                alert("Details Save Successfully");
                this.dialogRef.close(true);
            }
           else{
            alert("Error in saving Details");
            this.dialogRef.close(true);
           }





            })
       
      }


     }

 

     onBankSelect(ban){
       this.serviceVO.bankName=ban.bankName;

     }
     reset(){
        this.serviceVO = new Service();
     }

     getnewgendetails() {
       
          console.log(this.applicationdetials);
      
          this.service.getnewgendetails(this.applicationdetials.toString()).subscribe(
            (x) => {
              this.serviceVO = x;
            }
          );
        } 
      }
  
