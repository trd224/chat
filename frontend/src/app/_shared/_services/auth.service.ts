import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any = localStorage.getItem("user");
 
  private currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.user));
  currentUser = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) { 
   
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  signup(api_endpoint: string, payload: any): Observable<any>{
    return this.http.post(environment.baseUrl + api_endpoint, payload);
  }

  login(api_endpoint: string, payload: any): Observable<any>{
    console.log(api_endpoint)
    console.log(payload)
    return this.http.post(environment.baseUrl + api_endpoint, payload).pipe(
      map((user:any) => {
        if(user && user?.token){
          localStorage.setItem("user", JSON.stringify(user));
          //console.log("1111111111111111111111111111111111111");
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  
  logout(): Observable<any> | null {
    localStorage.removeItem('user');
    if(this.currentUserSubject){
      this.currentUserSubject.next(null);
    }
    return of(null);
    
}


}


