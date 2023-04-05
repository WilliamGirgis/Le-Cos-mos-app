import { trigger, transition, style, animateChild, group, animate,query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from 'src/app/services/AuthService.service';
import { HttpService } from 'src/app/services/http.services';
import { LogoutDialogComponentComponent } from './logout-dialog-component/logout-dialog-component.component';


@Component({
  selector: 'app-handler-view',
  templateUrl: './handler-view.component.html',
  styleUrls: ['./handler-view.component.scss'],
  animations: [trigger('shade', [
    transition('* => *', [
      query(':enter', [
        style({
          opacity: 0,

        }),
        animate('500ms ease-in-out', style({ opacity: 1 }))// Fin de l'animation à l'entrer
      ], { optional: true })
    ]),
  ])]
})

export class HandlerViewComponent implements OnInit {

  constructor(private authService:AuthService,private router: Router,private httpService:HttpService,private matDialog:MatDialog) {
   }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

logout() {
  this.matDialog.open(LogoutDialogComponentComponent,{width:'max-content',height:'50vh'})


}

    ngOnInit(): void {
    // this.router.navigate(['admin/supports/UE/Block santé']); // Navigue vers la vue 'accueil' par default
    // this.router.navigate(['admin/supports/sante/UE1 Chimie/cm/list']); // Navigue vers la vue 'accueil' par default
    this.router.navigate(['/admin/messagerie']); // Navigue vers la vue 'accueil' par default
//Composition de la matière_I
  }

}
