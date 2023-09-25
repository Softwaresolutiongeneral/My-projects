import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

import { Component, OnInit, HostBinding } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';
import { CommonService } from '../../../../shared/common/common.service';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';

import { EsIntentService } from './../../services/es-intent.service';
import { EsIntent ,EsIntentLine,Edc} from './../../../vo/es-intent';


@Component({
  selector: 'es-intent-stb',
  templateUrl: './es-intent-stb.component.html',
  providers: [EsIntentService, MatDatepickerModule,  MatNativeDateModule, DatePipe
    ,CommonService
  ]
})
export class EsIntentStbComponent implements OnInit {
  esIntent:EsIntent;
  esIntentLine:EsIntentLine;
  esIntentLineRowIndex:number;
  addScreen: boolean = true;
  disableControls: boolean = false;
  enableProcess:boolean = false;
  enableSave:boolean = false;
  months= [];
  isCaptives = [
    { "key": "Y", "name": "Y" },
    { "key": "N", "name": "N" }
  ];
  agmtPeriodCodes=[
    {"key": "STOA", "name": "STOA" },
    {"key": "MTOA", "name": "MTOA" },
    {"key": "LTOA", "name": "LTOA" }
  ]
  companyServices=[];
  sellerCompanyServices=[];
  edcList=[];
  fromDate:any;
  toDate:any;
  nocStatus:any;
  ewaStatus:string;
  mpFromConfig = {'placeHolder': 'Duration-From', 'readonly':false};
  mpFromModel = {'month':'', 'year':''};
  mpToConfig = {'placeHolder': 'Duration-To', 'readonly':false};
  mpToModel = {'month':'', 'year':''};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: EsIntentService,
    private datePipe: DatePipe,
    private commonService :CommonService
  ) {
    
    
  }

 

 

  ngOnInit() {
    this.esIntent = new EsIntent();
    this.esIntentLine = new EsIntentLine();
    this.esIntent.isCaptive="N";
    (this.esIntent.nocGeneratorStatusCode==null?this.esIntent.nocGeneratorStatusCode="Not Started":this.esIntent.nocGeneratorStatusCode);  
   this.mpFromModel = null;
   this.mpToModel = null;
    this.commonService.fetchEDCs().subscribe(
      edc=>{
      
        this.edcList = edc;
        
      }
    )
    this.months = this.commonService.fetchMonths();
   
      this.route.queryParams.filter(params=>params.flowType)
      .subscribe(params=>{
        this.esIntent.flowTypeCode=params.flowType;
      })
     
      this.route.queryParams.filter(params=>params.id)
         .switchMap((params: Params) => this.service.getEsIntentById(params.id))
        .subscribe(_esIntent=>{        
        this.esIntent = _esIntent;
        this.addScreen = false;
        this.onEdcChange();
        this.esIntentLine = this.esIntent.energySaleIntentLines[0];
        this.mpFromModel = {'month':this.esIntent.fromMonth, 'year':this.esIntent.fromYear};
        this.mpToModel = {'month':this.esIntent.toMonth, 'year':this.esIntent.toYear};

        });
    }


  mpOnFromModelChange(e){
	  this.esIntent.fromMonth = e.month;
	  this.esIntent.fromYear= e.year;

  }
  mpOnToModelChange(e){
	  this.esIntent.toMonth = e.month;
	  this.esIntent.toYear= e.year;

  }



  onEdcChange(){

    this.esIntentLine.buyerCompanyServiceId = "TNEB-"+this.esIntent.sellerEndOrgId;
    this.esIntentLine.buyerEndOrgId = this.esIntent.sellerEndOrgId;

    this.service.getSellers(this.esIntent.sellerEndOrgId).subscribe(
      _sellerCompanyServices=>{
        this.sellerCompanyServices = _sellerCompanyServices;
  
      }
    );    
  }

  onSellerServiceChange(){
      
    var sellerCompanyService = this.sellerCompanyServices.filter((item)=> item.id == this.esIntent.sellerCompanyServiceId)[0];
    console.log(sellerCompanyService)
    this.esIntent.sellerCompanyId = sellerCompanyService.companyId;
    this.esIntent.sellerCompanyName = sellerCompanyService.companyName;
    this.esIntent.sellerCompanyServiceNumber = sellerCompanyService.number;
    this.esIntentLine.buyerCompanyId= "TNEB";
    this.esIntentLine.buyerCompanyName= "TNEB";
    this.esIntentLine.buyerCompanyServiceNumber= "TNEB-"+this.esIntent.sellerEndOrgId;
    this.esIntentLine.buyerCompanyServiceId= "TNEB-"+this.esIntent.sellerEndOrgId;
    this.esIntentLine.epaStatusCode="Not Started";
  
    //this.esIntent.sellerCompanyName= this.edcs.filter((item)=> item.id == this.esIntent.sellerCompanyServiceId)[0].companyName;
    console.log(this.esIntent);
    
  }

  onCaptiveChange(){
    if(this.esIntent.flowTypeCode=="03"){
    
    }else{
      if(this.esIntent.isCaptive=="Y"){
        this.esIntent.flowTypeCode="01";
      }else if(this.esIntent.isCaptive=="N"){
        this.esIntent.flowTypeCode="02";
      }
    }
   
    console.log(this.esIntent.flowTypeCode)
  }

  monthConvertor() {
    
        var fromMonthStr = this.esIntent.fromMonth;
        var fromYearStr = this.esIntent.fromYear;
        var fromMonth = +fromMonthStr;
          fromMonth = fromMonth - 1;
        var fromYear = +fromYearStr;
        this.fromDate = new Date(fromYear,fromMonth, 1);

        var toMonthStr = this.esIntent.toMonth;
        var toYearStr = this.esIntent.toYear;
        var toMonth = +toMonthStr;
        toMonth = toMonth - 1;
        var toYear = +toYearStr;
        this.toDate = new Date(toYear,toMonth + 1, 0);
        this.esIntent.fromDate = this.fromDate;
        this.esIntent.toDate = this.toDate;   
    
      }

  saveEsIntent() {
    this.monthConvertor() ;
    this.formatChangesforDB();
   
    this.esIntent.energySaleIntentLines=[];
    this.esIntent.energySaleIntentLines.push(this.esIntentLine);
    console.log(this.esIntent);
    
    console.log('In save' + this.addScreen);
    if (this.addScreen) {
      this.addEsIntent();
    }
    else {
      this.updateEsIntent();
    }
  }

  formatChangesforDB() {

    this.esIntent.fromDate = this.datePipe.transform(this.esIntent.fromDate, 'yyyy-MM-dd');
    this.esIntent.toDate = this.datePipe.transform(this.esIntent.toDate, 'yyyy-MM-dd');

  }

  

  addEsIntent() {
    this.esIntent.statusCode="CREATED";
    this.service.addEsIntent(this.esIntent).subscribe(
      result => {
         console.log(result);
         alert(result.message);
        this.listEsIntent();
      },
      error => {
        console.error('Error adding EsIntent!');
        console.error(error);
        this.listEsIntent();
      }
    );
  }

  updateEsIntent() {
    

    this.service.updateEsIntent(this.esIntent).subscribe(
      result => {
        this.listEsIntent();
      },
      error => {
        console.error('Error updating EsIntent!');
        console.error(error);
        this.listEsIntent();
      }
    );
  }

  processEsIntent() {
    this.esIntent.statusCode="PROCESS";
        this.formatChangesforDB();
        this.service.processEsIntent(this.esIntent).subscribe(
          result => {
            this.listEsIntent();
          },
          error => {
            console.error('Error Processing EsIntent!');
            console.error(error);
            this.listEsIntent();
          }
        );
      }
  
    toggleProcessButton(){
      this.enableProcess = false;
      this.enableSave = false;
      console.log("in toggleProcessButton")
      if(this.esIntent.statusCode=="CREATED"){
        console.log("in add screen")
        this.enableProcess = true;
        this.enableSave = true;
      }else if(this.esIntent.ewaStatusCode=="COMPLETED"){
        this.enableProcess = true;
        this.enableSave = true;
      } else if(this.esIntent.energySaleIntentLines!=null){

        this.esIntent.energySaleIntentLines.forEach(element => {
          if(element.nocId==null){
            this.enableProcess = true;
            this.enableSave = true;
          }else if(element.nocId!=null){
            this.enableProcess = false;
            this.enableSave = false;
          }
        });
      }     
    }


  listEsIntent() {
    this.router.navigateByUrl('/es-intent/es-intent-list');
  }


}