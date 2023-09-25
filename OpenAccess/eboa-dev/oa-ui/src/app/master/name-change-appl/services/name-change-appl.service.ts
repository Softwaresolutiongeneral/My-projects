import { Injectable,EventEmitter } from '@angular/core';
import { Http, Response, Headers, RequestOptions,ResponseContentType} from '@angular/http';
import { HttpClient, HttpRequest, HttpEvent,HttpHeaders } from '@angular/common/http';
import { Org } from '../../vo/org';
import { Gc } from '../../../grid-connectivity/services/gc';
import 'rxjs/add/operator/map';
import { environment } from '../../../../environments/environment';
import {CustomRequestOptions, CustomRequestOptionsforbank, CustomRequestOptionsforfile} from '../../../shared/common/common.service';
import { Observable } from 'rxjs';
import { DocumentList, NameChangeApplmodel } from '../../vo/nametransfer';
import { NameTransferPayment } from '../../vo/nametransferpayment';
import { Service } from '../../vo/company.v1';

@Injectable()
export class NameChangeApplService {
    
    
    result:string;
    gcEvent: EventEmitter<Gc> = new EventEmitter();
   
    constructor(private http: Http,private http1: HttpClient) {
    }
    setGc(gc: Gc) {
        this.gcEvent.emit(gc);

    }
    getGenDetailsByServiceNo(mCompServNumber: string): Observable<any>{
       // console.log(this.http.get(environment.serviceApiUrl+'/master/generatordetails/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json()));
        return this.http.get(environment.serviceApiUrl+'/master/generatordetails/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json());
    }
    getGenDetailsByServiceNoApplied(mCompServNumber: string): Observable<any>{
        // console.log(this.http.get(environment.serviceApiUrl+'/master/generatordetails/'+mCompServNumber,new CustomRequestOptions()).map(res => res.json()));
         return this.http.get(environment.serviceApiUrl+'/master/generatordetails/applied/'+mCompServNumber,new CustomRequestOptions()).map(res => res.text());
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
    

    fileReset(resetfile:DocumentList){
        let url = environment.serviceApiUrl + "/master/generatordetails/resetfile";  
       
        return this.http.post(url,resetfile,new CustomRequestOptions()).map(res => res.text());
       
    }

    submission(Applicationsubmit:NameChangeApplmodel){
        let url = environment.serviceApiUrl + "/master/generatordetails/Submit";  
       
        return this.http.post(url,Applicationsubmit,new CustomRequestOptions()).map(res => res.text());

    }

    Banklist(paybank:NameTransferPayment){
        let url = environment.integrationUrl + "noticeList/pay";  
       
        return this.http.post(url,paybank,new CustomRequestOptions()).map(res => res.json());

    }
    paymentprocess(Banklist: NameTransferPayment) {
        let url = environment.integrationUrl + "noticeList/processpayment";  
       
        return this.http.post(url,Banklist,new CustomRequestOptions()).map(res => res.text());
    }

    downloadpaymentReciept(applicaionid:string){
        const options = { responseType: ResponseContentType.Blob  };
        //let options = {responseType: ResponseContentType.ArrayBuffer };
        let url =environment.serviceApiUrl+'/report/print-doc/nametransferpayedBill';
        
        url = url + "?dummy=1";  

       
           url = url + "&applicationid=" +applicaionid;

        
        let headers = new Headers({ 'Content-Type': 'application/json' });

       return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
      
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
    downloadReciept(applicaionid:string){
        const options = { responseType: ResponseContentType.Blob  };
        //let options = {responseType: ResponseContentType.ArrayBuffer };
        let url =environment.serviceApiUrl+'/report/print-doc/nametransferbill';
        
        url = url + "?dummy=1";  

       
           url = url + "&applicationid=" +applicaionid;

        
        let headers = new Headers({ 'Content-Type': 'application/json' });

       return this.http.get(url, options).catch((err: Response) => Observable.throw(err.json()));
      
    }
    sendRequest(checkSum: string): Observable<any> {
        //const url = 'http://pg.tnebnet.org/awp/TNEB/htbankurl.php';
        const url = 'http://192.168.150.122/awp/TNEB/htbankurl.php';
        const headers = new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded'
        });
      
        const body = `Qin=${encodeURIComponent(checkSum)}`;
      
        return this.http.post(url, body, new CustomRequestOptionsforbank()).map(res => res.text());
      }
      
    //   openHtmlInNewTab(html: string) {
    //     const newTab = window.open();
    //     newTab.document.write(html);
    //     newTab.document.close();
    //   }
     
    savenewgendetails(newgendetail: Service,applid:string) {

        let url =environment.serviceApiUrl+'/master/generatordetails/SavenewGenDeatials';
        url = url + "?applid="+applid; 
        //return this.http.get(environment.serviceApiUrl+'/master/generatordetails/SavenewGenDeatials',new CustomRequestOptions()).map(res => res.json());
        return this.http.post(url,newgendetail,new CustomRequestOptions()).map(res => res.text());
    }
    getnewgendetails(applid:string) {

        let url =environment.serviceApiUrl+'/master/generatordetails/getnewGenDeatials';
        url = url + "?applid="+applid; 
        //return this.http.get(environment.serviceApiUrl+'/master/generatordetails/SavenewGenDeatials',new CustomRequestOptions()).map(res => res.json());
        return this.http.get(url,new CustomRequestOptions()).map(res => res.json());
    }



}
