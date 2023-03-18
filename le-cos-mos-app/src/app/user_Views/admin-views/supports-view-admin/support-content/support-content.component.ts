import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-support-content',
  templateUrl: './support-content.component.html',
  styleUrls: ['./support-content.component.scss']
})
export class SupportContentComponent implements OnInit {

  constructor(private router:ActivatedRoute) { }
  content:any = [{name:'Cours Magistraux'},{name:'Travaux Dirigés'},{name:'Annales'},{name:'Vidéos'},{name:'Exercices'},{name:'Séance de Planchages'}]

  selectedUed:string = this.router.snapshot.paramMap.get('id')!
  ngOnInit(): void {
  }

}
