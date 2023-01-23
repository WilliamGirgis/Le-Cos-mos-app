import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { GroupDefinission } from 'src/app/shared/group';
import { User } from 'src/app/shared/user';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';



@Component({
  selector: 'app-messagerie-view',
  templateUrl: './messagerie-view.component.html',
  styleUrls: ['./messagerie-view.component.scss']
})
export class MessagerieViewComponent implements OnInit {
  readonly getGroupeDiscussionRoute = "http://localhost:4200/chat/discussion"
  readonly modifyGroupeDiscussionRoute = "http://localhost:4200/chat/discussion/modify"
  readonly createGroupeDiscussionRoute = "http://localhost:4200/chat/create"
  readonly delUserUrlRoute = "http://localhost:4200/chat/user/del"
  readonly delDiscussionUrlRoute = "http://localhost:4200/chat/discussion/del"

  groupsDiscussionsTest?:GroupDefinission[] = [{ID:0,name:'TEST',user_list:[{email:'Will@gmail.com',firstname:'Willy',ID:0,lastname:'Girgis'},{email:'DanielAkgul@gmail.com',firstname:'Daniel',ID:1,lastname:'Akgul'}]},{ID:2,name:'TEST',user_list:[]}]
  groupsDiscussions:GroupDefinission[] = []
  userList:User[] = []

  readonly:boolean = true
  groupName?: string = 'New group'
  globalIndex:number = 0

  userListTest?:User[] = this.groupsDiscussionsTest![this.globalIndex].user_list

  constructor(private http: HttpClient,public dialog:MatDialog) {

    this.dialog.afterAllClosed.pipe(map((data) => {this.getGroupDiscussions(' ')})).subscribe(res => {})
  }

  openSaveUserPostForm() {
    this.dialog.open(AddUserDialogComponent, {width:'50vw',height:'80vh',data:{globalIndex:this.globalIndex,name:this.groupsDiscussions[this.globalIndex].name,userList:this.userList}})
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

       this.http.post(this.modifyGroupeDiscussionRoute,{newName:text,oldName:oldName,responseType:'text'}).pipe(map(async (data) =>{


        await this.getGroupDiscussions(' ')

      })).subscribe((res) => {

      })
     // document.getElementsByName('stylo')[i].style.transform = 'scale(0)'
    }

  }



  createDiscussionGroup(){


    return this.http.post(this.createGroupeDiscussionRoute,{name:this.groupName,responseType:'text'}).pipe(map(async (data) =>{


      await this.getGroupDiscussions(' ')

    })).subscribe((res) => {

    })
  }

 async getGroupDiscussions(groupName:string) {
    const querParam = new HttpParams().set('groupName', groupName);
   return  this.http.get(this.getGroupeDiscussionRoute,{params:querParam,responseType:'text'}).pipe(map((data) => {
      this.groupsDiscussions = JSON.parse(data)

      // console.log("groupsDiscussions = "+this.groupsDiscussions)
       console.log("user list = "+ this.userList as string)





       this.userList = this.groupsDiscussions[this.globalIndex].user_list!
    })).subscribe(res =>{})
  }

  selectGroup(index:number) {
    this.globalIndex = index
    this.userList = this.groupsDiscussions[this.globalIndex].user_list!
  }

  deletUser(user:User) {
    if(!window.confirm("Are you sure you wanna delete the user " + user.firstname  + " ?")) {

      return
        }

    return this.http.post(this.delUserUrlRoute,{user:user,groupName:this.groupsDiscussions[this.globalIndex].name,responseType:'text'}).pipe(map(async (data) =>{


       this.getGroupDiscussions(' ')

    })).subscribe((res) => {

    })

  }


  delDiscussionGroup(index:number) {
    if(!window.confirm("Are you sure you wanna delete the group " + this.groupsDiscussions[index].name  + " ?")) {

      return
        }

    return this.http.post(this.delDiscussionUrlRoute,{groupName:this.groupsDiscussions[index].name,responseType:'text'}).pipe(map(async (data) =>{


      this.getGroupDiscussions(' ')

   })).subscribe((res) => {

   })

  }



  ngOnInit(): void {
    this.getGroupDiscussions(' ')

  }

}
