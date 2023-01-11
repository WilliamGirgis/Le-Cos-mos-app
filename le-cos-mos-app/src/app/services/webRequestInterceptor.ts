import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
  } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { EMPTY, Observable, throwError } from 'rxjs';
  import { catchError, switchMap, tap } from 'rxjs/operators';
  import { AuthService } from './AuthService.service';
import { LogSaveService } from './log.save.service';

  @Injectable({
    providedIn: 'root',
  })
  export class WebReqInterceptorService implements HttpInterceptor {
    refreshingAccesstoken: boolean | undefined; // undefnied rajouté

    constructor(private authService: AuthService,private logService:LogSaveService) {}
    intercept(
      req: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
      req = this.addAuthHeader(req);
      return next.handle(req).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401 && !this.refreshingAccesstoken) {
            return this.refreshAccessToken().pipe(
              switchMap(() => {
                req = this.addAuthHeader(req);

                return next.handle(req);
              }),
              catchError((err: any) => {
                return EMPTY;
              })
            );
          }
          return throwError(error);
        })
      );
    }

    refreshAccessToken() {
      this.refreshingAccesstoken = true;
      return this.authService.getNewAccessToken().pipe(
        tap(() => {
          this.refreshingAccesstoken = false;
         // console.log('Access-Token refreshed!');
        })
      );
    }

    addAuthHeader(request: HttpRequest<any>) {
      const token = this.authService.getAccessToken();
      if (token) {
        // If the token has not expired (if it has a value)
        return request.clone({
          setHeaders: {
            // we send the current access-token in headers for verifying. Check the Autenticate middleware in users.js routes api
            'x-access-token': token,
          },
        });
      }
      return request;
    }


  }
