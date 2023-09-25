import { Injectable } from '@angular/core';
import { Http, Response,ResponseContentType,Headers} from '@angular/http';
import{CommonService} from '../../../shared/common/common.service';
import { environment } from '../../../../environments/environment';

@Injectable()
export class AppraisalReivewService {
    constructor(
        private http:Http,
        private commonService:CommonService
    ) { }
    baseUrl: string = environment.serviceApiUrl;

    getAllMetrics(){
        return this.http.get(environment.serviceApiUrl+'master/metrics',this.commonService.jwt()).map((response: Response) => response).map(res => res.json());
    }

    getFyYears(){
        return this.http.get(environment.serviceApiUrl + 'seed/fiscal-years', this.commonService.jwt()).map((response: Response) => response).map(res => res.json()); 
    } 

    // getAppraisalByFyId(fyId){
    //     return this.http.get(environment.serviceApiUrl + 'transaction/appraisals/'+fyId+'/hdr', this.commonService.jwt()).map((response: Response) => response).map(res => res.json()); 
    // }

    // getAppraisalByFyIdAndEmpId(fyId,empId){
    //     return this.http.get(environment.serviceApiUrl + 'transaction/appraisals/'+fyId+'/'+empId, this.commonService.jwt()).map((response: Response) => response).map(res => res.json()); 
    // }

    getAppraisalByFisYearId(fiscalYearId){
        return this.http.get(environment.serviceApiUrl +'transaction/appraisal-setting/'+fiscalYearId+'/fiscal-year-id',this.commonService.jwt()).map((response: Response) => response).map(res => res.json());
    }
    getAppraisalsReview() {
        return this.http.get(environment.serviceApiUrl + 'transaction/appraisals/reviews', this.commonService.jwt()).map((response: Response) => response).map(res => res.json()); 
    } 
    updateAppraisalByAction(id,action,appraisal) {
        return this.http.patch(environment.serviceApiUrl+'transaction/appraisals/'+id+'/review/'+action,appraisal, this.commonService.jwt()).map((response: Response) => response).map(res => res.json());
    }
    getAppraisalFyCodeReview(fyCode) {
        return this.http.get(environment.serviceApiUrl + 'transaction/appraisals/'+fyCode+'/search', this.commonService.jwt()).map((response: Response) => response).map(res => res.json()); 
    } 

    advanceSearch(empId,metricId,reviewTypeCode) {
        var url = 'transaction/appraisals/advance-filters?' 
        
        if(empId!=null){
            url= url+'&&empId='+empId   
        }
        if(metricId!=null){
            url= url+'&&metricId='+metricId   
        }
        if(reviewTypeCode!=null){
            url= url+'&&reviewTypeCode='+reviewTypeCode   
        }  
        return this.http.get(this.baseUrl + url , this.commonService.jwt()).map((response: Response) => response).map(res => res.json());
    }

}