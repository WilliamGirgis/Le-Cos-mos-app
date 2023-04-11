import {Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-support-blocks',
  templateUrl: './support-blocks.component.html',
  styleUrls: ['./support-blocks.component.scss']
})
export class SupportBlocksComponent implements OnInit {

  constructor( ) {
  }
  addItem(itemName:string) {
    // this.hs_block_list.push({name:itemName})
    this.matieres.push({name:itemName,link:itemName});
    }
  matieres:any = [{name:'Bloc sante',link:'sante'},{name:'Block disciplines transversal',link:'transversal'},{name:'Bloc disciplines hors sante',link:'hors_sante'}]



  ngOnInit(): void {

  }

}
