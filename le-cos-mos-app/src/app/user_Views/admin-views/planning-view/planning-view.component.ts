import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planning-view',
  templateUrl: './planning-view.component.html',
  styleUrls: ['./planning-view.component.scss']
})
export class PlanningViewComponent implements OnInit {
  constructor(private router: Router) {

  }


  ngOnInit(): void {
    this.router.navigate(['admin/planning/NoGroup']); // Navigue vers la vue 'accueil' par default

  }

}
