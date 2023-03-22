import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-excercices-view',
  templateUrl: './excercices-view.component.html',
  styleUrls: ['./excercices-view.component.scss']
})
export class ExcercicesViewComponent implements OnInit {

  constructor(  private router: Router) { }
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
  contentName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 2]
  blockName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 3]
  ngOnInit(): void {
  }

}
