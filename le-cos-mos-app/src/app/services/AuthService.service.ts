import {
    HttpClient,
    HttpResponse,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { Router } from '@angular/router';
  import { catchError, shareReplay, tap } from 'rxjs/operators';
  import { HttpService } from './http.services';




  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    constructor(
      private http: HttpClient,
      private WebService: HttpService,
      private router: Router
    ) {}


    isConnected:Boolean = !!localStorage.getItem('user-id')

    login(email: string, password: string) {
      return this.WebService.loginClient(email, password).pipe( // Créer la fonction loginClient
        shareReplay(), // avoid users starting multiple execution of this method
        tap((res: HttpResponse<any>) => {
          this.setSession(
            res.body._id,
            res.headers.get('x-access-token')! , // '!' rajouté
            res.headers.get('x-refresh-token')! // '!' rajouté
          );
        })
      )
    }

    private setSession(id: string, accessToken: string, refreshToken: string) {
      localStorage.setItem('user-id', id);
      localStorage.setItem('access-Token', accessToken);
      localStorage.setItem('refresh-Token', refreshToken);
      this.isConnected = !!localStorage.getItem('user-id')
    }

    private removeSession() {
      localStorage.removeItem('user-id');
      localStorage.removeItem('access-Token');
      localStorage.removeItem('refresh-Token');
      this.isConnected = !!localStorage.getItem('user-id')
    }

    logout() {
      this.removeSession();
      this.router.navigate(['login']);
    }

    getAccessToken() {
      return localStorage.getItem('access-Token');
    }

    getNewAccessToken() {
      return this.http
        .get('http://localhost:4200/user/users/me/access-Token', {
          headers: {
            'x-refresh-token': localStorage.getItem('refresh-Token')!,// '!'' ajouté
            '_id': localStorage.getItem('user-id')!,// '!'' ajouté
          },
          observe: 'body', // 'response' changé en 'body'
        })
        .pipe(
          tap((res:any) => { // Suppression tu type ": HttpResponse<any>" et remplacé par 'any'
            this.setAccessToken(res.headers.get('x-access-token'));
          }),
          catchError((err: any) => {
            this.logout();
        //    window.location.reload();
            return err;
          })
        );
    }

    setAccessToken(token: string) {
      return localStorage.setItem('access-Token', token);
    }
  }
