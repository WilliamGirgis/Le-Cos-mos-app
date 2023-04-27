import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor() { }


  view: string = "Stats";
  userList: User[] = [];
  selectedLeftItem?: string | String = 'Eleves';

  ngOnInit(): void {
  }

  globalIndex: number = 0;

  eleves = [
    {
      eleveName: "Qambar",
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
      eleveName: "Yassine",
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
      eleveName: "Nais",
      matieres: [
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
      eleveName: "Maehra",
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
