import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-statistiques-view',
  templateUrl: './statistiques-view.component.html',
  styleUrls: ['./statistiques-view.component.scss']
})
export class StatistiquesViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
