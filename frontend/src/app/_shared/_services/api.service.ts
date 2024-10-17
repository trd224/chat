import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  post(api_endpoint: string, payload: any): Observable<any>{
    return this.http.post<any>(environment.apiUrl + api_endpoint, payload);
  }

  get(api_endpoint: string): Observable<any>{
    return this.http.get<any>(environment.apiUrl + api_endpoint);
  }


}

