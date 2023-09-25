import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../shared/common/common.service';
import { SkillMatrixRequestHdr } from '../../vo/skill-matrix';
import { SkillAnalysisService } from '../skill-analysis.service';

@Component({
    selector: '',
    templateUrl: 'skill-analysis-list.componet.html'
})

export class SkillAnalysisListComponent implements OnInit {
    alertMessage="";
    constructor(
        private service:SkillAnalysisService,
        private router:Router,
        private commonService: CommonService
    ) { }

    skillHdrs:any=[];
    skillHdr:Array<SkillMatrixRequestHdr>=[];
    page :number = 1;
    pageSize :number = 10;

    ngOnInit() {
        
        this.service.getskillHdr().subscribe(x=>this.skillHdrs=x);        
     }

     detailRouting(view,key){
        this.router.navigateByUrl('/transaction/skill-analysis/'+view+'/'+key);
     }
     generatePdf(x){
        if(x.docId==null){
            if(x.processType=="gap-analysis"){
               x.type="GAP-ANALYSIS";
               this.service.getDoc(x.type,x.key).subscribe(x=>this.skillHdr=x);
               console.log("id generated forGAP-ANALYSIS");
               
           }
           else{
               x.type="ENG-ASSESSMENT";
               this.service.getDoc(x.type,x.key).subscribe(x=>this.skillHdr=x);
               //console.log(x);
               console.log("id generated for ENG-ASSESSMENT");
               
           }
           }
     }

     downloadPdf(x){
      if(x.docId==null){
       this.ngOnInit();
        }
       if(x.docId!=null || x.docId!=undefined){
           this.commonService.downloadDocument(x.docId,"");
        }else{
            this.alertMessage="No document mapped";
        }
     }

}