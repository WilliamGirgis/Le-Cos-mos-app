import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-suppor-ue',
  templateUrl: './suppor-ue.component.html',
  styleUrls: ['./suppor-ue.component.scss']
})
export class SupporUEComponent implements OnInit {

  constructor() { }
  ue:any = [{name:'UE1 Chimie'},{name:'UE2 Biochimie'},{name:'UE3 Mathématique'},{name:'UE4 Corps humains'},{name:'UE5 Biologie'},{name:'UE6 Physique et biophysique'}]

  ngOnInit(): void {
  }

}
