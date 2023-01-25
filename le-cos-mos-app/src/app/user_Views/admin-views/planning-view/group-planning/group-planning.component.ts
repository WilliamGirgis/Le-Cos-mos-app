import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild,  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-group-planning',
  templateUrl: './group-planning.component.html',
  styleUrls: ['./group-planning.component.scss']
})
export class GroupPlanningComponent implements OnInit {
  heureIndex:number = 0
  dayIndex:number= 0
  constructor(private http:HttpClient,private route: ActivatedRoute) {
    this.getGroups(this.groupLink!)
    this.getSeanceItems()
  }

  @Input('cdkDragStarted') started?:CdkDragDrop<Event>
  seanceItemGroupIndex:number = 0

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

  selectedItem:any = {
    type:'',
    name:''
  }

  saveItem(room:string) {
    console.log(this.selectedItem)
    if(this.selectedItem.name != '') {
      this.newSeance(this.selectedItem.name,this.selectedItem.type,room)
    }
  }

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

  semaine:string = 'Semaine du 19/01'
  groupLink = this.route.snapshot.paramMap.get('id')

  selectedSeanceGroup = !!this.groupLink ? this.groupLink : 'Tronc Commun'
  groupList?:any []

  seanceListAvailable:any[] = []

  seanceListAvailableTest:any[] = [
    ['','Cour','MATH','','208 E'],
    ['','Examen','SVT','','405 G'],
    ['','Cour','MATH','','308 F'],
    ['','Examen','SVT','','43 A'],
    ['','RDV','Daniel','','407 Y']
  ]


  isOnDrag:boolean = false
 onDragStart($event:any) {
  this.isOnDrag = true
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
      this.semaineJours[this.dayIndex!][this.heureIndex!][4] = event.container.data[4]
    }
  }
  deleteItemFromCalendar(day:number,creneau:number) {
    this.semaineJours[day][creneau][1] = '' // Le nom : Math, Daniel, etc..
    this.semaineJours[day][creneau][2] = '' // Le type : Cour, Examen , Rdv
    this.semaineJours[day][creneau][4] = '' // La salle
      }

  async getSeanceItems() {
    const querParam = new HttpParams().set('link', this.groupLink!).set('groupName',this.selectedSeanceGroup!);
    this.http
      .get(this.getSeanceUrl, {params:querParam,
        responseType: 'json',
      })
      .pipe(map((data) =>{
        if(data === null) {// if the post.json is empty
          this.seanceListAvailable = []
          return console.error("No Posts")
        } else {
          this.seanceListAvailable = JSON.parse(JSON.stringify(data));
          console.log(this.seanceListAvailable)
        }
      })).subscribe((result) => {})
  }

  deleteSeanceItemFromAvailableList(index:number) {
    let ind = index +1
     if(!window.confirm("Are you sure you wanna delete the item number " + ind + " ?")) {
       return
         }
     this.http
       .post(this.delSeanceUrl, { index: index,groupName:this.selectedSeanceGroup })
       .pipe(
         map((data) => {
          this.getSeanceItems()
         })
       )
       .subscribe((response) => {});
   }

   async newSeance(name:string,type:string,room:string) {
    let seance: string[] = ['',type,name,'',room];
    const querParam = new HttpParams().set('groupName',this.selectedSeanceGroup!)
    this.http
      .post(this.setSeanceUrl, seance, {params:querParam,
        responseType: 'json',
      })
      .pipe(
        map((data) => {
          this.getSeanceItems();
        })
      )
      .subscribe((response) => {});
  }

  creneaux = [
    '8h','9h'
    ,'10h','11h',
    '12h','13h',
    '14h','15h',
    '16h','17h',
    '18h','19h',
    '20h','21h'
  ]
  dataSource = new MatTableDataSource(this.creneaux)
  columnsToDisplay = [' ','lundi', 'mardi', 'mercredi','jeudi','vendredi','samedi','dimanche'];
     // chaque tableau dans le tableau correspond à un créneaux
          // L'ordre des jours n'a pas d'importance
            // Si plusieurs même élements sont présent dans le tableau (exemple un jour avec jeudi) alors les deux valeurs sont utilisées pour afficher la donné
            // La taille des tableaux doivent être inférieur ou égale à 7 ( index commencent par 0 et fini par 6) sinon les données ne s'afficheront pas
     // Chaque tableau correspond à un creaneaux avec creneaux_slot[0] = 8h00 et  creneaux_slot[11] = 21h00
// Chaque element dans les tableaux correspondent à un jour dans la semaine avec creneaux_slot[x][0] = lundi et creneaux_slot[x][6] = dimanche

  lundi:string[][] = [
    ['8h','SVT','Cour','lundi',''],
    ['9h','SVT','Examen','lundi',''],
    ['10h','','','lundi',''],
    ['11h','','','lundi',''],
    ['12h','','','lundi',''],
    ['13h','Math','Examen','lundi',''],
    ['14h','','','lundi',''],
    ['15h','','','lundi',''],
    ['16h','','','lundi',''],
    ['17h','','','lundi',''],
    ['18h','','','lundi',''],
    ['19h','Philo','Cour','lundi',''],
    ['20h','','','lundi',''],
    ['21h','','','lundi','']
  ]

  mardi:string[][] = [
    ['8h','','','mardi',''],
    ['9h','','','mardi',''],
    ['10h','','','mardi',''],
    ['11h','','','mardi',''],
    ['12h','','','mardi',''],
    ['13h','Daniel','rdv','mardi',''],
    ['14h','','','mardi',''],
    ['15h','','','mardi',''],
    ['16h','','','mardi',''],
    ['17h','','','mardi',''],
    ['18h','','','mardi',''],
    ['19h','Français','Cour','mardi',''],
    ['20h','','','mardi',''],
    ['21h','','','mardi','']
  ]
  mercredi:string[][] = [
    ['8h','','','mercredi',''],
    ['9h','','','mercredi',''],
    ['10h','','','mercredi',''],
    ['11h','','','mercredi',''],
    ['12h','','','mercredi',''],
    ['13h','','','mercredi',''],
    ['14h','','','mercredi',''],
    ['15h','','','mercredi',''],
    ['16h','','','mercredi',''],
    ['17h','','','mercredi',''],
    ['18h','Français','Examen','mercredi',''],
    ['19h','','','mercredi',''],
    ['20h','','','mercredi',''],
    ['21h','','','mercredi','']
  ]
  jeudi:string[][] = [
    ['8h','','','jeudi',''],
    ['9h','','','jeudi',''],
    ['10h','','','jeudi',''],
    ['11h','','','jeudi',''],
    ['12h','','','jeudi',''],
    ['13h','','','jeudi',''],
    ['14h','','','jeudi',''],
    ['15h','','','jeudi',''],
    ['16h','','','jeudi',''],
    ['17h','','','jeudi',''],
    ['18h','','','jeudi',''],
    ['19h','','','jeudi',''],
    ['20h','','','jeudi',''],
    ['21h','','','jeudi','']
  ]
  vendredi:string[][] = [
    ['8h','','','vendredi',''],
    ['9h','','','vendredi',''],
    ['10h','','','vendredi',''],
    ['11h','','','vendredi',''],
    ['12h','','','vendredi',''],
    ['13h','','','vendredi',''],
    ['14h','','','vendredi',''],
    ['15h','','','vendredi',''],
    ['16h','','','vendredi',''],
    ['17h','Yassine','rdv','vendredi',''],
    ['18h','','','vendredi',''],
    ['19h','','','vendredi',''],
    ['20h','','','vendredi',''],
    ['21h','','','vendredi','']
  ]
  samedi:string[][] = [
    ['8h','','','samedi',''],
    ['9h','','','samedi',''],
    ['10h','','','samedi',''],
    ['11h','','','samedi',''],
    ['12h','','','samedi',''],
    ['13h','','','samedi',''],
    ['14h','','','samedi',''],
    ['15h','','','samedi',''],
    ['16h','','','samedi',''],
    ['17h','','','samedi',''],
    ['18h','','','samedi',''],
    ['19h','informatique','Examen','samedi',''],
    ['20h','','','samedi',''],
    ['21h','','','samedi','']
  ]
  dimanche:string[][] = [
    ['8h','','','dimanche',''],
    ['9h','','','dimanche',''],
    ['10h','','','dimanche',''],
    ['11h','','','dimanche',''],
    ['12h','','','dimanche',''],
    ['13h','','','dimanche',''],
    ['14h','','','dimanche',''],
    ['15h','','','dimanche',''],
    ['16h','','','dimanche',''],
    ['17h','','','dimanche',''],
    ['18h','Math','Examen','dimanche',''],
    ['19h','','','dimanche',''],
    ['20h','','','dimanche',''],
    ['21h','','','dimanche','']
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


  selectGroup(groupName:string,index?:number) {
    this.seanceItemGroupIndex = index!
    this.selectedSeanceGroup = groupName
    for(let i = 0; i < this.groupList!.length;i++) {

      if(groupName.toLowerCase() == this.groupList![i].groupName.toLowerCase()) {

        this.selectedSeanceGroup = groupName
        break
       } else {
         this.selectedSeanceGroup = "seance"
       }

    }
  this.getSeanceItems()
  }

  getGroups(groupName:string) {
    const querParam = new HttpParams().set('groupName', groupName);
    this.http.get(this.getGroupsURL,{params:querParam,responseType:'text'}).pipe(map((data) =>{
      this.groupList = JSON.parse(data)
    })).subscribe((res) =>{
    })
  }

  getBackgroundColor(type:string) {

    if (type != undefined) {
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
  return
  }
  getTextColor(type:string) {
    if(type == 'Examen') {

      return 'var(--dblue-them-color)'
     } else {
      return 'var(--white-them-color)'
     }

  }
  getBorder(type:string) {
    if(type == 'Examen') {

      return '1px solid var(--dblue-them-color)'
     } else {
      return ''
     }

  }
  ngOnInit(): void {

  }

}
