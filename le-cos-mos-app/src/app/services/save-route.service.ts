import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SaveRouteService {

  
  constructor(  private router:Router) { 
    this.router.events.subscribe((res:any) => {
      if(this.router.url == '/admin/preferences') {
        return null
      } else {

        // Every route changes detections, we save it
        this.savedRoute = this.router.url.replace(/%20/g,' ').replace(/%C3%A8/g,'è')
        return  null
      }
 

    })

  }




  savedRoute:string = '/admin/home' // Default route in case of reloading on the page on "preference" route



}
