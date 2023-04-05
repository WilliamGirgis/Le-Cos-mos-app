import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-top2',
  templateUrl: './router-top2.component.html',
  styleUrls: ['./router-top2.component.scss']
})
export class RouterTop2Component implements OnInit {

  constructor( private router: Router) { }

  hs_block_list:any = [{name:'SVT'},{name:'CHIMIE'},{name:'ECO'},{name:'PSYCHO'},{name:'PHYSIQUE'},{name:'MATHS'},{name:'DROIT'},{name:'STAPS'},{name:'SOCIALE'},{name:'TECHNO'}]
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]

  ngOnInit(): void {
  }

}
