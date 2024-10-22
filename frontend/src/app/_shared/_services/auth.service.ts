import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, of } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  private currentUserSubject: BehaviorSubject<any>;
  currentUser: any;

  constructor(private http: HttpClient) { 
    if (typeof window !== 'undefined' && localStorage) {
      this.user = localStorage?.getItem('user');
      this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.user));
    } else {
      this.currentUserSubject = new BehaviorSubject<any>(null);
    }
    this.currentUser = this.currentUserSubject.asObservable();
  
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }


  signup(api_endpoint: string, payload: any): Observable<any>{
    return this.http.post(environment.apiUrl + api_endpoint, payload);
  }

  login(api_endpoint: string, payload: any): Observable<any>{
    return this.http.post(environment.apiUrl + api_endpoint, payload).pipe(
      map((user:any) => {
        if(user && user?.token){
          localStorage.setItem("user", JSON.stringify(user));
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


