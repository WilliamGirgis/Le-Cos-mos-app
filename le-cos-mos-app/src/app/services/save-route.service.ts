import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveRouteService {


  constructor() {

  }

  saveRoute(route:string) {

    if(route != '/admin/preferences')
    this.savedRoute = route
  }





  savedRoute:string = '/admin/home' // Default route in case of reloading on the page on "preference" route



}
