import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileObserverService {


  getImage(imageUrl: string): Observable<Blob> { // remplacer 'any' par Promise<
    return this.http
        .get(imageUrl, { responseType: "blob" }).pipe(map((res:Blob) => res))

}

  constructor(private http:HttpClient) { }
}
