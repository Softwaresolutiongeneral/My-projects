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
  selector: 'import-energy-charges-report',
  templateUrl: './import-energy-charges-report.html',
})

export class ImportenergychargesComponent implements OnInit {
    stmtMonth: string;
    stmtYear: string;
  edc: any;
  dispOrgCode: any;
  disableEdc: boolean;
  
  edcList: any;
  months: { value: string; name: string; }[];
  rows: any;
  years=[];
  sub: any;
  tempOrgId: any; 

    constructor(private datePipe: DatePipe,private router: Router,private service:ReportService, private commonService:CommonService,private excelService: ExcelExportService) { 

    }
    ngOnInit() {
      console.log(CommonUtils.getLoginUserEDC());
        this.edc = CommonUtils.getLoginUserEDC();
        console.log(this.edc.id);
        
        this.years = this.commonService.fetchYearList();
    
      if (this.edc != "") {
        console.log("in edc select")
        this.dispOrgCode = this.edc;
        this.disableEdc = true;
      }
      this.fetchMonths();
      this.fetchOrgList();
      
    }

    searchResults(){
      let genRptInput:GenericReportInput = new GenericReportInput();
      genRptInput.reportName = 'IMPORT-ENERGY-CHARGE REPORT';     

        if(this.stmtMonth != "" && 
      this.stmtMonth != null)
        genRptInput.ip2 = this.stmtMonth

        if(this.stmtYear != "" && 
      this.stmtYear != null)
        genRptInput.ip3 = this.stmtYear

        
        if(this.dispOrgCode != "" && 
      this.dispOrgCode != null)
        genRptInput.ip1 = this.dispOrgCode 
      
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

   

    exportAsXLSX():any {
      let str = JSON.stringify(this.rows);
      str = str.replace(/\"op1\":/g, "\"SERVICENO\":");
      str = str.replace(/\"op2\":/g, "\"YEAR\":");
      str = str.replace(/\"op3\":/g, "\"MONTH\":");
      str = str.replace(/\"op4\":/g, "\"CIRCLENAME\":");
      str = str.replace(/\"op6\":/g, "\"IECRATE\":");
      str = str.replace(/\"op7\":/g, "\"ETAX\":");
      
      
      this.rows = JSON.parse(str);
    
      this.rows.forEach(x =>{
        delete x.$$index;
        delete x.op10;delete x.op11;delete x.op12;delete x.op5;delete x.op8;delete x.op9;
        delete x.op13;delete x.op14;delete x.op15;delete x.op16;delete x.op17;delete x.op18;delete x.op19;delete x.op20;
        delete x.op21;delete x.op22;delete x.op23;delete x.op24;delete x.op25;delete x.op26;delete x.op27;delete x.op28;
        delete x.op29;delete x.op30;delete x.op31;delete x.op32;delete x.op33;delete x.op34;delete x.op35;delete x.op36;
        delete x.op37;delete x.op38;delete x.op39;delete x.op40;delete x.op41;
      });
    
    this.excelService.exportAsExcelFile(this.rows, 'AMR DOWNLODE STATUS REPORT');
    this.searchResults();
    }
reset() {
  let currentUrl = this.router.url;
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate([currentUrl]);
  });
}

}
