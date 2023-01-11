import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Log } from '../shared/log';

@Injectable({
  providedIn: 'root'
})
export class LogSaveService {

  constructor(private http:HttpClient) { }


  saveLog(log?:Log):Observable<any> {
    return this.http.post('http://localhost:4200/log/save', {
     _id:log?.UserID,
     action:log?.action,
     date:log?.date // log
    },{
      observe:'response'
    })
  }
}
