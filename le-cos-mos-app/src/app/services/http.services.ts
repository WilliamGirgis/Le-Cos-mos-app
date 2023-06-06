import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

   static isAdmin:boolean = false
   static isEnseignant:boolean = false
constructor(private http:HttpClient) {


 }
  // Get the user info
  readonly getUserNameUrl = 'http://localhost:4200/user/user/get'
  user_id?: string = localStorage.getItem('user-id')!
  user?: any
  user_name?: string
  user_last_name?:string


loginClient(email:string,password:string):Observable<any> {
  return this.http.post('http://localhost:4200/user/users/login', {
    email,
    password
  },{
    observe:'response'
  })
}



public static getIsAdmin() {
  return HttpService.isAdmin
}
public static getIsEnseignant() {
  return HttpService.isEnseignant
}


}
