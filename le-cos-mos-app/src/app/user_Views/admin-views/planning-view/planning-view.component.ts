import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.scss']
})
export class PlanningViewComponent implements OnInit {
  constructor(private router: Router) {
    this.router.navigate(['app/planning/group']); // Navigue vers la vue 'accueil' par default

  }


  ngOnInit(): void {

  }

}
