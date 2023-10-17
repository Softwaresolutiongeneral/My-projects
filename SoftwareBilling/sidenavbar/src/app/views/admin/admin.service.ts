import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  token=localStorage.getItem("token");
  tokenHeader='Bearer-'+this.token;
  private jwt() {
   
    let headers = new HttpHeaders({ 'Accept': 'application/json','Authorization':this.tokenHeader });
    let options = {
        headers: headers
     }
  return options;
  }

  constructor(private http: HttpClient,private router:Router) { }

  getRoleID(name: string): Observable<any> {
    const url = environment.commonUrl + "api/test/roles/" + name;
    return this.http.get(url, this.jwt());
  }

  getMenu(id:number){
    const url= environment.commonUrl+"api/test/menu/"+id;
    return this.http.get(url, this.jwt());
  }

}
