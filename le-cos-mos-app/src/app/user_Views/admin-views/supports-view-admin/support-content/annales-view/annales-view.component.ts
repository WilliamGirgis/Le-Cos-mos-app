import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-annales-view',
  templateUrl: './annales-view.component.html',
  styleUrls: ['./annales-view.component.scss']
})
export class AnnalesViewComponent implements OnInit {

  constructor(  private router: Router) { }
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
  contentName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 2]
  blockName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 3]
  ngOnInit(): void {
  }

}
