import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from 'src/app/shared/user';


@Component({
  selector: 'app-statistiques-view',
  templateUrl: './statistiques-view.component.html',
  styleUrls: ['./statistiques-view.component.scss']
})
export class StatistiquesViewComponent implements OnInit {

  globalIndex: number = 0;
  view: string = "Stats";
  userList: User[] = [];
  selectedLeftItem?: string | String = 'Eleves';

  constructor() { }

  ngOnInit(): void {
  }



  eleves = [
    {
      eleve: "Qambar",
      matieres: [
        { 
          matiereName: "Maths", 
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]    
        },
        { 
          matiereName: "Svt",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Physique",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Corps humains",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
      ]
    },
    {
      eleve: "Yassine",
      matieres: [
        { 
          matiereName: "Maths", 
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]    
        },
        { 
          matiereName: "Svt",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Physique",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Corps humains",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
      ]
    },

    {
      eleve: "Nais",
      matieres: [
        { 
          matiereName: "Maths", 
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]    
        },
        { 
          matiereName: "Svt",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Physique",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Corps humains",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
      ]
    },
    {
      eleve: "Maehra",
      matieres: [
        { 
          matiereName: "Maths", 
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]    
        },
        { 
          matiereName: "Svt",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Physique",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        },
        { 
          matiereName: "Corps humains",
            notes: [
              {note : 12},
              {note : 18},
              {note : 7},
              {note : 5},
              {note : 10}
            ]  
        }
      ]
    }
 ]












}
