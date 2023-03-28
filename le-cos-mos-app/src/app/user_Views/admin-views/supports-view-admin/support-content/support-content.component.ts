import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';



@Component({
  selector: 'app-support-content',
  templateUrl: './support-content.component.html',
  styleUrls: ['./support-content.component.scss']
})
export class SupportContentComponent implements OnInit {

  constructor() { }
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  ngOnInit(): void {
  }

}
