import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, map } from 'rxjs';
import { GroupDefinission } from 'src/app/shared/group';
import { User } from 'src/app/shared/user';
import { Discussion } from 'src/app/static_Components/bubule-chat/discussion';
import { AddUserDialogComponent } from './add-user-dialog/add-user-dialog.component';



@Component({
  selector: 'app-messagerie-view',
  templateUrl: './messagerie-view.component.html',
  styleUrls: ['./messagerie-view.component.scss']
})
export class MessagerieViewComponent implements OnInit {

  readonly modifyGroupeDiscussionRoute = "http://localhost:4200/chat/discussion/modify"
  readonly delUserUrlRoute = "http://localhost:4200/chat/discussion/user/del"
  readonly delDiscussionUrlRoute = "http://localhost:4200/chat/discussion/del"

  readonly: boolean = true
  globalIndex: number = 0

  constructor(private http: HttpClient, public dialog: MatDialog) {

    this.dialog.afterAllClosed.pipe(map((data) => {
      this.getGlobalDiscussionList()
      // this.getPrivateDiscussionList()
     })).subscribe(res => { })
  }

  openSaveUserPostForm() {
    const groupDiscussion =  this.discussionTypeView == 'global' ?  this.globalDiscussionList[this.globalIndex] : this.privateDiscussionList[this.globalIndex]
    this.dialog.open(AddUserDialogComponent, { width: '50vw', height: '80vh', data: {discussionId: groupDiscussion._id, userList: groupDiscussion.user_list} })
  }

  suppressReadOnly(i: number, text: string) {
    this.readonly = !this.readonly
    let oldName = document.getElementsByName('groups')[i].innerHTML
    if (!this.readonly) {
      document.getElementsByName('groups')[i].removeAttribute('readonly')
      document.getElementsByName('groups')[i].style.backgroundColor = 'var(--white-them-color)'
      document.getElementsByName('groups')[i].style.color = 'var(--blue-them-color)'
      // document.getElementsByName('stylo')[i].style.transform = 'scale(1)'
    } else {
      document.getElementsByName('groups')[i].setAttribute('readonly', '')
      document.getElementsByName('groups')[i].style.backgroundColor = 'var(--blue-them-color)'
      document.getElementsByName('groups')[i].style.color = 'var(--white-them-color)'

      this.http.post(this.modifyGroupeDiscussionRoute, { newName: text, oldName: oldName, responseType: 'text' }).pipe(map(async (data) => {


        this.getGlobalDiscussionList()
        // this.getPrivateDiscussionList()

      })).subscribe((res) => {

      })
      // document.getElementsByName('stylo')[i].style.transform = 'scale(0)'
    }

  }

/* Create-discussion function */

  readonly createPrivateGroupeDiscussionRoute = "http://localhost:4200/chat/discussion/create"
  createDiscussionGroup(groupName:string) {
    const querParam = new HttpParams().set('_id', localStorage.getItem('user-id')!).set('isDual',false);

    return this.http.post(this.createPrivateGroupeDiscussionRoute, { name: groupName,discussionType:this.discussionTypeView, responseType: 'text' },{params:querParam}).pipe(map( (data) => {

      this.getGlobalDiscussionList()
      // this.getPrivateDiscussionList()
    })).subscribe((res) => {

    })
  }

  // Get related discussion
  readonly getGlobalDiscussionListRoute = 'http://localhost:4200/chat/discussion/global'
  readonly getPrivateDiscussionListRoute = 'http://localhost:4200/chat/discussion/private'
  globalDiscussionList: Discussion[] =  []
  privateDiscussionList: Discussion[] =  []
  // Get global discussion list
  getGlobalDiscussionList() {
    let params = new HttpParams().set('_id',localStorage.getItem('user-id')!)
    return this.http.get(this.getGlobalDiscussionListRoute, {params:params, responseType: 'text' }).pipe(map((data) => {
      if(JSON.parse(data).length == 0 ) {
        return
      }
    this.globalDiscussionList = JSON.parse(data)
    })).subscribe(res => { })

}

//   getPrivateDiscussionList() {
//     let params = new HttpParams().set('_id',localStorage.getItem('user-id')!)
//     this.http.get(this.getPrivateDiscussionListRoute, {params:params, responseType: 'text' }).pipe(map(async (data) => {

//       if (JSON.parse(data).length == 0) {
//         return
//       }
//       this.privateDiscussionList = JSON.parse(data)
//     })).subscribe(res => { })

// }

  /*Select discussion related method */
  discussionTypeView:string = 'global'
  selectDiscussion(index: number) {
    this.globalIndex = index
  }



  deletUser(user: User) {
    if (!window.confirm("Are you sure you wanna delete the user " + user.firstname + " ?")) {

      return
    }
let discussionId = this.discussionTypeView == 'global' ? this.globalDiscussionList[this.globalIndex]._id : this.privateDiscussionList[this.globalIndex]._id

    return this.http.post(this.delUserUrlRoute, { user: user, discussionId: discussionId, responseType: 'text' }).pipe(map(async (data) => {

      this.getGlobalDiscussionList()
      // this.getPrivateDiscussionList()

    })).subscribe((res) => {

    })

  }


  delDiscussionGroup(discussionId:string) {
    if (!window.confirm("Are you sure you wanna delete the group " + discussionId + " ?")) {

      return
    }

    return this.http.post(this.delDiscussionUrlRoute, { discussionId: discussionId, responseType: 'text' }).pipe(map(async (data) => {


      this.getGlobalDiscussionList()
      // this.getPrivateDiscussionList()

    })).subscribe((res) => {

    })

  }



  ngOnInit(): void {

    this.getGlobalDiscussionList()
    // this.getPrivateDiscussionList()
  }

}
