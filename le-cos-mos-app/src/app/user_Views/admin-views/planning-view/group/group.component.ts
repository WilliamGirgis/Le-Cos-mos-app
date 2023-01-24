import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { PlanningGroup } from 'src/app/shared/planning-group';
import { User } from 'src/app/shared/user';
import { AddUserToGroupComponent } from './add-user-to-group/add-user-to-group.component';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {

  readonly getGroupsURL = "http://localhost:4200/planning/get"
  readonly createGroupRoute = "http://localhost:4200/planning/group/create"
  readonly modifyGroupNameRoute = "http://localhost:4200/planning/group/modify"
  readonly delUserUrlRoute = "http://localhost:4200/planning/user/del"
  readonly delGroupUrlRoute = "http://localhost:4200/planning/group/del"
  readonly:boolean = true
  globalIndex:number = 0
  view:string = 'Groupe'
  userList:User [] = []
  userListTest:User [] = [{email:'Willy@gmail.com',firstname:'Willy',ID:1,lastname:'Girgis',userType:'Professeur'},{email:'Adrien@gmail.com',firstname:'Adrien',ID:2,lastname:'Akgul',userType:'Etudiant'},{email:'Daniel@gmail.com',firstname:'Daniel',ID:3,lastname:'Akgul',userType:'Etudiant'}]
  groups:PlanningGroup[] = []
  groupsTest?:PlanningGroup[] = [{ID:0,groupName:'Group Sience de la vie et de la terre',user_list:[{email:'',firstname:'Willy',ID:'',lastname:''},{email:'',firstname:'Willy2',ID:1,lastname:''}]},{ID:1,groupName:'Group de physique chimie',user_list:[]}]
  groupName?:string | String = 'NoGroup'

  constructor(private http:HttpClient,public dialog:MatDialog) {
    this.dialog.afterAllClosed.pipe(map((data) => {this.getGroups(' ')})).subscribe(res => {})

  }

  getGroups(groupName:string) {

    const querParam = new HttpParams().set('groupName', groupName);
    this.http.get(this.getGroupsURL,{params:querParam,responseType:'text'}).pipe(map((data) =>{
      this.groups = JSON.parse(data)
      this.userList = JSON.parse(data)[this.globalIndex].user_list!
      this.groupName = this.groups[this.globalIndex].groupName
    })).subscribe((res) =>{

    })

  }
  createGroup(){


    return this.http.post(this.createGroupRoute,{name:this.groupName,responseType:'text'}).pipe(map(async (data) =>{


      await this.getGroups(' ')

    })).subscribe((res) => {

    })
  }


  openSaveUserPostForm() {
    this.dialog.open(AddUserToGroupComponent, {width:'50vw',height:'80vh',data:{globalIndex:this.globalIndex,name:this.groups[this.globalIndex].groupName,userList:this.userList}})
  }



  suppressReadOnly(i:number,text:string) {
    this.readonly = !this.readonly
    let oldName = document.getElementsByName('groups')[i].innerHTML
    if(!this.readonly) {
      document.getElementsByName('groups')[i].removeAttribute('readonly')
      document.getElementsByName('groups')[i].style.backgroundColor = 'var(--white-them-color)'
      document.getElementsByName('groups')[i].style.color = 'var(--blue-them-color)'
     // document.getElementsByName('stylo')[i].style.transform = 'scale(1)'
    } else {
      document.getElementsByName('groups')[i].setAttribute('readonly','')
      document.getElementsByName('groups')[i].style.backgroundColor = 'var(--blue-them-color)'
      document.getElementsByName('groups')[i].style.color = 'var(--white-them-color)'

       this.http.post(this.modifyGroupNameRoute,{newName:text,oldName:oldName,responseType:'text'}).pipe(map(async (data) =>{
         this.getGroups(' ')
      })).subscribe((res) => {

      })
     // document.getElementsByName('stylo')[i].style.transform = 'scale(0)'
    }

  }

  deletUser(user:User) {
    if(!window.confirm("Are you sure you wanna delete the user " + user.firstname  + " ?")) {

      return
        }

    return this.http.post(this.delUserUrlRoute,{user:user,groupName:this.groups[this.globalIndex].groupName,responseType:'text'}).pipe(map(async (data) =>{


       this.getGroups(' ')

    })).subscribe((res) => {

    })

  }


  delDiscussionGroup(index:number) {
    if(!window.confirm("Are you sure you wanna delete the group " + this.groups[index].groupName  + " ?")) {

      return
        }

    return this.http.post(this.delGroupUrlRoute,{groupName:this.groups[index].groupName,responseType:'text'}).pipe(map(async (data) =>{


      this.getGroups(' ')

   })).subscribe((res) => {

   })

  }
  selectGroup(index:number) {
    this.globalIndex = index
    this.groupName = this.groups[this.globalIndex].groupName
    this.userList = this.groups[this.globalIndex].user_list!
  }
  ngOnInit(): void {
    this.getGroups(' ')
  }

}
