import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/shared/user';
import { Log } from 'src/app/shared/log';
import {MatPaginator} from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-gestion-view',
  templateUrl: './gestion-view.component.html',
  styleUrls: ['./gestion-view.component.scss'],
  animations :[
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GestionViewComponent implements OnInit,AfterViewInit {
  userListTest:User[] = [{ID:1,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:2,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:3,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:4,userType:'Professeur',firstname:'test',lastname:'testL',email:'HEY'},{ID:5,userType:'Professeur',firstname:'test',lastname:'testL',email:'HEY'},{ID:6,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:7,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:8,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:9,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:10,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'},{ID:11,userType:'Etudiant',firstname:'test',lastname:'testL',email:'HEY'}]
  userList: User[] = [];
  logList: Log[] = []
  logListTest: Log[] = [{ID:1,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:2,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:3,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:4,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:5,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:6,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'},{ID:7,firstname:'Willy',lastname:'Girgis',date:'25/02',action:'A tout niquer'}]
  noUser?:boolean = false
  expandedElement: any;
  userType?: string;
  successMsgSaved?:string
isSuccess?:boolean
user_IDList:string [] = []
view:string = 'Log' // by default
  readonly getUserIdULR = 'http://localhost:4200/user/users/id';
  readonly delUserURL = 'http://localhost:4200/user/users/del';
  readonly modifyUserURL = 'http://localhost:4200/user/users/modify';
  readonly getLogsUrl = "http://localhost:4200/log/logs"


  dataSource = new MatTableDataSource(this.userListTest)
  dataSourceLog = new MatTableDataSource(this.logListTest)


  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();
  @ViewChildren(MatSort) sort = new QueryList<MatSort>();



modifyUser(newFname:string,newLname:string,newEmail:string,id:number) {

        //let user = this.userList[id - 1].email! // Uncomment to set test mode
  //let user = this.userListTest[id - 1]! // Comment to unset test mode
  let newUser:User = {ID:id,userType:this.userType,firstname:newFname,lastname:newLname,email:newEmail,_id:this.user_IDList[id-1]}
  if(!window.confirm("Are you sure you wanna modify the user n°" + id  +  '?')) {
    return
      }
  return this.http
    .post(this.modifyUserURL, newUser)
    .pipe(
      map((data) => {
       this.successMsgSaved =  "User updated successfuly !"
       this.isSuccess = true
       this.setModifyView()
       this.getUsers(' ');
      })
    )
    .subscribe((result) => {});

}

  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) {

   }
  ngAfterViewInit(): void { /* comment for test mode*/

  this.dataSource.paginator = this.paginator.toArray()[1];
  this.dataSource.sort = this.sort.toArray()[1];
  this.dataSourceLog.paginator = this.paginator.toArray()[0];
  this.dataSourceLog.sort = this.sort.toArray()[0];

  }
  deleteUser(id:number) {

    if(!window.confirm("Are you sure you wanna delete " + id  + " ?")) {

      return
        }
        let em = this.userList[id - 1].email!
    const querParam = new HttpParams().set('email', em);
    this.http
      .get(this.delUserURL, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {
        this.getUsers(' ')
        })
      )
      .subscribe((result) => {});
  }
  applyFilter(event: Event) {

if(this.view == 'User') {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
} else if(this.view == 'Log') {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSourceLog.filter = filterValue.trim().toLowerCase();
}


  }


  setUserType(userType:any) {

    this.userType = userType
  }

  areTextAreasEditable?:boolean = false
  setModifyView() {

    if(this.areTextAreasEditable == false) {
      for(let i = 0; i< document.getElementsByTagName('textarea').length;i++) {
        document.getElementsByTagName('textarea')[i].removeAttribute('readonly')
        document.getElementsByTagName('textarea')[i].style.border = "1px"
      }
      this.areTextAreasEditable = true
    } else {
      for(let i = 0; i< document.getElementsByTagName('textarea').length;i++) {
        document.getElementsByTagName('textarea')[i].setAttribute('readonly','')
        document.getElementsByTagName('textarea')[i].style.border = "none"
      }
      this.areTextAreasEditable = false
    }

  }


  getLogs(input: string) {
    this.logList = []
    const querParam = new HttpParams().set('id', input);
    this.http
      .get(this.getLogsUrl, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {
         var parsed = JSON.parse(data) // Transformation en json, puis placement dans la var "parsed"
         for(var i = 0;i < parsed.length;i++) {
         //this.userList.push(JSON.parse({ID:parsed[i].id,firstname:parsed[i].firstname,lastname:parsed[i].lastname,email:parsed[i].email}))
       let logTemp:Log ={ID:i+ 1,UserID:'',firstname:parsed[i].firstname,lastname:parsed[i].lastname,date:parsed[i].date,action:parsed[i].action}
        this.logList.push(logTemp)
        console.log(logTemp)
      }
      console.log(this.logList)
      this.dataSourceLog = new MatTableDataSource(this.logList)
      this.dataSourceLog.paginator = this.paginator.toArray()[0];
      this.dataSourceLog.sort = this.sort.toArray()[0];
        })
      )
      .subscribe((result) => {});
  }

   getUsers(input: string) {
    this.userList = []
    const querParam = new HttpParams().set('id', input);
    this.http
      .get(this.getUserIdULR, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {
         var parsed = JSON.parse(data) // Transformation en json, puis placement dans la var "parsed"
         for(var i = 0;i < parsed.length;i++) {
         //this.userList.push(JSON.parse({ID:parsed[i].id,firstname:parsed[i].firstname,lastname:parsed[i].lastname,email:parsed[i].email}))
       let usertemp:User ={ID:i+ 1,userType:parsed[i].userType,firstname:parsed[i].firstname,lastname:parsed[i].lastname,email:parsed[i].email}
        this.userList.push(usertemp)
        this.user_IDList.push(parsed[i]._id)
      }
         this.dataSource = new MatTableDataSource(this.userList)
         this.dataSource.paginator = this.paginator.toArray()[1];
         this.dataSource.sort = this.sort.toArray()[1];
        })
      )
      .subscribe((result) => {});
  }

  switchColorStyle(id:number) {
    if(id % 2 === 0) {
     return {'background-color': 'var(--white-them-color)' ,'color': 'var(--dblue-them-color)','border-top': '1px solid var(--blue-them-color)','border-bottom': '1px solid var(--blue-them-color)'}
    } else {
      return {'background-color': 'var(--blue-them-color)' ,'color': 'var(--white-them-color)','border-color': 'var(--blue-them-color)','border-right':'none'}
    }
  }


  switchView() {
    if(this.view == 'User') {
      this.view = 'Log'
    }else if(this.view == 'Log') {
      this.view = 'User'
    }

  }

  columnsToDisplayUser = ['ID', 'firstname', 'lastname','Search'];
  columnsToDisplayLog = ['ID', 'firstname', 'lastname','date','action','Search'];

  ngOnInit(): void {

    this.getUsers(' ')
    this.getLogs(' ')
  }

}
