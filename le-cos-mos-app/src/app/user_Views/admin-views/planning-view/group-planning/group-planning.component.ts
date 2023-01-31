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


  readonly getGroupsURL = "http://localhost:4200/planning/get"
  readonly getSeanceUrl = "http://localhost:4200/seance/get"
  readonly setSeanceUrl = "http://localhost:4200/seance/add"
  readonly delSeanceUrl = "http://localhost:4200/seance/del"
  readonly savePlanningUrl = "http://localhost:4200/planning/set"
  readonly getPlanningURL = "http://localhost:4200/planning/group/planning"

  heureIndex:number = 0
  dayIndex:number= 0
  touched:boolean = false

  week:string = '19/01/2023'
  groupLink = this.route.snapshot.paramMap.get('id')

  selectedSeanceGroup = 'Science de la vie'
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


  groupList?:any [] = []

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
      this.touched = true
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
    this.http.get(this.getGroupsURL,{params:querParam,responseType:'text'}).pipe(map(async (data) =>{

      let tempArray = JSON.parse(data)
     await tempArray.forEach((element:any) => {
        if(element.type === 'Group') {
          this.groupList!.push(element)
        }

      });
      this.getPlanning()
    })).subscribe((res) =>{
    })
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
    ['8h','','','lundi',''],
    ['9h','','','lundi',''],
    ['10h','','','lundi',''],
    ['11h','','','lundi',''],
    ['12h','','','lundi',''],
    ['13h','','','lundi',''],
    ['14h','','','lundi',''],
    ['15h','','','lundi',''],
    ['16h','','','lundi',''],
    ['17h','','','lundi',''],
    ['18h','','','lundi',''],
    ['19h','','','lundi',''],
    ['20h','','','lundi',''],
    ['21h','','','lundi','']
  ]

  mardi:string[][] = [
    ['8h','','','mardi',''],
    ['9h','','','mardi',''],
    ['10h','','','mardi',''],
    ['11h','','','mardi',''],
    ['12h','','','mardi',''],
    ['13h','','','mardi',''],
    ['14h','','','mardi',''],
    ['15h','','','mardi',''],
    ['16h','','','mardi',''],
    ['17h','','','mardi',''],
    ['18h','','','mardi',''],
    ['19h','','','mardi',''],
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
    ['18h','','','mercredi',''],
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
    ['17h','','','vendredi',''],
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
    ['19h','','','samedi',''],
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
    ['18h','','','dimanche',''],
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

  validatePlanning() {
    this.http.post(this.savePlanningUrl,{planning:this.semaineJours,planningOwner:this.groupLink,week:this.week}).pipe(map((data) => {
      this.touched = !this.touched
      this.getPlanning()
    })).subscribe((res) => {

    })

  }


  checkCreneau(seance:any) {
    let res
    switch(seance) {
      case '8h':
       res =  0
       break
        case '9h':
          res =  1
          break
          case '10h':
            res = 2
            break
            case '11h':
              res = 3
              break
              case '12h':
                res = 4
                break
                case '13h':
                  res = 5
                  break
                  case '14h':
                    res = 6
                    break
                    case '15h':
                      res = 7
                      break
                      case '16h':
                        res = 8
                        break
                        case '17h':
                          res = 9
                          break
                          case '18h':
                            res = 10
                            break
                            case '19h':
                              res = 11
                              break
                              case '20h':
                                res = 12
                                break
                                case '21h':
                                  res = 13
                                  break
                                  default:
                                    return null


    }

    return res
  }

  getPlanning() {
    const querParam = new HttpParams().set('groupName', this.groupLink!).set('week',this.week);
this.http.get(this.getPlanningURL,{params:querParam,responseType:'text'}).pipe(map((data) => {
  let planningSeance = JSON.parse(data)
  this.week = planningSeance.weekDate
  for(let i = 0; i < planningSeance.seance.length;i++) {
    switch(planningSeance.seance[i].day) {

      case 'lundi':
      this.semaineJours[0][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
      this.semaineJours[0][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
      this.semaineJours[0][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
      this.semaineJours[0][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
      this.semaineJours[0][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
      break;
        case 'mardi':
        this.semaineJours[1][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
        this.semaineJours[1][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
        this.semaineJours[1][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
        this.semaineJours[1][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
        this.semaineJours[1][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
        break;
          case 'mercredi':
          this.semaineJours[2][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
          this.semaineJours[2][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
          this.semaineJours[2][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
          this.semaineJours[2][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
          this.semaineJours[2][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
          break;
            case 'jeudi':
            this.semaineJours[3][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
            this.semaineJours[3][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
            this.semaineJours[3][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
            this.semaineJours[3][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
            this.semaineJours[3][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
            break;
              case 'vendredi':
              this.semaineJours[4][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
              this.semaineJours[4][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
              this.semaineJours[4][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
              this.semaineJours[4][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
              this.semaineJours[4][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
              break;
                case 'samedi':
                this.semaineJours[5][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
                this.semaineJours[5][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
                this.semaineJours[5][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
                this.semaineJours[5][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
                this.semaineJours[5][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
                break;
                  case 'dimanche':
                  this.semaineJours[6][this.checkCreneau(planningSeance.seance[i].creneau)!][0] = planningSeance.seance[i].creneau
                  this.semaineJours[6][this.checkCreneau(planningSeance.seance[i].creneau)!][1] = planningSeance.seance[i].matiere
                  this.semaineJours[6][this.checkCreneau(planningSeance.seance[i].creneau)!][2] = planningSeance.seance[i].type
                  this.semaineJours[6][this.checkCreneau(planningSeance.seance[i].creneau)!][3] = planningSeance.seance[i].day
                  this.semaineJours[6][this.checkCreneau(planningSeance.seance[i].creneau)!][4] = planningSeance.seance[i].room
                  break;

    }

  }
})).subscribe((res) => {})
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
