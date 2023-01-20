import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-group-planning',
  templateUrl: './group-planning.component.html',
  styleUrls: ['./group-planning.component.scss']
})
export class GroupPlanningComponent implements OnInit {
  constructor(private http:HttpClient,private route: ActivatedRoute) {

  }

  readonly getGroupsURL = "http://localhost:4200/planning/get"

  columnsToDisplay = [' ','Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  semaine:string = 'Semaine du 19/01'
  groupName = this.route.snapshot.paramMap.get('id')

  creneaux = [
    {heure:'8h'},{heure:'9h'},
    {heure:'10h'},{heure:'11h'},
    {heure:'12h'},{heure:'13h'},
    {heure:'14h'},{heure:'15h'},
    {heure:'16h'},{heure:'17h'},
    {heure:'18h'},{heure:'19h'},
    {heure:'20h'},{heure:'21h'}
  ]
  creneaux_slotTest = [ // chaque tableau dans le tableau correspond à un créneaux
    [         // L'ordre des jours n'a pas d'importance
              // Si plusieurs même élements sont présent dans le tableau (exemple un jour avec Jeudi) alors les deux valeurs sont utilisées pour afficher la donné
              // La taille des tableaux doivent être inférieur ou égale à 7 ( index commencent par 0 et fini par 6) sinon les données ne s'afficheront pas
      {heure:'8h',type:'',day:'Lundi',matiere:''},
      {heure:'8h',type:'',day:'Mardi',matiere:''},
      {heure:'8h',type:'',day:'Mercredi',matiere:''},
      {heure:'8h',type:'Cour',day:'Jeudi',matiere:'SVT'},
      {heure:'8h',type:'',day:'Vendredi',matiere:''},
      {heure:'8h',type:'',day:'Samedi',matiere:''},
      {heure:'8h',type:'',day:'Dimanche',matiere:''},
  ],
    [
      {heure:'9h',type:'',day:'Lundi',matiere:''},
      {heure:'9h',type:'',day:'Mardi',matiere:''},
      {heure:'9h',type:'',day:'Mercredi',matiere:''},
      {heure:'9h',type:'',day:'Jeudi',matiere:''},
      {heure:'9h',type:'',day:'Vendredi',matiere:''},
      {heure:'9h',type:'',day:'Samedi',matiere:''},
      {heure:'9h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'10h',type:'',day:'Lundi',matiere:''},
    {heure:'10h',type:'',day:'Mardi',matiere:''},
    {heure:'10h',type:'',day:'Mercredi',matiere:''},
    {heure:'10h',type:'',day:'Jeudi',matiere:''},
    {heure:'10h',type:'',day:'Vendredi',matiere:''},
    {heure:'10h',type:'',day:'Samedi',matiere:''},
    {heure:'10h',type:'',day:'Dimanche',matiere:''}
  ],
    [
      {heure:'11h',type:'',day:'Lundi',matiere:''},
    {heure:'11h',type:'',day:'Mardi',matiere:''},
    {heure:'11h',type:'',day:'Mercredi',matiere:''},
    {heure:'11h',type:'',day:'Jeudi',matiere:''},
    {heure:'11h',type:'',day:'Vendredi',matiere:''},
    {heure:'11h',type:'',day:'Samedi',matiere:''},
    {heure:'11h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'12h',type:'',day:'Lundi',matiere:''},
    {heure:'12h',type:'',day:'Mardi',matiere:''},
    {heure:'12h',type:'',day:'Mercredi',matiere:''},
    {heure:'12h',type:'',day:'Jeudi',matiere:''},
    {heure:'12h',type:'',day:'Vendredi',matiere:''},
    {heure:'12h',type:'',day:'Samedi',matiere:''},
    {heure:'12h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'13h',type:'',day:'Lundi',matiere:''},
    {heure:'13h',type:'',day:'Mardi',matiere:''},
    {heure:'13h',type:'',day:'Mercredi',matiere:''},
    {heure:'13h',type:'',day:'Jeudi',matiere:''},
    {heure:'13h',type:'',day:'Vendredi',matiere:''},
    {heure:'13h',type:'',day:'Samedi',matiere:''},
    {heure:'13h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'14h',type:'',day:'Lundi',matiere:''},
    {heure:'14h',type:'',day:'Mardi',matiere:''},
    {heure:'14h',type:'',day:'Mercredi',matiere:''},
    {heure:'14h',type:'',day:'Jeudi',matiere:''},
    {heure:'14h',type:'',day:'Vendredi',matiere:''},
    {heure:'14h',type:'',day:'Samedi',matiere:''},
    {heure:'14h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'15h',type:'',day:'Lundi',matiere:''},
    {heure:'15h',type:'',day:'Mardi',matiere:''},
    {heure:'15h',type:'',day:'Mercredi',matiere:''},
    {heure:'15h',type:'',day:'Jeudi',matiere:''},
    {heure:'15h',type:'',day:'Vendredi',matiere:''},
    {heure:'15h',type:'',day:'Samedi',matiere:''},
    {heure:'15h',type:'',day:'Dimanche',matiere:''}
    ],

    [
      {heure:'16h',type:'',day:'Lundi',matiere:''},
    {heure:'16h',type:'',day:'Mardi',matiere:''},
    {heure:'16h',type:'',day:'Mercredi',matiere:''},
    {heure:'16h',type:'',day:'Jeudi',matiere:''},
    {heure:'16h',type:'',day:'Vendredi',matiere:''},
    {heure:'16h',type:'',day:'Samedi',matiere:''},
    {heure:'16h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'17h',type:'',day:'Lundi',matiere:''},
    {heure:'17h',type:'',day:'Mardi',matiere:''},
    {heure:'17h',type:'',day:'Mercredi',matiere:''},
    {heure:'17h',type:'',day:'Jeudi',matiere:''},
    {heure:'17h',type:'',day:'Vendredi',matiere:''},
    {heure:'17h',type:'',day:'Samedi',matiere:''},
    {heure:'17h',type:'',day:'Dimanche',matiere:''}
    ],
    [
    {heure:'18h',type:'Examen',day:'Lundi',matiere:'Math'},
    {heure:'18h',type:'Examen',day:'Mardi',matiere:'Philo'},
    {heure:'18h',type:'Examen',day:'Mercredi',matiere:'TEZ'},
    {heure:'18h',type:'',day:'Jeudi',matiere:''},
    {heure:'18h',type:'',day:'Vendredi',matiere:''},
    {heure:'18h',type:'',day:'Samedi',matiere:''},
    {heure:'18h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'19h',type:'',day:'Lundi',matiere:''},
    {heure:'19h',type:'',day:'Mardi',matiere:''},
    {heure:'19h',type:'',day:'Mercredi',matiere:''},
    {heure:'19h',type:'',day:'Jeudi',matiere:''},
    {heure:'19h',type:'',day:'Vendredi',matiere:''},
    {heure:'19h',type:'',day:'Samedi',matiere:''},
    {heure:'19h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'20h',type:'',day:'Lundi',matiere:''},
    {heure:'20h',type:'',day:'Mardi',matiere:''},
    {heure:'20h',type:'',day:'Mercredi',matiere:''},
    {heure:'20h',type:'Cour',day:'Jeudi',matiere:''},
    {heure:'20h',type:'',day:'Vendredi',matiere:''},
    {heure:'20h',type:'',day:'Samedi',matiere:''},
    {heure:'20h',type:'Examen',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'21h',type:'rdv',day:'Lundi',matiere:''},
    {heure:'21h',type:'',day:'Mardi',matiere:''},
    {heure:'21h',type:'',day:'Mercredi',matiere:''},
    {heure:'21h',type:'',day:'Jeudi',matiere:''},
    {heure:'21h',type:'rdv',day:'Vendredi',matiere:''},
    {heure:'21h',type:'',day:'Samedi',matiere:''},
    {heure:'21h',type:'',day:'Dimanche',matiere:''}
    ]

  ]
  dataSource = new MatTableDataSource(this.creneaux)

  creneaux_slot = [         // Chaque tableau correspond à un creaneaux avec creneaux_slot[0] = 8h00 et  creneaux_slot[11] = 21h00
    [{},{},{},{},{},{},{}], // Chaque element dans les tableaux correspondent à un jour dans la semaine avec creneaux_slot[x][0] = Lundi et creneaux_slot[x][6] = Dimanche
    [{},{},{},{},{},{},{}],  // Pour un placer un element le Jeudi à 11h00 par exemple : creneaux_slot[3][3] = element
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}],
    [{},{},{},{},{},{},{}]
  ]

  globalIndex = 0
  getGroups(groupName:string) {

    const querParam = new HttpParams().set('groupName', groupName);
    this.http.get(this.getGroupsURL,{params:querParam,responseType:'text'}).pipe(map((data) =>{
     let groups = JSON.parse(data)
      let userList = JSON.parse(data)[this.globalIndex].user_list!

      this.creneaux_slot = JSON.parse(data)

    })).subscribe((res) =>{

    })

  }


  getColor(type:string) {

    if(type == 'Examen') {
      return 'var(--white-them-color)'
    } else if(type == 'Cour') {
      return 'var(--dblue-them-color)'
    } else if(type.toLowerCase() == 'rdv') {
      return 'var(--blue-them-color)'
    } else {
      return ''
    }
  }
  getColor2(type:string) {
    if(type == 'Examen') {

      return 'var(--blue-them-color)'
     } else {
      return 'var(--white-them-color)'
     }

  }
  getColor3(type:string) {
    if(type == 'Examen') {

      return '1px solid var(--dblue-them-color)'
     } else {
      return ''
     }

  }



  ngOnInit(): void {
  }

}
