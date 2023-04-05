import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'app-hs-block-list',
  templateUrl: './hs-block-list.component.html',
  styleUrls: ['./hs-block-list.component.scss']
})
export class HsBlockListComponent implements OnInit {

  constructor(private router: Router) { }
  hs_block_list:any = [{name:'SVT'},{name:'CHIMIE'},{name:'ECO'},{name:'PSYCHO'},{name:'PHYSIQUE'},{name:'MATHS'},{name:'DROIT'},{name:'STAPS'},{name:'SOCIALE'},{name:'TECHNO'}]
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]


  ngOnInit(): void {

  }

}
