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

  /**************** QAMBAR *****************/

    {
      eleveName: "Qambar",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        },
        {
          typeName: "QCM entrainements", 
        }
      ]
    },

  /**************** Yassine *****************/

    {
      eleveName: "Yassine",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        }
      ]
    },

      /**************** Nais *****************/

    {
      eleveName: "Nais",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        },
        {
          typeName: "QCM entrainements", 
        },
        {
          typeName: "QCM examens", 
        }
      ]
    },

      /**************** Wiliam *****************/

    {
      eleveName: "Wiliam",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        }
      ]
    },

      /**************** Maria *****************/

    {
      eleveName: "Maria",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        }
      ]
    },

      /**************** Ugur *****************/

    {
      eleveName: "Ugur",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        },
        {
          typeName: "QCM entrainements", 
        }
      ]
    },

        /**************** Eva *****************/

    {
      eleveName: "Eva",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        },
        {
          typeName: "QCM entrainements", 
        },
        {
          typeName: "QCM examens", 
        }
      ]
    },

      /**************** Maehra *****************/

    {
      eleveName: "Maehra",
      types : [
        { 
          typeName: "Notes", 
          matieres: [
            { 
              matiereName: "Maths", 
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 10}
                ]    
            },
            { 
              matiereName: "Svt",
                notes: [
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
                  {note : 7}
                ]  
            },
            { 
              matiereName: "Corps humains",
                notes: [
                  {note : 12},
                  {note : 18},
                  {note : 7},
                  {note : 5}
                ]  
            },
          ]
        },
        {
          typeName: "QCM entrainements", 
        },
        {
          typeName: "QCM examens", 
        }
      ]
    }
  ]
          

}
