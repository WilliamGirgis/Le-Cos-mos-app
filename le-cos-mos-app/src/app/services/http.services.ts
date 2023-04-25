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
  async getUsername():Promise<void> {
    const querParam = new HttpParams().set('id', this.user_id! ? this.user_id: localStorage.getItem('user-id')!);
     await Promise.resolve(this.http.get(this.getUserNameUrl, { params: querParam, responseType: 'text' }).pipe(map((data: any) => {
  let parsedArray = JSON.parse(data)
  console.log("GetUsername in bubule" + parsedArray)
      this.user_name = parsedArray.firstname
      this.user_last_name = parsedArray.lastname
      localStorage.setItem('fname',parsedArray.firstname);
      localStorage.setItem('lname',parsedArray.lastname)
    })).subscribe(res => { }))

  }

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

          if(user[i]._id == 'Admin') {
            HttpService.isAdmin = true
            HttpService.isEnseignant = false
          }
        }
      }
    })).subscribe((res) => {
    });
}

public static getIsAdmin() {
  return HttpService.isAdmin
}
public static getIsEnseignant() {
  return HttpService.isEnseignant
}


}
