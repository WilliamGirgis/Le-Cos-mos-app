import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-content-displayer',
  templateUrl: './list-content-displayer.component.html',
  styleUrls: ['./list-content-displayer.component.scss']
})
export class ListContentDisplayerComponent implements OnInit {

  selectedItemIndex:number = 0
  contentListTest = [{name:'Composition de la matière',chapter:'I'},{name:'Composition de la matière',chapter:'II'},{name:'Composition de la matière',chapter:'III'},{name:'Composition de la matière',chapter:'IV'},{name:'Composition de la matière',chapter:'V'},{name:'Composition de la matière',chapter:'VI'}]
  constructor() { }
  displayDetails(selectedItemIndex:number){
    this.selectedItemIndex = selectedItemIndex
  }
  ngOnInit(): void {

  }

}
