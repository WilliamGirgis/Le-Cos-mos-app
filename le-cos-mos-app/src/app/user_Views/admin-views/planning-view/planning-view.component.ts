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
    let type:string = localStorage.getItem('user-type')!
    let fname:string = localStorage.getItem('fname')!
    let lname:string = localStorage.getItem('lname')!
    switch(type?.toLowerCase()) {
      case 'admin':
        this.router.navigate(['admin/planning/group']); // Navigue vers la vue 'accueil' par default
        break;
          default:
            this.router.navigate([`${type!.toLowerCase()}/planning/` + fname + '_' + lname ]); // Navigue vers la vue 'accueil' par default
        break;
    }

  }

}
