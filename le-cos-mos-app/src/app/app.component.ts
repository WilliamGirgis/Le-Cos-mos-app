import { Component, HostBinding } from '@angular/core';

import {trigger, transition, style, animateChild, group, animate,query } from '@angular/animations';
import { RouterOutlet } from '@angular/router';



export const slide =
//De droite à gauche
  trigger('routeAnimations', [
    transition('Login => Register', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'fixed', // Style de base en permanence pour les entré et sorties des composants
          left: '12.5%',
          width: '75vw'
          ,background:'rgb(91, 171, 210)'
        })
      ],{ optional: false }),
      query(':enter', [
        style({ left: '100%',background:'rgb(91, 171, 210)' }) // left : 100% to change the direction // Debut de l'animation à l'entrer

      ],{ optional: false }),
      query(':leave', animateChild(),{ optional: false }),
      group([
        query(':leave', [
          animate('750ms ease-in-out', style({left: '-100%',background:'rgb(91, 171, 210)' }))// left -100% to change the direction
        ],{ optional: false }),
        query(':enter', [
          animate('750ms ease-in-out', style({ left: '12.5%',background:'rgb(91, 171, 210)' }))// Fin de l'animation à l'entrer
        ],{ optional: false })
      ]),
    ]),

    // De gauche à droite
    transition('Register => Login', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'fixed',
          left: '12.5%',
          width: '75vw',
          background:'rgb(91, 171, 210)'

        })
      ],{ optional: false }),
      query(':enter', [
        style({ left: '-100%' }) // left : 100% to change the direction

      ],{ optional: false }),
      query(':leave', animateChild(),{ optional: false }),
      group([
        query(':leave', [
          animate('750ms ease-in-out', style({left: '100%' }))// left -100% to change the direction
        ],{ optional: true }),
        query(':enter', [
          animate('750ms ease-in-out', style({ left: '12.5%' }))
        ],{ optional: true })
      ]),
    ])
  ]);



  @Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations :[slide]
})
export class AppComponent {
  title = 'le-cos-mos-app';


  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
