import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

// Left to right animation
const santeSlideRight  =  'SupportsBlocks => Sante , Sante => Sante2 , Sante2 => Sante3 , Sante3 => Sante4 , Sante4 => Sante5'
const hsSlideRight  =  'SupportsBlocks => HS , HS => HS2 , HS2 => HS3 , HS3 => HS4 , HS4 => HS5'
const transSlideRight  =  'SupportsBlocks => Transversal , Transversal => Transversal2 , Transversal2 => Transversal3 , Transversal3 => Transversal4 , Transversal4 => Transversal5'
// Right to left animation
const santeSlideLeft  =  'Sante => SupportsBlocks , Sante2 => Sante , Sante3 => Sante2 , Sante4 => Sante3 , Sante5 => Sante4'
const hsSlideLeft =  'HS => SupportsBlocks , HS2 => HS , HS3 => HS2 , HS4 => HS3 , HS5 => HS4'
const transSlideLeft  =  'Transversal => SupportsBlocks , Transversal2 => Transversal , Transversal3 => Transversal2 , Transversal4 => Transversal3 , Transversal5 => Transversal4'
// All transversal right to left animation particular case
const slideLeftTransversal5 = 'Transversal5 => SupportsBlocks , Transversal5 => Transversal3 , Transversal5 => Transversal2 , Transversal5 => Transversal'
const slideLeftTransversal4 = 'Transversal4 => SupportsBlocks , Transversal4 => Transversal2 , Transversal4 => Transversal'
const slideLeftTransversal3 = 'Transversal3 => SupportsBlocks , Transversal3 => Transversal'
const slideLeftTransversal2 = 'Transversal2 => SupportsBlocks'

// All sante right to left animation particular case
const slideLeftSante5 = 'Sante5 => SupportsBlocks , Sante5 => Sante3 , Sante5 => Sante2 , Sante5 => Sante'
const slideLeftSante4 = 'Sante4 => SupportsBlocks , Sante4 => Sante2 , Sante4 => Sante'
const slideLeftSante3 = 'Sante3 => SupportsBlocks , Sante3 => Sante'
const slideLeftSante2 = 'Sante2 => SupportsBlocks'

// All hors_sante right to left animation particular case
const slideLeftHs5 = 'HS5 => SupportsBlocks , HS5 => HS3 , HS5 => HS2 , HS5 => HS'
const slideLeftHs4 = 'HS4 => SupportsBlocks , HS4 => HS2 , HS4 => HS'
const slideLeftHs3 = 'HS3 => SupportsBlocks , HS3 => HS'
const slideLeftHs2 = 'HS2 => SupportsBlocks'
export const slide =
//De gauche à droite
  trigger('slide', [
    transition(`${santeSlideRight} , ${hsSlideRight} , ${transSlideRight}`, [
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
          animate('500ms ease-in-out', style({left: '-100%'}))// left -100% to change the direction
        ],{ optional: true }),
        query(':enter', [
          animate('500ms ease-in-out', style({ left: '0%' }))// Fin de l'animation à l'entrer
        ],{ optional: true })
      ]),
    ]),

    // De droite à gauche
    transition(`${santeSlideLeft} , ${hsSlideLeft} , ${transSlideLeft} , ${slideLeftTransversal5} , ${slideLeftTransversal4} , ${slideLeftTransversal3} ,${slideLeftTransversal2} , ${slideLeftSante5} , ${slideLeftSante4} , ${slideLeftSante3} , ${slideLeftSante2} , ${slideLeftHs5} , ${slideLeftHs4} , ${slideLeftHs3} , ${slideLeftHs2}`, [
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
          animate('500ms ease-in-out', style({left: '100%' }))// left -100% to change the direction
        ],{ optional: true }),
        query(':enter', [
          animate('500ms ease-in-out', style({ left: '0%' }))
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
