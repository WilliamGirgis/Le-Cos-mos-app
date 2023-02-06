import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

   static isAdmin:boolean = false
   static isEnseignant:boolean = false
constructor(private http:HttpClient) { }

loginClient(email:string,password:string):Observable<any> {
  return this.http.post('http://localhost:4200/user/users/login', {
    email,
    password
  },{
    observe:'response'
  })
}

public  async getUserType(){
  let querParam = new HttpParams().set('id', ' ');
  this.http
    .get('http://localhost:4200/user/users/id', {
      params: querParam,
      responseType: 'text',
    })
    .pipe(map((data) => {
      let user = JSON.parse(data)
      for(let i = 0; i < user.length;i++) {
        if(user[i]._id == localStorage.getItem('user-id')) {
          localStorage.setItem('user-type',user[i].userType)
        }
      }
    })).subscribe((res) => {
    });
}

}
