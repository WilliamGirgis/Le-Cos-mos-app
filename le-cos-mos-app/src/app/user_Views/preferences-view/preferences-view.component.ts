import { animate, style, transition } from '@angular/animations';
import { query, trigger } from '@angular/animations';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import {SaveRouteService} from '../../services/save-route.service'
@Component({
  selector: 'app-preferences-view',
  templateUrl: './preferences-view.component.html',
  styleUrls: ['./preferences-view.component.scss']
})
export class PreferencesViewComponent implements OnInit,AfterContentChecked {

  constructor(private savedRouteService:SaveRouteService) {


   }
  ngAfterContentChecked(): void {
this.routeToNavBack = this.savedRouteService.savedRoute

  }

routeToNavBack:string = ''
  ngOnInit(): void {


  }

}
