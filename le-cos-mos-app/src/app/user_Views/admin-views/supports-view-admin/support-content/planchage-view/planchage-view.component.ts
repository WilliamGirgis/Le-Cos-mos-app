import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planchage-view',
  templateUrl: './planchage-view.component.html',
  styleUrls: ['./planchage-view.component.scss']
})
export class PlanchageViewComponent implements OnInit {

  constructor(  private router: Router) { }

  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
  contentName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 2]
  blockName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 3]
  ngOnInit(): void {
  }

}
