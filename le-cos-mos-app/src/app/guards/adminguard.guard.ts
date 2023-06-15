import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminguardGuard implements CanActivate {
  constructor(private router:Router,private http:HttpClient){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
return this.checkAdmin()
  }

  readonly checkAdminUrl = 'http://localhost:4200/user/admin/check'
  async checkAdmin():Promise<boolean> {
    const params = new HttpParams().set('_id',localStorage.getItem('user-id')!)
        return await new Promise((resolve,reject) =>{
          this.http.get(this.checkAdminUrl,{params:params,responseType:'text'}).pipe(map((data) =>{
            if(data == 'OK') {
              resolve(null)
            } else {
              reject(null)
            }

          }),catchError((e) =>{
            reject(null)
            return e
          })).subscribe((result) =>{

          })
        }).then((resolved) =>{
          return true
        }).catch((rejected) =>{
          this.router.navigate(['/login']);
          return false
        })
      }

}
