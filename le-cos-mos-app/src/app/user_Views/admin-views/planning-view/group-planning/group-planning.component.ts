import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Injectable, Input, OnInit, ViewChild,  } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {CdkDragDrop} from '@angular/cdk/drag-drop';
import { DateAdapter } from '@angular/material/core';
import { DateFilterFn, DateRange, MatDateRangeSelectionStrategy,MAT_DATE_RANGE_SELECTION_STRATEGY } from '@angular/material/datepicker';
//https://material.angular.io/components/datepicker/examples

export class DateRangePickerOverviewExample {
  rangeFilter(date: Date): boolean {
    return date.getDate() > 20;
  }
}

@Injectable()
export class FiveDayRangeSelectionStrategy<D> implements MatDateRangeSelectionStrategy<D> {
  constructor(private _dateAdapter: DateAdapter<D>) {

  }


  selectionFinished(date: D | null): DateRange<D> {
    return this._createFiveDayRange(date);
  }

  createPreview(activeDate: D | null): DateRange<D> {
    return this._createFiveDayRange(activeDate);
  }


  private _createFiveDayRange(date: D | null): DateRange<D> {
    if (date) {
      const start = this._dateAdapter.addCalendarDays(date, 0);
      const end = this._dateAdapter.addCalendarDays(date, 6);
      return new DateRange<D>(start, end);
    }

    return new DateRange<D>(null, null);
  }
}




@Component({
  selector: 'app-group-planning',
  templateUrl: './group-planning.component.html',
  styleUrls: ['./group-planning.component.scss'],
  providers:[
    {
      provide:MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass:FiveDayRangeSelectionStrategy
    }
  ]
})
export class GroupPlanningComponent implements OnInit {


  readonly getGroupsURL = "http://localhost:4200/planning/get"
  readonly getSeanceUrl = "http://localhost:4200/seance/get"
  readonly setSeanceUrl = "http://localhost:4200/seance/add"
  readonly delSeanceUrl = "http://localhost:4200/seance/del"
  readonly savePlanningUrl = "http://localhost:4200/planning/set"
  readonly getPlanningURL = "http://localhost:4200/planning/group/planning"

//https://material.angular.io/components/datepicker/examples
  //https://stackoverflow.com/questions/69322172/angular-material-date-range-date-filter-get-date-date-boolean-is-not-ass?rq=1
  rangeFilter: DateFilterFn<Date> = (date: Date | null) => { // Filtre pour le datePicker
    // Implementation
    return date?.getDay()! == 1 ;
  };

  getFirstMondayOfTheWeek():string {
    let now:number = Date.now() * 0.9999485;
    let date = new Date(now)
    let stringDateParsed = date.toDateString().split(' ')
    let daysAfterMonOfTheWeek:number = 0
    switch(stringDateParsed[0]) {
      case 'Mon':
      break
      case 'Tue':
        daysAfterMonOfTheWeek = 1
        break
        case 'Wed':
          daysAfterMonOfTheWeek = 2
          break
          case 'Thu':
            daysAfterMonOfTheWeek = 3
            break
            case 'Fri':
              daysAfterMonOfTheWeek = 4
              break
              case 'Sat':
                daysAfterMonOfTheWeek = 5
                break
                case 'Sun':
                  daysAfterMonOfTheWeek = 6
                  break
    }
    for(let i = 0; i < daysAfterMonOfTheWeek;i++) {
       now *= 0.9999485
    }
   date = new Date(now)
   let parsedDate = date.toDateString().split(' ')
   let year = parsedDate[3]
   let day = parsedDate[2]
   let month = parsedDate[1]
   switch(month) {
    case 'Jan':
      month = "01"
      break;
      case 'Feb':
        month = "02"
        break;
        case 'Mar':
          month = "03"
          break;
          case 'Apr':
            month = "04"
            break;
            case 'May':
              month = "05"
              break;
              case 'Jun':
                month = "06"
                break;
                case 'Jul':
                  month = "07"
                  break;
                  case 'Aug':
                    month = "08"
                    break;
                    case 'Sep':
                      month = "09"
                      break;
                      case 'Oct':
                        month = "10"
                        break;
                        case 'Nov':
                          month = "11"
                          break;
                          case 'Dec':
                            month = "12"
                            break;
   }

    return day + '/' + month + '/' + year

  }


  heureIndex:number = 0
  dayIndex:number= 0
  touched:boolean = false
  week:string = this.getFirstMondayOfTheWeek()


  groupLink = this.route.snapshot.paramMap.get('id')

  selectedSeanceGroup = 'Science de la vie'
  constructor(private http:HttpClient,private route: ActivatedRoute) {
    this.semaineJoursEmpty = this.semaineJours
    this.getGroups(this.groupLink!)
    this.getSeanceItems()
  }

  getSelectedDate(date:string) {
let seperatedDate = date.split('/')
seperatedDate[1] = +seperatedDate[1] < 10 ? '0' + seperatedDate[1] : seperatedDate[1]
seperatedDate[0] = +seperatedDate[0] < 10 ? '0' + seperatedDate[0] : seperatedDate[0]

this.week = seperatedDate[1] + '/' + seperatedDate[0] + '/' + seperatedDate[2]
this.getPlanning()
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
    this.touched = true
    this.semaineJours[day][creneau][1] = '' // Le nom : Math, Daniel, etc..
    this.semaineJours[day][creneau][2] = '' // Le type : Cour, Examen , Rdv
    this.semaineJours[day][creneau][4] = '' // La salle
      }

  async getSeanceItems() {
    const querParam = new HttpParams().set('link', this.groupLink!).set('groupName',this.selectedSeanceGroup!);
    return  this.http
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
    return this.http
       .post(this.delSeanceUrl, { index: index,groupName:this.selectedSeanceGroup })
       .pipe(
         map(async(data) => {
          await this.getSeanceItems()
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
        map(async (data) => {
         await this.getSeanceItems();
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
      let index = 0
     await tempArray.forEach(async (element:any) => {
      index++
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
  readonly semaineJoursEmpty?:string[][][]

  validatePlanning() {
    this.http.post(this.savePlanningUrl,{planning:this.semaineJours,planningOwner:this.groupLink,week:this.week}).pipe(map((data) => {
      this.touched = !this.touched
      this.getPlanning()
    })).subscribe((res) => {

    })

  }


  makeCalendarEmpty() {
    for(let i = 0; i < 7;i++) {
      for(let j = 0;j < 14;j++) {
          this.semaineJours[i][j][1] = ''
          this.semaineJours[i][j][2] = ''
          this.semaineJours[i][j][4] = ''
      }
    }
  }

  getPlanning() {
    const querParam = new HttpParams().set('groupName', this.groupLink!).set('week',this.week);
this.http.get(this.getPlanningURL,{params:querParam,responseType:'text'}).pipe(map((data) => {


  let planningSeance = JSON.parse(data)
  this.week = planningSeance.weekDate
  this.makeCalendarEmpty()
  if(planningSeance.seance.length == 0) {

    this.makeCalendarEmpty()

    return
  }


  for(let i = 0; i < planningSeance.seance.length;i++) {
    let x:number = +planningSeance.seance[i].creneau.split('h')[0]
    switch(planningSeance.seance[i].day) {

      case 'lundi':
      this.semaineJours[0][x -8][0] = planningSeance.seance[i].creneau
      this.semaineJours[0][x -8][1] = planningSeance.seance[i].matiere
      this.semaineJours[0][x -8][2] =  planningSeance.seance[i].type
      this.semaineJours[0][x -8][3] = planningSeance.seance[i].day
      this.semaineJours[0][x -8][4] =   planningSeance.seance[i].room
      break;
        case 'mardi':
        this.semaineJours[1][x -8][0] =  planningSeance.seance[i].creneau
        this.semaineJours[1][x -8][1] = planningSeance.seance[i].matiere
        this.semaineJours[1][x -8][2] =   planningSeance.seance[i].type
        this.semaineJours[1][x -8][3] =   planningSeance.seance[i].day
        this.semaineJours[1][x -8][4] =  planningSeance.seance[i].room
        break;
          case 'mercredi':
          this.semaineJours[2][x -8][0] =  planningSeance.seance[i].creneau
          this.semaineJours[2][x -8][1] =  planningSeance.seance[i].matiere
          this.semaineJours[2][x -8][2] =  planningSeance.seance[i].type
          this.semaineJours[2][x -8][3] =  planningSeance.seance[i].day
          this.semaineJours[2][x -8][4] =  planningSeance.seance[i].room
          break;
            case 'jeudi':
            this.semaineJours[3][x -8][0] =   planningSeance.seance[i].creneau
            this.semaineJours[3][x -8][1] =  planningSeance.seance[i].matiere
            this.semaineJours[3][x -8][2] =  planningSeance.seance[i].type
            this.semaineJours[3][x -8][3] =  planningSeance.seance[i].day
            this.semaineJours[3][x -8][4] =  planningSeance.seance[i].room
            break;
              case 'vendredi':
              this.semaineJours[4][x -8][0] =   planningSeance.seance[i].creneau
              this.semaineJours[4][x -8][1] =   planningSeance.seance[i].matiere
              this.semaineJours[4][x -8][2] =  planningSeance.seance[i].type
              this.semaineJours[4][x -8][3] =   planningSeance.seance[i].day
              this.semaineJours[4][x -8][4] =  planningSeance.seance[i].room
              break;
                case 'samedi':
                this.semaineJours[5][x -8][0] =   planningSeance.seance[i].creneau
                this.semaineJours[5][x -8][1] =  planningSeance.seance[i].matiere
                this.semaineJours[5][x -8][2] =  planningSeance.seance[i].type
                this.semaineJours[5][x -8][3] =  planningSeance.seance[i].day
                this.semaineJours[5][x -8][4] =   planningSeance.seance[i].room
                break;
                  case 'dimanche':
                  this.semaineJours[6][x -8][0] = planningSeance.seance[i].creneau
                  this.semaineJours[6][x -8][1] =   planningSeance.seance[i].matiere
                  this.semaineJours[6][x -8][2] =   planningSeance.seance[i].type
                  this.semaineJours[6][x -8][3] =  planningSeance.seance[i].day
                  this.semaineJours[6][x -8][4] =  planningSeance.seance[i].room
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
    this.getFirstMondayOfTheWeek()
  }

}
