import { Component, OnInit } from '@angular/core';
import { QCM } from 'src/app/shared/qcm';

@Component({
  selector: 'app-entrainement-view',
  templateUrl: './entrainement-view.component.html',
  styleUrls: ['./entrainement-view.component.scss']
})
export class EntrainementViewComponent implements OnInit {

  constructor() { }

  qcmList:QCM [] = [{},{},{}]

  ngOnInit(): void {
  }

}
