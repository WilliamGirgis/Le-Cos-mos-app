import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild,  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { Seance } from 'src/app/shared/seance';
import {CdkDragDrop,transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-group-planning',
  templateUrl: './group-planning.component.html',
  styleUrls: ['./group-planning.component.scss']
})
export class GroupPlanningComponent implements OnInit {
  heureIndex:number = 0
  dayIndex:number= 0
  constructor(private http:HttpClient,private route: ActivatedRoute) {

  }


  @Input('cdkDragStarted') started?:CdkDragDrop<Event>



  @ViewChild(MatMenuTrigger) trigger?: MatMenuTrigger;

  menuCour = [
  {name:'Mathematique'},
  {name:'Physique Chimie'},
  {name:'Science de la vie et de la terre'},
  {name:'Sport'},
  {name:'Informatique'}
  ]
  menuRdv = [
    {name:'Daniel Akgul'},
    {name:'Yassine Soua'},
    {name:'Ugür'},
    {name:"Maria"},
    {name:'Antoine Shube'}
  ]


  enter(i:number) {
    if(this.isOnDrag) {
      return
    }
    this.containerIndex = i
  }

  readonly getGroupsURL = "http://localhost:4200/planning/get"

  readonly getSeanceUrl = "http://localhost:4200/seance/get"
  readonly setSeanceUrl = "http://localhost:4200/seance/add"
  readonly delSeanceUrl = "http://localhost:4200/seance/del"
  readonly modifySeanceUrl = "http://localhost:4200/seance/modify"

  columnsToDisplay = [' ','Lundi', 'Mardi', 'Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];

  semaine:string = 'Semaine du 19/01'
  groupName = this.route.snapshot.paramMap.get('id')

  seanceListAvailable:Seance[] = []

  seanceListAvailableTest:any[] = [
    ['','Cour','MATH',''],
    ['','Examen','SVT',''],
    ['','Cour','MATH',''],
    ['','Examen','SVT',''],
    ['','RDV','Daniel','']
  ]


  addItemToList(name:string,type:string) {

    if(name != '') {
      this.newSeance(name,type)
    }

  }
  isOut:boolean = true
  containerIndex:number = 0
  drop(event: CdkDragDrop<string[]>) {
    this.isOnDrag = false
    if (event.previousContainer === event.container) {
      if(this.isOut) {
        return
      }
      this.semaineJours[this.dayIndex!][this.heureIndex!][1] = event.container.data[2]
      this.semaineJours[this.dayIndex!][this.heureIndex!][2] = event.container.data[1]
      console.log(this.semaineJours[this.dayIndex!][this.heureIndex!])
      console.log(" Container data = " + event.container.data)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  getSeanceItems() {
    this.http
      .get(this.getSeanceUrl, {
        responseType: 'json',

      })
      .toPromise()
      .then((data) => {
        if(data === null) {// if the post.json is empty
          this.seanceListAvailable = []
          return console.error("No Posts")
        }
        this.seanceListAvailable = JSON.parse(JSON.stringify(data));
      });
  }


isOnDrag:boolean = false
 onDragStart($event:any) {
  this.isOnDrag = true


  }

  deleteSeanceItem(index:number) {
    let ind = index +1
     if(!window.confirm("Are you sure you wanna delete the publication number " + ind + " ?")) {
       return
         }
     this.http
       .post(this.delSeanceUrl, { index: index, })
       .pipe(
         map((data) => {
           this.getSeanceItems();
         })
       )
       .subscribe((response) => {});
   }


   async newSeance(name:string,type:string) {

    let seance: Seance = {type:type,day:'',heure:'',matiere:name}; // -> last index ext[ext.length - 1]


    this.http
      .post(this.setSeanceUrl, seance, {
        responseType: 'json',
      })
      .pipe(
        map((data) => {
          //this.uploader.uploadAll()
          this.getSeanceItems();
        })
      )
      .subscribe((response) => {});
  }

  test:string[] = []



  creneaux = [
    '8h','9h'
    ,'10h','11h',
    '12h','13h',
    '14h','15h',
    '16h','17h',
    '18h','19h',
    '20h','21h'
  ]

  lundi:string[][] = [


    ['8h','SVT','Cour','Lundi'],
    ['9h','SVT','Examen','Lundi'],
    ['10h','','','Lundi'],
    ['11h','','','Lundi'],
    ['12h','','','Lundi'],
    ['13h','Math','Examen','Lundi'],
    ['14h','','','Lundi'],
    ['15h','','','Lundi'],
    ['16h','','','Lundi'],
    ['17h','','','Lundi'],
    ['18h','','','Lundi'],
    ['19h','Philo','Cour','Lundi'],
    ['20h','','','Lundi'],
    ['21h','','','Lundi']
  ]
  mardi:string[][] = [


    ['8h','','','Mardi'],
    ['9h','','','Mardi'],
    ['10h','','','Mardi'],
    ['11h','','','Mardi'],
    ['12h','','','Mardi'],
    ['13h','Daniel','rdv','Mardi'],
    ['14h','','','Mardi'],
    ['15h','','','Mardi'],
    ['16h','','','Mardi'],
    ['17h','','','Mardi'],
    ['18h','','','Mardi'],
    ['19h','Français','Cour','Mardi'],
    ['20h','','','Mardi'],
    ['21h','','','Mardi']
  ]
  mercredi:string[][] = [


    ['8h','','','Mercredi'],
    ['9h','','','Mercredi'],
    ['10h','','','Mercredi'],
    ['11h','','','Mercredi'],
    ['12h','','','Mercredi'],
    ['13h','','','Mercredi'],
    ['14h','','','Mercredi'],
    ['15h','','','Mercredi'],
    ['16h','','','Mercredi'],
    ['17h','','','Mercredi'],
    ['18h','Français','Examen','Mercredi'],
    ['19h','','','Mercredi'],
    ['20h','','','Mercredi'],
    ['21h','','','Mercredi']
  ]
  jeudi:string[][] = [
    ['8h','','','Jeudi'],
    ['9h','','','Jeudi'],
    ['10h','','','Jeudi'],
    ['11h','','','Jeudi'],
    ['12h','','','Jeudi'],
    ['13h','','','Jeudi'],
    ['14h','','','Jeudi'],
    ['15h','','','Jeudi'],
    ['16h','','','Jeudi'],
    ['17h','','','Jeudi'],
    ['18h','','','Jeudi'],
    ['19h','','','Jeudi'],
    ['20h','','','Jeudi'],
    ['21h','','','Jeudi']
  ]
  vendredi:string[][] = [


    ['8h','','','Vendredi'],
    ['9h','','','Vendredi'],
    ['10h','','','Vendredi'],
    ['11h','','','Vendredi'],
    ['12h','','','Vendredi'],
    ['13h','','','Vendredi'],
    ['14h','','','Vendredi'],
    ['15h','','','Vendredi'],
    ['16h','','','Vendredi'],
    ['17h','Yassine','rdv','Vendredi'],
    ['18h','','','Vendredi'],
    ['19h','','','Vendredi'],
    ['20h','','','Vendredi'],
    ['21h','','','Vendredi']
  ]
  samedi:string[][] = [

    ['8h','','','Samedi'],
    ['9h','','','Samedi'],
    ['10h','','','Samedi'],
    ['11h','','','Samedi'],
    ['12h','','','Samedi'],
    ['13h','','','Samedi'],
    ['14h','','','Samedi'],
    ['15h','','','Samedi'],
    ['16h','','','Samedi'],
    ['17h','','','Samedi'],
    ['18h','','','Samedi'],
    ['19h','informatique','Examen','Samedi'],
    ['20h','','','Samedi'],
    ['21h','','','Samedi']
  ]
  dimanche:string[][] = [

    ['8h','','','Dimanche'],
    ['9h','','','Dimanche'],
    ['10h','','','Dimanche'],
    ['11h','','','Dimanche'],
    ['12h','','','Dimanche'],
    ['13h','','','Dimanche'],
    ['14h','','','Dimanche'],
    ['15h','','','Dimanche'],
    ['16h','','','Dimanche'],
    ['17h','','','Dimanche'],
    ['18h','Math','Examen','Dimanche'],
    ['19h','','','Dimanche'],
    ['20h','','','Dimanche'],
    ['21h','','','Dimanche']
  ]

  semaineJours:string[][][] = [
    this.lundi,
    this.mardi,
    this.mercredi,
    this.jeudi,
    this.vendredi,
    this.samedi,
    this.dimanche
  ]

  creneaux_slot:any []= [ // chaque tableau dans le tableau correspond à un créneaux
    [         // L'ordre des jours n'a pas d'importance
              // Si plusieurs même élements sont présent dans le tableau (exemple un jour avec Jeudi) alors les deux valeurs sont utilisées pour afficher la donné
              // La taille des tableaux doivent être inférieur ou égale à 7 ( index commencent par 0 et fini par 6) sinon les données ne s'afficheront pas
       // Chaque tableau correspond à un creaneaux avec creneaux_slot[0] = 8h00 et  creneaux_slot[11] = 21h00
// Chaque element dans les tableaux correspondent à un jour dans la semaine avec creneaux_slot[x][0] = Lundi et creneaux_slot[x][6] = Dimanche


              {heure:'8h',type:'',day:'Lundi',matiere:''},
      {heure:'8h',type:'',day:'Mardi',matiere:''},
      {heure:'8h',type:'',day:'Mercredi',matiere:''},
      {heure:'8h',type:'',day:'Jeudi',matiere:''},
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
    {heure:'18h',type:'',day:'Lundi',matiere:''},
    {heure:'18h',type:'',day:'Mardi',matiere:''},
    {heure:'18h',type:'',day:'Mercredi',matiere:''},
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
    {heure:'20h',type:'',day:'Jeudi',matiere:''},
    {heure:'20h',type:'',day:'Vendredi',matiere:''},
    {heure:'20h',type:'',day:'Samedi',matiere:''},
    {heure:'20h',type:'',day:'Dimanche',matiere:''}
    ],
    [
      {heure:'21h',type:'',day:'Lundi',matiere:''},
    {heure:'21h',type:'',day:'Mardi',matiere:''},
    {heure:'21h',type:'',day:'Mercredi',matiere:''},
    {heure:'21h',type:'',day:'Jeudi',matiere:''},
    {heure:'21h',type:'',day:'Vendredi',matiere:''},
    {heure:'21h',type:'',day:'Samedi',matiere:''},
    {heure:'21h',type:'',day:'Dimanche',matiere:''}
    ]

  ]
  dataSource = new MatTableDataSource(this.creneaux)

  // creneaux_slot:WeeklyPlanning []= {

  // }

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

      return 'var(--dblue-them-color)'
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
    this.getSeanceItems()
  }

}
