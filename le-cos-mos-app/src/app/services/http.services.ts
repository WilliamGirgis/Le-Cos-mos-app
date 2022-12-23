import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

constructor(private http:HttpClient) { }


loginClient(email:string,password:string):Observable<any> {
  return this.http.post('http://localhost:4200/user/users/login', {
    email,
    password
  },{
    observe:'response'
  })
}




}
