import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
 
  login(user:any):Observable<any>{
    // user=JSON.stringify(user);
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });
      const url=environment.commonUrl+"api/auth/signin";
      return this.http.post(url, user, { headers }).pipe(
        map((response:any) => {
          localStorage.setItem("token", response.accessToken);
          localStorage.setItem("role", response.roles[0]);
             this.router.navigate(['/admin/home']);
          return response;
        }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Handle the 401 error here, for example, by displaying an error message or redirecting to the login page.
          console.log('Unauthorized request');
          return 'x';
        }
        return throwError(error); // Re-throw the error to propagate it further.
      })
      );
  }


}
