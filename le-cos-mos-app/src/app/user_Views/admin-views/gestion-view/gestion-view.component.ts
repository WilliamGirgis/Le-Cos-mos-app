import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { User } from 'src/app/shared/user';
import {MatPaginator} from '@angular/material/paginator';
export interface PeriodicElement {
lastname:string,
firstname:string,
email:string
}

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
  userListTest:User[] = [{ID:1,firstname:'test',lastname:'testL',email:'HEY'},{ID:2,firstname:'test',lastname:'testL',email:'HEY'},{ID:3,firstname:'test',lastname:'testL',email:'HEY'},{ID:4,firstname:'test',lastname:'testL',email:'HEY'},{ID:5,firstname:'test',lastname:'testL',email:'HEY'}]
  userList: User[] = [];
  noUser?:boolean = false
  userSelected:User | undefined | string
  global_ID: string | undefined;
  readonly getUserIdULR = 'http://localhost:4200/user/users/id';
  readonly getUser_IdULR = 'http://localhost:4200/user/users/_id';
  readonly delUserURL = 'http://localhost:4200/user/users/del';


  dataSource = new MatTableDataSource(this.userListTest)


expandedElement:PeriodicElement| any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator | null;

modifyUser(id:string) {

}

whiteNBlueClass() {


  /*if() {

  } else {

  }*/
}

  constructor(private http: HttpClient, private route: ActivatedRoute,private router:Router) { }
  ngAfterViewInit(): void { /* comment for test mode*/
    this.dataSource.paginator = this.paginator;
  }
  deleteUser(id:string) {
    if(!window.confirm("Are you sure you wanna delete " + id + " ?")) {
      return
        }
    const querParam = new HttpParams().set('email', id);
    console.log(id)
    //this.router.navigate(['/clientUpload'])
    this.http
      .get(this.delUserURL, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {
        console.log("User deleted :" + data )
        this.getUsers(' ')
        })
      )
      .subscribe((result) => {});
  }
  applyFilter(event: Event) {


    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }



  async getUsers(input: string) {
    this.userList = []
    const querParam = new HttpParams().set('id', input);
    this.http
      .get(this.getUserIdULR, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {
          console.log("DATA = " + data)
         var parsed = JSON.parse(data) // Transformation en json, puis placement dans la var "parsed"
         console.log("Parsed = " + parsed)
         for(var i = 0;i < parsed.length;i++) {
          console.log("ID = " + i )
         //this.userList.push(JSON.parse({ID:parsed[i].id,firstname:parsed[i].firstname,lastname:parsed[i].lastname,email:parsed[i].email}))
       let usertemp:User ={ID:i+ 1,firstname:parsed[i].firstname,lastname:parsed[i].lastname,email:parsed[i].email}
        this.userList.push(usertemp)
      }

         this.dataSource = new MatTableDataSource(this.userList)
         this.dataSource.paginator = this.paginator;
         console.log('this.dataSource = ' + this.dataSource)
        })
      )
      .subscribe((result) => {});
  }


   getuser_ID(id: string):Promise<any> {

    const querParam = new HttpParams().set('id', id);
     return this.http
      .get(this.getUser_IdULR, { params: querParam, responseType: 'text' })
      .pipe(
        map((data) => {

this.global_ID = data
console.log("data got for getuser_ID = " + this.global_ID)
        })
      )
      .toPromise();
  }

  isOverDeleteButton = false
  unsetDataRowAnimation() {
    console.log("IN")
this.isOverDeleteButton = true

  }
  setDataRownAnimation() {
    this.isOverDeleteButton = false
    console.log("OUT")
  }

  columnsToDisplay = ['ID', 'firstname', 'lastname','email','Search'];

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.getUsers(' ')

  }

}
