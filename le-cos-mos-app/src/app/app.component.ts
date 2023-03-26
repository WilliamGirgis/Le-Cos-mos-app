import { Component } from '@angular/core';

import {trigger, transition, style, animateChild, group, animate,query } from '@angular/animations';
import { RouterOutlet } from '@angular/router';
import { HttpService } from './services/http.services';




  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [trigger('shade', [
    transition('* => *', [
      query(':enter', [
        style({
          opacity: 0,

        }),
        animate('1000ms ease-in-out', style({ opacity: 1 }))// Fin de l'animation à l'entrer
      ], { optional: true })
    ]),
  ])]
})
export class AppComponent {
  title = 'le-cos-mos-app';
  constructor(private httpService:HttpService) {
    if(localStorage.getItem('user-id')!!) {
      this.httpService.getUserType()

    }
  }


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
