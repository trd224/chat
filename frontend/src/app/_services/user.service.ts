import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  

  constructor(private http: HttpClient) { 
  }

  getCurrentUser(){
    return this.http.get(`${environment.apiUrl}user/current`);
  }



}
