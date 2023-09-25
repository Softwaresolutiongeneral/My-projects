import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { ReportService } from '../../services/report.service';
import { CommonService } from '../../../shared/common/common.service';
import { GenericReportInput } from '../../vo/GenericReportInput';
import { DatePipe, DOCUMENT } from '@angular/common';
import { saveAs } from 'file-saver';
import { ExcelExportService } from '../../../shared/services/excelExport';
import { CommonUtils } from '../../../shared/common/common-utils';
import { Router } from '@angular/router';


@Component({
  selector: 'meter-change-report-enterednow',
  templateUrl: './meter-change-report-enterednow.component.html',
//   styleUrls: ['./consolidate-energy-adjustment-report.component.scss']
})

export class MeterChangeReportenterednowComponent implements OnInit {
    stmtMonth: string;
    stmtYear: string;

    flowTypes = [
      { "key": "STB", "name": "SALE-TO-BOARD" },
      { "key": "IS-CAPTIVE", "name": "CAPTIVE" },
      { "key": "THIRD-PARTY", "name": "THIRD-PARTY" }
    ]
  edc: any;
  dispOrgCode: any;
  disableEdc: boolean;
  fuelTypeCode: string;
  edcList: any;
  months: { value: string; name: string; }[];
  fuelTypes: any;
  rows: any;
  years=[];

    constructor(private datePipe: DatePipe,private router: Router,private service:ReportService, private commonService:CommonService,private excelService: ExcelExportService) { 

    }
    ngOnInit() {
      console.log(CommonUtils.getLoginUserEDC());
        this.edc = CommonUtils.getLoginUserEDC();
        this.years = this.commonService.fetchYearList();
    
      if (this.edc != "") {
        console.log("in edc select")
        this.dispOrgCode = this.edc;
        this.disableEdc = true;
      }
      this.fetchMonths();
      this.fetchOrgList();
     // this.fetchFuelTypes();
    }

    searchResults(){
      let genRptInput:GenericReportInput = new GenericReportInput();
      genRptInput.reportName = 'Meter-change-reportenterednow';     

        if(this.stmtMonth != "" && 
      this.stmtMonth != null)
        genRptInput.ip1 = this.stmtMonth

        if(this.stmtYear != "" && 
      this.stmtYear != null)
        genRptInput.ip2 = this.stmtYear

      

        if(this.dispOrgCode != "" && 
      this.dispOrgCode != null)
        genRptInput.ip3 = this.dispOrgCode 
      
        console.log(genRptInput)

        this.service.getGenericReport(genRptInput).subscribe(x=>{
          this.rows=x;
          console.log(genRptInput)
          console.log(this.rows)
      })

      console.log(genRptInput.reportName);
      console.log(genRptInput.ip1);
      console.log(genRptInput.ip2);
      console.log(genRptInput.ip3);
//      console.log(genRptInput.ip4);
    }

    fetchMonths(){
      this.months = this.commonService.fetchMonths();
      console.log(this.months)
    }

    fetchOrgList() {
      this.commonService.fetchEDCs().subscribe(
        result => {
          this.edcList = result;
          console.log(this.edcList)
        },
        error => {
          console.error('Error loading states!');
          console.error(error);
        }
      );
    }

//     fetchFuelTypes(){
//       this.commonService.fetchCodes("FUEL_TYPE_CODE").subscribe(x=>{
//       this.fuelTypes=x;
//       console.log(this.fuelTypes)
//   })
// }

exportAsXLSX(): any {
  this.rows.forEach(element => {       
    element.op5=this.datePipe.transform(element.op5,'dd-MM-yyyy');
  });

  let str = JSON.stringify(this.rows);
  str = str.replace(/\"op1\":/g, "\"SERVICE NO\":");
  str = str.replace(/\"op2\":/g, "\"OLD METER NO\":");
  str = str.replace(/\"op3\":/g, "\"NEW METER NO\":");
  str = str.replace(/\"op4\":/g, "\"METERCHANGE_DONE ON\":");
  str = str.replace(/\"op5\":/g, "\"METERCHANGE_ENETERED_ON\":");
  this.rows = JSON.parse(str);

  this.excelService.exportAsExcelFile(this.rows, 'Meter-change-reportenterednow');
  this.searchResults();
}

reset() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}
}
