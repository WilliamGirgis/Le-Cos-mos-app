import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transversal-block-list',
  templateUrl: './transversal-block-list.component.html',
  styleUrls: ['./transversal-block-list.component.scss']
})
export class TransversalBlockListComponent implements OnInit {

  addItem(itemName:string) {
    this.block_list.push({name:itemName})
    }
  constructor(private router: Router) { }
  block_list:any = [{name:'MTU'},{name:'SHS'},{name:'PPP'}]
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]

  ngOnInit(): void {
  }

}
