import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
//import { HttpClient, HttpRequest, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Org } from '../../vo/org';
import { Gc } from '../../../grid-connectivity/services/gc';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions, CustomRequestOptionsforfile} from '../../../shared/common/common.service';
import { Observable } from 'rxjs';
//import { DocumentList, NameChangeApplmodel } from '';
import { DocumentList, billPayment } from '../../../transaction/vo/nametransfer';
import { NameChangeApplmodel } from '../../../transaction/vo/nametransfer';

@Injectable()
export class NameChangeApplService {
    result:string;
    gcEvent: EventEmitter<Gc> = new EventEmitter();
   
    constructor(private http: Http) {
    }
    setGc(gc: Gc) {
        this.gcEvent.emit(gc);

    }

    getGenDetailsByServiceNofordfc(applid: string): Observable<any>{
       
         return this.http.get(environment.serviceApiUrl+'/master/generatordetails/dfc/'+applid,new CustomRequestOptions()).map(res => res.json());
     }
    getGenDetailsByServiceNo(mCompServNumber: string): Observable<any>{
       // console.log(this.http.get(environment.serviceApiUrl+'/master/generatordetails/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json()));
        return this.http.get(environment.serviceApiUrl+'/master/generatordetails/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json());
    }
    // getTradeData(sellerCompServiceNumber:string){
    //     return this.http.get(environment.serviceApiUrl+'/master/generatorhis/trade/'+sellerCompServiceNumber,new CustomRequestOptions()).map(res => res.json());
    // }
    // getGeneratorDetail(mCompServNumber: string){

    //     return this.http.get(environment.serviceApiUrl+'/master/generatorhis/detail/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json());
    // }

    uploadFile( file: File,documnetdetails: DocumentList) : Observable<any>  
    {  
        console.log(documnetdetails);
      let url = environment.serviceApiUrl + "/master/generatordetails/upload/?documentname="
       +documnetdetails.docName+"&documentcode="+documnetdetails.docCode+
       "&documentuplodedby="+documnetdetails.createdBy+"&applicaionid="+documnetdetails.applicationId ;  
       
      const formdata: FormData = new FormData();  
      
      formdata.append('file', file); 
       
       return this.http.post(url,formdata,new CustomRequestOptionsforfile()).map(res => res.text());
   
    }  
    uploadOrderCopy( file: File,doccode:string,applicationid:String) : Observable<any>  
    {  
        
      let url = environment.serviceApiUrl + "/master/generatordetails/uploadOrderCopy/?applicaionid="+applicationid+"&doccode="+doccode;  
       
      const formdata: FormData = new FormData();  
      
      formdata.append('file', file); 
       
       return this.http.post(url,formdata,new CustomRequestOptionsforfile()).map(res => res.text());
   
    }  

    save ( finalbuyerdetials:any,applicationdetails:NameChangeApplmodel){
        let url = environment.serviceApiUrl + "/master/generatordetails/save?applid="+
        applicationdetails.id+"&sellerserviceno="+applicationdetails.serviceNo+
        "&sellerserviceid="+applicationdetails.serviceId;


        return this.http.post(url,finalbuyerdetials,new CustomRequestOptions()).map(res => res.text());
    }

    savedetails(applicationdetls:NameChangeApplmodel): Observable<any>{

        let url = environment.serviceApiUrl + "/master/generatordetails/savedetails";  
 let test ="testing";
        return this.http.post(url,applicationdetls,new CustomRequestOptions()).map(res => res.text());



    }
    downloadOrderCopy(Applicationid:String,doccode:String){
        const options = { responseType: ResponseContentType.Blob  };
        //let options = {responseType: ResponseContentType.ArrayBuffer };
        let url =environment.serviceApiUrl+'/master/generatordetails/print-doc/OrderCopy';
        
        url = url + "?dummy=1";  

        if (Applicationid != "" && Applicationid !=undefined) {
           url = url + "&applicationid=" + Applicationid;
            }
            if (doccode != "" && doccode !=undefined) {
                url = url + "&doccode=" + doccode;
                 }
     
           

        
        let headers = new Headers({ 'Content-Type': 'application/json' });

      // return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
       return this.http.get(url, options).map(
        (res) => {
            return new Blob([res.blob()], { type: 'application/pdf' });
        });
    }
    downloadedoc(documentdetails:DocumentList){
        const options = { responseType: ResponseContentType.Blob  };
        //let options = {responseType: ResponseContentType.ArrayBuffer };
        let url =environment.serviceApiUrl+'/report/print-doc/nametransferDoc';
        
        url = url + "?dummy=1";  

        if (documentdetails.applicationId != "" && documentdetails.applicationId !=undefined) {
           url = url + "&applicationid=" + documentdetails.applicationId;
            }

            if (documentdetails.createdBy != undefined) {
                url = url + "&createfBy=" + documentdetails.createdBy;
            }
            if (documentdetails.createdDate != undefined) {
                url = url + "&createdDate=" + documentdetails.createdDate;
            }
            if (documentdetails.docCode != undefined) {
                url = url + "&docCode=" + documentdetails.docCode;
            }
            if (documentdetails.docDesc != undefined) {
                url = url + "&docDesc=" + documentdetails.docDesc;
            }
            if (documentdetails.docName != undefined) {
                url = url + "&docName=" + documentdetails.docName;
            }
            if (documentdetails.id != undefined) {
                url = url + "&docid=" + documentdetails.id;
            }
            if(documentdetails.isUploaded !=undefined){
               url = url + "&isuploaded=" + documentdetails.isUploaded

            }

        
        let headers = new Headers({ 'Content-Type': 'application/json' });

      // return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
       return this.http.get(url, options).map(
        (res) => {
            return new Blob([res.blob()], { type: 'application/pdf' });
        });
    }

    ResetOrderCopy(applicationid:string){
        let url = environment.serviceApiUrl + "/master/generatordetails/resetOrderCopy?applicaionid="+applicationid;  
        
        return this.http.get(url,new CustomRequestOptions()).map(res => res.text());
       
    }
    fileReset(resetfile:DocumentList){
        let url = environment.serviceApiUrl + "/master/generatordetails/resetfile";  
       
        return this.http.post(url,resetfile,new CustomRequestOptions()).map(res => res.text());
       
    }

    submission(Applicationsubmit:NameChangeApplmodel){
        let url = environment.serviceApiUrl + "/master/generatordetails/Submit";  
       
        return this.http.post(url,Applicationsubmit,new CustomRequestOptions()).map(res => res.text());

    }

    getApplicationlistfordfc(){

        let url = environment.serviceApiUrl+"master/generatordetails/getallappl/fordfc";
       
        return this.http.get(url,new CustomRequestOptions()).map(res => res.json())
    }
    getApplicationlist(status:string,orgid:string){

        let url = environment.serviceApiUrl+"master/generatordetails/getallappl";
       url =url+ '?status='+status+'&orgid='+orgid;
        return this.http.get(url,new CustomRequestOptions()).map(res => res.json())
    }
    ncesapprove(ApplicationId : string,userstage: string){
        let url = environment.serviceApiUrl+"master/generatordetails/necesapprove";
        url =url+ '?userstage='+userstage;
        return this.http.post(url,ApplicationId,new CustomRequestOptions()).map(res => res.text())
    }
    
    raisepayment(ApplicationId : string){
        let url = environment.serviceApiUrl+"master/generatordetails/raisePayment";
        url =url+ '?applicationId='+ApplicationId;
        return this.http.get(url,new CustomRequestOptions()).map(res => res.text())

    }



    downloadpaymentReciept(applicaionid:string){
        const options = { responseType: ResponseContentType.Blob  };
        //let options = {responseType: ResponseContentType.ArrayBuffer };
        let url =environment.serviceApiUrl+'/report/print-doc/nametransferbill';
        
        url = url + "?dummy=1";  

       
           url = url + "&applicationid=" +applicaionid;

        
        let headers = new Headers({ 'Content-Type': 'application/json' });

       return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
      // return this.http.get(url, options).map(
        //(res) => {
         //   return new Blob([res.blob()], { type: 'application/pdf' });
        //});
    }

    returnApplication(ApplicationId : string,remarks : string){
        let url = environment.serviceApiUrl+"master/generatordetails/returnapplication";
        url =url+ '?applicationId='+ApplicationId +'&applremarks='+remarks; 
        return this.http.get(url,new CustomRequestOptions()).map(res => res.text())

    }
  savepayment(paymentdetails:Array<billPayment>){
    let url = environment.serviceApiUrl+"master/generatordetails/savepayment";
   let body = paymentdetails;
    return this.http.post(url,body,new CustomRequestOptions()).map(res => res.text())
    
  }
  downloadpayedReciept(applicaionid:string){
    const options = { responseType: ResponseContentType.Blob  };
    //let options = {responseType: ResponseContentType.ArrayBuffer };
    let url =environment.serviceApiUrl+'/report/print-doc/nametransferpayedBill';
    
    url = url + "?dummy=1";  

   
       url = url + "&applicationid=" +applicaionid;

    
    let headers = new Headers({ 'Content-Type': 'application/json' });

   return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
  
}


}
