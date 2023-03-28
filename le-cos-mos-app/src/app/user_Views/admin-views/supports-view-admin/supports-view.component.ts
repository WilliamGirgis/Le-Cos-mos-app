import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';


export const slide =
//De droite à gauche
  trigger('slide', [
    transition('SupportsBlocks => Sante , SupportsBlocks => HS , SupportsBlocks => Transversal', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'relative', // Style de base en permanence pour les entré et sorties des composants
          left: '0%',
          width: '85vw'

        })
      ],{ optional: true }),
      query(':enter', [
        style({ left: '100%'}) // left : 100% to change the direction // Debut de l'animation à l'entrer

      ],{ optional: true }),
      query(':leave', [animateChild(),style({position: 'absolute'})]),
      group([
        query(':leave', [
          animate('750ms ease-in-out', style({left: '-100%'}))// left -100% to change the direction
        ],{ optional: true }),
        query(':enter', [
          animate('750ms ease-in-out', style({ left: '0%' }))// Fin de l'animation à l'entrer
        ],{ optional: true })
      ]),
    ]),

    // De gauche à droite
    transition('Sante => SupportsBlocks , HS => SupportsBlocks , Transversal => SupportsBlocks', [
      style({ position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'relative',
          left: '0%',
          width: '85vw' // Must be the same with the width in the css of this component, to avoid bugs

        })
      ],{ optional: true }),
      query(':enter', [
        style({ left: '-100%',position: 'absolute',height:'100%' }) // left : 100% to change the direction

      ],{ optional: true }),
      query(':leave', [animateChild(), style({left: '0' })]),
      group([
        query(':leave', [
          animate('750ms ease-in-out', style({left: '100%' }))// left -100% to change the direction
        ],{ optional: true }),
        query(':enter', [
          animate('750ms ease-in-out', style({ left: '0%' }))
        ],{ optional: true })
      ]),
    ])
  ]);


@Component({
  selector: 'app-supports-view',
  templateUrl: './supports-view.component.html',
  styleUrls: ['./supports-view.component.scss'],
  animations:[slide]
})
export class SupportsViewComponent implements OnInit {

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

}
