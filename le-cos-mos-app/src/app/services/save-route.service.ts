import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveRouteService {


  constructor() {

  }

  saveRoute(route:string) {

    if(route != `/${localStorage.getItem('user-type')!!.toLowerCase()}/preferences`)
    this.savedRoute = route
  }





  savedRoute:string = `/${localStorage.getItem('user-type')!!.toLowerCase()}/home` // Default route in case of reloading on the page on "preference" route



}
