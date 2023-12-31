import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/startWith';

import { Component, OnInit, HostBinding } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormsModule, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
//import { SessionStorage} from "angular2-localstorage/WebStorage";
import { CommonUtils } from '../../../../shared/common/common-utils';
//import { ConsentEvent } from './../../services/consent.event';
import { MeterReadingImportService } from './../../services/meter-reading-import.service';
import { CommonService } from './../../../../shared/common/common.service';
import { MeterReadingImport, MeterReadingImportLine } from './../../../vo/meter-reading-import';
import { MatDatepickerModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { SignupService } from './../../../../master/signup/services/signup.service';
import { MeterReading, MeterReadingSlot } from '../../../meter-reading/services/meter-reading';

@Component({
  selector: 'meter-reading-import-process',
  templateUrl: './meter-reading-import-process.component.html',
  providers: [CommonService,CommonUtils, MeterReadingImportService, SignupService, MatDatepickerModule, MatNativeDateModule, DatePipe]
})

export class MeterReadingImportProcessComponent {

  meterReadingImport: MeterReadingImport;
  meterReadingImportLine: MeterReadingImportLine;

  meterReadingImportLineRowIndex: number; 
  sellerhtscNumber: any;
  sellerCompanyName: String; 
  lineValidationErrors: String="";
  disableEdcFlag: boolean = false;
  addScreen: boolean = true;
  disableControls: boolean = true;
  firstDay: any;
  lastDay: any;
  importDate: any;

  edcId:string;
  // months=[];
  orgId = [];
  plantTypes = [];
  substationId = [];
  filteredEDCs = [];
  filteredCompanies = [];
  filteredSellerCompanyServices = [];
  sellerCompanyServices = [];
months=[];
  SourceCodeTypes = [
    { "key": "01", "name": "MDMS" },
    { "key": "02", "name": "UI" }
  ]

  monthsreading = [
    { "key": "01", "name": "January" },
    { "key": "02", "name": "February" },
    { "key": "03", "name": "March" },
    { "key": "04", "name": "April" },
    { "key": "05", "name": "May" },
    { "key": "06", "name": "June" },
    { "key": "07", "name": "July" },
    { "key": "08", "name": "August" },
    { "key": "09", "name": "September" },
    { "key": "10", "name": "October" },
    { "key": "11", "name": "November" },
    { "key": "12", "name": "December" }
  ]

  yearsreading = [
    { "key": "2016", "name": "2016" },
    { "key": "2017", "name": "2017" },
    { "key": "2018", "name": "2018" },
    { "key": "2019", "name": "2019" },
    { "key": "2020", "name": "2020" },
    { "key": "2021", "name": "2021" },
    { "key": "2022", "name": "2022" },
    { "key": "2023", "name": "2023" }
  ];
  accessProcessFlag:boolean = false;
  searchcompanyServiceNumber: any;
  searchMonth: any;
  searchYear: any;
  // rows: any;
  rows: Array<MeterReading>;
  meterReading: MeterReading;
  meterId: any=[];
  sample: any;
  importFinal: any=[];
  samp: MeterReadingSlot[];
  slot1: any;
  slot2: any;
  slot3: any;
  slot4: any;
  slot5: any;
  // prevMonth: string;
  
  constructor(
    private commonUtils: CommonUtils,
    private route: ActivatedRoute,
    private router: Router,
    private service: MeterReadingImportService,
    private commonService: CommonService,
    private datePipe: DatePipe

  ) {

    this.fetchEDCs();
    //  this.fetchMonths()
    this.fetchSellerCompanyServices();
    this.months = this.commonService.fetchMonths();
  }

  ngOnInit() {
    
    this.meterReadingImport = new MeterReadingImport();
  this.meterReading = new MeterReading();
    this.meterReadingImportLine = new MeterReadingImportLine();
    this.meterReadingImport.readingMonthCode = this.commonUtils.getPerviousMonth();
    this.meterReadingImport.readingYear = this.commonUtils.getPreviousYear();
    this.initMeterReadingImportLines();
    this.accessProcessFlag=this.commonUtils.userHasAccess("METER-READING-IMPORT","PROCESS");
    // if (this.gs.orgId != "") {
    //   console.log("in edc select")
    //   this.searchOrgId = this.gs.orgId;
    //   this.disableEdc = true;
    // }
    if(CommonUtils.getLoginUserTypeCode()=='EDC'){
      this.disableEdcFlag=true;
    }
    console.log(CommonUtils.getLoginUserTypeCode())
    console.log(this.route.params['_value']);
    if (this.route.params['_value']['_id']) {
      //route.params['value'] will have the '_id' in it, during edit 
      this.addScreen = false;
      this.route.params
        .switchMap((params: Params) => this.service.getMeterReadingImportById(this.route.params['_value']['_id']))
        .subscribe((_meterReadingImport: MeterReadingImport) => {
          //console.log(_meterReadingImport);
          this.meterReadingImport = _meterReadingImport;
          this.formatChangesforUI();
        });
    }
// this.searchResults();
// this.prevMonth=this.getPerviousMonth();
  }

  onMonthSelect()
  {
    
    this.meterReadingImportLine.readingMonthCode = this.meterReadingImport.readingMonthCode ;
  } 

  onYearSelect()
  {
    this.meterReadingImportLine.readingYear = this.meterReadingImport.readingYear ; 

  }


  //  filterMonths(val: string) {
  //     return val ? this.months.filter((s) => s.name.match(new RegExp(val, 'gi'))) : this.months;
  //   }

  filterEDCs(val: string) {

    return val ? this.orgId.filter((s) => s.name.match(new RegExp(val, 'gi'))) : this.orgId;
  }


  fetchEDCs() {
    this.commonService.fetchEDCs().subscribe(
      result => {
        this.orgId = result;
      },
      error => {
        console.error('Error loading orgs!');
        console.error(error);
      });
  }


  //  fetchMonths(){
  //   this.commonService.fetchMonths().subscribe(
  //     result => {this.months = result;
  //     },
  //     error => {
  //        console.error('Error loading months!');
  //        console.error(error);
  //     }
  //     );
  // }

  monthConvertor() {

    var monthStr = this.meterReadingImportLine.readingMonthCode;
    var yearStr = this.meterReadingImportLine.readingYear;
    var month = +monthStr;
    month = month - 1;
    console.log(month)
    var year = +yearStr;
    this.firstDay = new Date(year, month, 1);
    this.lastDay = new Date(year, month + 1, 0);
    this.meterReadingImportLine.initReadingDate = this.firstDay;
    this.meterReadingImportLine.finalReadingDate = this.lastDay;
console.log(this.meterReadingImportLine)

  }

  // saveMeterReadingImport() {
 
  //   console.log("this.meterReadingImport")
  //   console.log(this.meterReadingImport)
  //   console.log('In save' + this.addScreen);
   
  //     this.formatChangesforDB();
  //     if (this.addScreen) {
  //       this.addMeterReadingImport();
  //     }
  //     else {
  //       this.updateMeterReadingImport();
  //     }
    
    
  // }


  formatChangesforLinesDB() {


    this.meterReadingImportLine.initReadingDate = this.datePipe.transform(this.meterReadingImportLine.initReadingDate, 'yyyy-MM-dd');
    this.meterReadingImportLine.finalReadingDate = this.datePipe.transform(this.meterReadingImportLine.finalReadingDate, 'yyyy-MM-dd');

  }

  formatChangesforUI() {
    this.meterReadingImport.importDate = (this.meterReadingImport.importDate) ? this.meterReadingImport.importDate.substr(0, 10) : "";

  }
  formatChangesforDB() {

    this.meterReadingImport.importDate = this.datePipe.transform(this.meterReadingImport.importDate, 'yyyy-MM-dd');
  }
  displayFn(value: any): string {
    return value && typeof value === 'object' ? value.name : value;
  }

  filterSellerCompanyServices(val: string) { 
    // this.sellerCompanyServices.forEach(s => {
    //   console.log(s.number)
    // });
    
    // as services strangely has null-serviceNumbers this is needed --> (s.number != null)
    return val ? this.sellerCompanyServices.filter((s) => ((s.number != null) && s.number.match(new RegExp(val, 'gi')))) : this.sellerCompanyServices;
  }

  fetchSellerCompanyServices() {
    this.edcId = CommonUtils.getLoginUserEDC();
    console.log( this.edcId)
    this.commonService.getMeterAndService(this.edcId,'').subscribe(
      result => {
        this.sellerCompanyServices = result; 
        console.log("sellerCompanyServices")
        console.log(this.sellerCompanyServices)
      },
      error => {
        console.error('Error loading company!');
        console.error(error);
      });
  }

  onSellerChange() {
    this.accessProcessFlag = false;
    var _sellerCompanyService = this.sellerCompanyServices 
       .filter((item) => ((item.serviceNumber !=null )&& item.serviceNumber == this.meterReadingImportLine.serviceNumber))[0];
    if(_sellerCompanyService){
      this.meterReadingImportLine.meterNumber = _sellerCompanyService.meterNumber;
      this.meterReadingImportLine.mf = _sellerCompanyService.multiplicationFactor;
    this.searchcompanyServiceNumber=_sellerCompanyService.serviceNumber;
    // this.searchMonth=this.meterReadingImport.readingMonthCode;
    this.searchMonth=this.getPerviousMonth();
    if(this.meterReadingImport.readingMonthCode=='01'){
      var prevYear: any
     prevYear = this.meterReadingImport.readingYear
      this.searchYear=prevYear - 1 ;
    }else{
    this.searchYear=this.meterReadingImport.readingYear;
    }
      this.accessProcessFlag= true;
      this.searchResults();
    }

  }


  addAndProcessMeterReadingImport() { 
  
   
      this.importDate = new Date();
      this.meterReadingImport.importDate = this.importDate;
      this.meterReadingImport.mrSourceCode = "02";
      if(this.isLineDataValid()){
        this.addMeterReadingImportLines();
      
        this.formatChangesforDB();
        console.log(this.meterReadingImport);
        this.service.addAndImportMeterReadingImport(this.meterReadingImport).subscribe(
          result => {
            var _result='';
            if(result['_body']){
              _result = result['_body'];
            }
            else
            _result = result.toString();

            alert(_result);
            
             this.router.navigateByUrl('/meter-reading-import/meter-reading-import-display');
             
          
          },
          error => {
            console.error('Error adding Meter Reading Import!');
            console.error(error);
            alert('Error adding Meter Reading Import!');
            this.router.navigateByUrl('/meter-reading-import/meter-reading-import-display');
          }
        );
      }
      else{
        alert(this.lineValidationErrors);
      }
  }

  updateMeterReadingImport() {
    this.service.updateMeterReadingImport(this.meterReadingImport).subscribe(
      result => {
        this.listMeterReadingImport();
      },
      error => {
        console.error('Error updating meter reading import!');
        console.error(error);
      }
    );
    
  }

 


  listMeterReadingImport() {
    this.router.navigateByUrl('/meter-reading-import/meter-reading-import-list');
  }


  initMeterReadingImportLines() {
    this.meterReadingImportLine = new MeterReadingImportLine();
    this.meterReadingImportLine.readingMonthCode = this.meterReadingImport.readingMonthCode;
    this.meterReadingImportLine.readingYear = this.meterReadingImport.readingYear;
    this.meterReadingImportLineRowIndex = -1;
  }

  isLineDataValid(){
    this.lineValidationErrors = "";
   if(this.meterReadingImportLine.serviceNumber == null || this.meterReadingImportLine.serviceNumber ==""){
     this.lineValidationErrors +="Please choose a valid Service Number";
   }
   else if(this.meterReadingImportLine.meterNumber == null || this.meterReadingImportLine.meterNumber ==""){
     this.lineValidationErrors +="Please select a Service Number with valid Meter Number";
   }
   else if(this.meterReadingImportLine.mf == null || this.meterReadingImportLine.mf ==""){
     this.lineValidationErrors +="Please select a Service Number with valid mf";
  }
   else if(this.meterReadingImportLine.readingMonthCode == null || this.meterReadingImportLine.readingMonthCode ==""){
     this.lineValidationErrors +="Please select a valid Reading Month";
   }
   else if(this.meterReadingImportLine.readingYear == null || this.meterReadingImportLine.readingYear ==""){
    this.lineValidationErrors +="Please select a valid Reading Year";
  }
  else if(this.meterReadingImportLine.impFinalS1 == null || this.meterReadingImportLine.impFinalS1 =="" ||this.meterReadingImportLine.impFinalS1 == undefined ){
    this.lineValidationErrors +="ImportFinalC1 is missing";
  }
  else if(this.meterReadingImportLine.impFinalS2 == null || this.meterReadingImportLine.impFinalS2 =="" ||this.meterReadingImportLine.impFinalS2 == undefined ){
    this.lineValidationErrors +="ImportFinalC2 is missing";
  }
  else if(this.meterReadingImportLine.impFinalS3 == null || this.meterReadingImportLine.impFinalS3 =="" ||this.meterReadingImportLine.impFinalS3 == undefined ){
    this.lineValidationErrors +="ImportFinalC3 is missing";
  }
  else if(this.meterReadingImportLine.impFinalS4 == null || this.meterReadingImportLine.impFinalS4 =="" ||this.meterReadingImportLine.impFinalS4 == undefined ){
    this.lineValidationErrors +="ImportFinalC4 is missing";
  }
  else if(this.meterReadingImportLine.impFinalS5 == null || this.meterReadingImportLine.impFinalS5 =="" ||this.meterReadingImportLine.impFinalS5 == undefined ){
    this.lineValidationErrors +="ImportFinalC5 is missing";
  }
  else if(this.meterReadingImportLine.expFinalS1 == null || this.meterReadingImportLine.expFinalS1 =="" ||this.meterReadingImportLine.expFinalS1 == undefined ){
    this.lineValidationErrors +="ExportFinalC1 is missing";
  }
  else if(this.meterReadingImportLine.expFinalS2 == null || this.meterReadingImportLine.expFinalS2 =="" ||this.meterReadingImportLine.expFinalS2 == undefined ){
    this.lineValidationErrors +="ExportFinalC2 is missing";
  }
  else if(this.meterReadingImportLine.expFinalS3 == null || this.meterReadingImportLine.expFinalS3 =="" ||this.meterReadingImportLine.expFinalS3 == undefined ){
    this.lineValidationErrors +="ExportFinalC3 is missing";
  }
  else if(this.meterReadingImportLine.expFinalS4 == null || this.meterReadingImportLine.expFinalS4 =="" ||this.meterReadingImportLine.expFinalS4 == undefined ){
    this.lineValidationErrors +="ExportFinalC4 is missing";
  }
  else if(this.meterReadingImportLine.expFinalS5 == null || this.meterReadingImportLine.expFinalS5 =="" ||this.meterReadingImportLine.expFinalS5 == undefined ){
    this.lineValidationErrors +="ExportFinalC5 is missing";
  }
  // else if(this.meterReading.rKvahFinal > this.meterReadingImportLine.impRkvahFinal){
  //   this.lineValidationErrors +="Error in Rkvah units please check";
  // }
 
   
   if (this.lineValidationErrors==""){
     return true;
   }
   else
     return false;
 }

  addMeterReadingImportLines() {
    if(this.isLineDataValid()){
      if (!this.meterReadingImport.meterReadingImportLines) {
        this.meterReadingImport.meterReadingImportLines = [];
      }
      this.meterReadingImport.readingMonthCode =this.meterReadingImportLine.readingMonthCode;
      this.meterReadingImport.readingYear = this.meterReadingImportLine.readingYear;
      this.monthConvertor();
      this.formatChangesforLinesDB();
      this.meterReadingImport.meterReadingImportLines.push(Object.assign({}, this.meterReadingImportLine));

      // this.initMeterReadingImportLines();

    }else{
      alert(this.lineValidationErrors)
    }
  }

  updateMeterReadingImportLines() {
    if(this.isLineDataValid()){
      var tempArray = [];
      this.monthConvertor();
      this.formatChangesforLinesDB();
      for (var index = 0; index < this.meterReadingImport.meterReadingImportLines.length; index++) {
        if (this.meterReadingImportLineRowIndex == index) {
          tempArray.push(Object.assign({}, this.meterReadingImportLine));
        }
        else {
          tempArray.push(this.meterReadingImport.meterReadingImportLines[index]);
        }

      }
      this.meterReadingImport.meterReadingImportLines = tempArray;
      this.initMeterReadingImportLines();

    }else{
      alert(this.lineValidationErrors)
    }
  }


  editMeterReadingImportLines(_index: number) {
    this.meterReadingImportLineRowIndex = _index;
    this.meterReadingImportLine = Object.assign({}, this.meterReadingImport.meterReadingImportLines[_index]);
  }

  deleteMeterReadingImportLines(_index: number) {
    this.meterReadingImport.meterReadingImportLines.splice(_index, 1);
  }

  searchResults() {
    console.log(this.searchcompanyServiceNumber,this.searchMonth,this.searchYear);
    this.service.getMeterReading(this.searchcompanyServiceNumber,'','', this.searchMonth, this.searchYear, '','','').subscribe(
      _es => {
        this.rows = _es;
        console.log(this.rows)
        this.rows.forEach(element => {
          this.meterId=[];
          this.meterId.push(element.id);
          });
        // if(this.rows.length == 0){
        //   this.accessProcessFlag = false;
        //   alert("No Meter Reading Available for the service("+this.searchcompanyServiceNumber+") in "+this.searchMonth+"-"+this.searchYear);          
        //   return false;
        // }
        this.sample = this.meterId;
        this.service.getMrById(this.meterId).subscribe(_mr => {
          this.meterReading = _mr;
          this.accessProcessFlag= true;
          console.log(this.meterReading);
          // this.meterReading.meterReadingSlot.forEach(element => {
          //   this.importFinal.push(element.impFinal);
          //     // this.meterId = element.id;
          //     console.log(this.importFinal)
          //   });
            // this.slot1 = this.importFinal[0];
            // this.slot2 = this.importFinal[1];
            // this.slot3 = this.importFinal[2];
            // this.slot4 = this.importFinal[3];
            // this.slot5 = this.importFinal[4];
            // console.log(this.slot1,this.slot2,this.slot3,this.slot4,this.slot5)
        });
      });
      
  }

  getPerviousMonth(){
    var monthStr = this.meterReadingImportLine.readingMonthCode;
    var yearStr = this.meterReadingImportLine.readingYear;
    var month = +monthStr;
    var year = +yearStr;
    this.firstDay = new Date(year, month, 1);
    var previousMonth = new Date(this.firstDay);
    previousMonth.setMonth(this.firstDay.getMonth()-1);
    var utc = previousMonth.toJSON().slice(0,10).replace(/-/g,'/');
    var previousMonthValue = utc.substr(5,2);
    return previousMonthValue ;
  }
 
///To allow number only
numberFormat(event){
  this.commonService.numberOnly(event)
}

}