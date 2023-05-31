import { trigger, transition, style, animate,query } from '@angular/animations';
import { Component, EventEmitter, Input, NgZone, OnChanges, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterOutlet } from '@angular/router';
import { LogoutDialogComponentComponent } from './logout-dialog-component/logout-dialog-component.component';
import { SaveRouteService } from 'src/app/services/save-route.service';
//https://angular.io/api/router/RouterOutlet

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
  ])],
  providers: [SaveRouteService]
  })

export class HandlerViewComponent implements OnInit {
  hotCount:number = 0

  isWindowOpen?:boolean = false
  pingChild() {

 if(!this.isWindowOpen) {
  this.isWindowOpen = true
  this.ngZone.runOutsideAngular(() => {
    setTimeout(() => {
      // Exécuter le code qui doit être exécuté après la mise à jour du template

      // code executed if scroll of the message list window is at the bottom
      document.getElementById('messageList')!.scrollTo({
        top: document.getElementById("messageList")!.scrollHeight
      })
    })
  });
 } else {
  this.isWindowOpen = true
 }

  }
  getHotCount(count:string) {
    let numberCount = Number(count)
    this.hotCount = numberCount
  }
  constructor(private savedRouteService:SaveRouteService,private router: Router,private matDialog:MatDialog,private ngZone: NgZone) {

  }

  onViewChanges(e:Event) {

this.savedRouteService.saveRoute(this.router.url.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
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
    this.router.navigate(['/admin/examens/list']); // Navigue vers la vue 'accueil' par default
//Composition de la matière_I
  }

}
