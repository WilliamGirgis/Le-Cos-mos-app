import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transversal-block-list',
  templateUrl: './transversal-block-list.component.html',
  styleUrls: ['./transversal-block-list.component.scss']
})
export class TransversalBlockListComponent implements OnInit {

  constructor() { }
  block_list:any = [{name:'MTU'},{name:'SHS'},{name:'PPP'}]

  ngOnInit(): void {
  }

}
