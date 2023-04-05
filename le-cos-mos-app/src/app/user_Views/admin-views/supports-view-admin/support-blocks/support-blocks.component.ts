import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-blocks',
  templateUrl: './support-blocks.component.html',
  styleUrls: ['./support-blocks.component.scss']
})
export class SupportBlocksComponent implements OnInit {

  constructor( ) {
  }

  matiere:any = [{name:'Bloc sante'},{name:'Block disciplines transversal'},{name:'Bloc disciplines hors sante'}]



  ngOnInit(): void {

  }

}
