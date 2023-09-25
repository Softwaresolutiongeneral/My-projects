import { Router } from "@angular/router";
import { CommonUtils } from "../../../shared/common/common-utils";
import { CommonService } from "../../../shared/common/common.service";
import { NameChangeApplmodel } from "../../../transaction/vo/nametransfer";
import { NameChangeApplService } from "../services/name-change-appl.service";
import { NameChangeApplListService } from "./name-change-app-list.service";
import { Component, OnInit, HostBinding,Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'name-change-appl-list',
    templateUrl: './name-change-app-list.component.html',
    //styleUrls:['./name-change-app.component.css'],
    providers: [NameChangeApplListService,NameChangeApplService]
  })
  export class NameChangeAppllistComponent implements OnInit{
    years = [
        { "value": "2018", "name": "2018" },
        { "value": "2019", "name": "2019" },
        { "value": "2020", "name": "2020" },
        { "value": "2021", "name": "2021" },
        { "value": "2022", "name": "2022" },
        { "value": "2023", "name": "2023" }
    
      ];

      nces = [
        { "value": "SUBMITTED", "name": "SUBMITTED" },
        { "value": "NOC-ISSUED-BY-EDC", "name": "NOC-ISSUED-BY-EDC" },
        { "value": "UNDER PROCESS BY NCES-AEE", "name": "UNDER PROCESS BY NCES-AEE" },
        { "value": "UNDER PROCESS BY NCES-EE", "name": "UNDER PROCESS BY NCES-EE" },
        { "value": "PAYMENT RAISED", "name": "PAYMENT RAISED" },
        { "value": "PAYMENT RECEIVED", "name": "PAYMENT RECEIVED" },
        { "value": "UNDER APPROVAL BY NCES-AEE", "name": "UNDER APPROVAL BY NCES-AEE" },
        { "value": "UNDER APPROVAL BY NCES-EE", "name": "UNDER APPROVAL BY NCES-EE" },
        { "value": "UNDER APPROVAL BY NCES-SE", "name": "UNDER APPROVAL BY NCES-SE" },
        { "value": "UNDER APPROVAL BY NCES-CE", "name": "UNDER APPROVAL BY NCES-CE" },
        { "value": "UNDER EE APPROVE FOR ORDER ISSUE", "name": "UNDER EE APPROVE FOR ORDER ISSUE" },
        { "value": "APPROVAL ISSUED", "name": "APPROVAL ISSUED" }
      ];
    
      edcstatus = [
        { "value": "SUBMITTED", "name": "SUBMITTED" },
        { "value": "NOC-ISSUED-BY-EDC", "name": "NOC-ISSUED-BY-EDC" }
      ];
    mOrgId: any;
    orgList: any;
    Status:string;
    months: { value: string; name: string; }[];
    Applications:[NameChangeApplmodel];
  UserName: any;
  edc: () => any;
  edcname: () => any;
  edcnameid: any;
  edcuser: boolean;
  isdfcuser: boolean;
    constructor(private commonService: CommonService,
        private commonUtils: CommonUtils,private router: Router,
        private service: NameChangeApplService) { }

    ngOnInit() {
        this.months = this.commonService.fetchMonths();
       
        this.UserName = CommonUtils.getLoginUserDetails();
        if(this.UserName.includes('DFC')){
          
          this.isdfcuser=true;
          this.getdfclist();
      }
        this.edcname=CommonUtils.getLoginUserEDC();
        this.fetchOrgList();
    } 
    fetchOrgList() {
        this.commonService.fetchEDCs().subscribe(
          result => {
            console.log(this.edcname);
            this.orgList = result;
            console.log(this.orgList);
            this.orgList.forEach(x => {
              if(x.id == this.edcname){
                console.log(x.name);
                this.edcuser =  true;
                this.edcnameid = x.id + "-" + x.name; 
              }

            })
            
          },
          error => {
            console.error('Error loading states!');
            console.error(error);
          }
        );
      }
getlist(){

    this.service.getApplicationlist(this.Status,this.edcname.toString()).subscribe(  
        res => {  
            console.log(res);
            this.Applications=res;
            console.log(this.Applications);

          
          
        },  
       
    );  

}

getdfclist(){

  this.service.getApplicationlistfordfc().subscribe(  
      res => {  
          console.log(res);
          this.Applications=res;
          console.log(this.Applications);

        
        
      },  
     
  );  

}
applicationview(serviceNo:string){

  try {


    this.router.navigateByUrl('name-change-appl/'+ serviceNo );


  }
  catch (e) {
    console.log(e);
  }
}



  }