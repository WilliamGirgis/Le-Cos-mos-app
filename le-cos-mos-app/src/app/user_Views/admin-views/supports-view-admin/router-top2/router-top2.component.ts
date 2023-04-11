import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-top2',
  templateUrl: './router-top2.component.html',
  styleUrls: ['./router-top2.component.scss']
})
export class RouterTop2Component implements OnInit {
  @Output() newItemEvent = new EventEmitter<any>();
  constructor( private router: Router) { }
  addItem(itemName:string) {
    // this.hs_block_list.push({name:itemName})
    this.newItemEvent.emit(itemName);
    }
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]

  ngOnInit(): void {
  }

}
