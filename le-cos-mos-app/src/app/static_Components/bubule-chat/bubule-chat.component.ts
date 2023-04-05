import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { Discussion } from './discussion';
import { Message } from './message';
import { ChatService } from 'src/app/app.module';

@Component({
  selector: 'app-bubule-chat',
  templateUrl: './bubule-chat.component.html',
  styleUrls: ['./bubule-chat.component.scss']
})
export class BubuleChatComponent implements OnInit,AfterContentChecked {
  globalIndex:number = 0
  constructor(private http:HttpClient  ,private chatService:ChatService) {

    this.chatService?.getMessage().pipe(map((data) =>{
      console.log(data)
      let discussionList = this.discussionTypeView == 'global' ? this.globalDiscussionList : this.privateDiscussionList
      this.getMessageList(discussionList[this.globalIndex].name)
          })).subscribe((res) => {

          })
          this.chatService?.sendMessage('Hey')
  }

  ngAfterContentChecked(): void {
    // this.getMessageList()
    document.getElementById('blur')!.addEventListener('click', () => {
      this.isWindowOpen = false
      document.getElementById('blur')!.removeEventListener('click', () => {

      })
    })
  }
  isWindowOpen?:boolean = false
  discussionTypeView:string = 'global' // dg -> discussions générales ; pri -> discussion privées


  selectedDiscussion:string = ' '

  messageListTest = [{id:1,content:'Oue oue oue',user:'Samuel',time:'le 31/03/2023 à 16:21'},{id:3,content:"Wesh le SS",user:'William',time:'le 31/03/2023 à 16:21'},{id:4,content:"Et bah alors ça donne plus de nouvelles ?",user:'William',time:'le 31/03/2023 à 16:21'},{id:5,content:"Comme tu fais genre ahha",user:'Samuel',time:'le 31/03/2023 à 16:21'},{id:6,content:"ça fait quand même 3 mois ta pas donné de nouvelles",user:'William',time:'le 31/03/2023 à 16:21'},{id:7,content:"Ouè c'est vrai j'ai un peu abusé le S ahha",user:'Samuel',time:'le 31/03/2023 à 16:21'},{id:8,content:"tqt c'est rien mon reuf",user:'William',time:'le 31/03/2023 à 16:21'}]


  readonly sentMessageRoute = 'http://localhost:4200/chat/discussion/message/send'
  sendMessage(message:string) {

    let time = new Date()
    let messageMetaData:Message   = {message:message,emiter:this.user_id!,date:time.getTime()}
const querParam = new HttpParams().set('groupName', this.selectedDiscussion);
        // this.messageDisplayed.push(msg)
        return this.http.post(this.sentMessageRoute, {messageMetaData, responseType: 'text'}, { params:querParam }).pipe(map((data:any) => {

  this.getMessageList(this.selectedDiscussion)
        document.getElementById('messageList')!.scrollTo({
          top: document.getElementById("messageList")!.scrollHeight,
      behavior:'auto'    })
        })).subscribe(res => { })
    }

    textAreaValue?:string = ''



  // Get the username
  readonly getUserNameUrl = 'http://localhost:4200/user/user/get'
  user_id?:string = localStorage.getItem('user-id')!
  user?:any
  user_name?:string
  getUsername() {
      const querParam = new HttpParams().set('id', this.user_id!);
      return this.http.get(this.getUserNameUrl, { params: querParam, responseType: 'text' }).pipe(map((data:any) => {
      this.user_name = data.firstname
      })).subscribe(res => { })

  }
  globalDiscussionListTest?: Discussion[] = [{name: 'Global', user_list: [{ email: 'Will@gmail.com', firstname: 'Willy', ID: 0, lastname: 'Girgis' }, { email: 'DanielAkgul@gmail.com', firstname: 'Daniel Global', ID: 1, lastname: 'Akgul' }] }, { name: 'Global 2', user_list: [] }]
  privateDiscussionListTest?: Discussion[] = [{name: 'Private', user_list: [{ email: 'Will@gmail.com', firstname: 'Willy', ID: 0, lastname: 'Girgis' }, { email: 'DanielAkgul@gmail.com', firstname: 'Daniel Private', ID: 1, lastname: 'Akgul' }] }, { name: 'Private 2', user_list: [] }]

  // Get global discussion list
  readonly getGlobalDiscussionListRoute = 'http://localhost:4200/chat/discussion/global'
  globalDiscussionList:Discussion[] = []
  getGlobalDiscussionList() {
    return this.http.get(this.getGlobalDiscussionListRoute, {responseType: 'text' }).pipe(map((data) => {
    this.globalDiscussionList = JSON.parse(data)
    console.log(this.globalDiscussionList)
    })).subscribe(res => { })

}
  // Get private discussion list
  readonly getPrivateDiscussionListRoute = 'http://localhost:4200/chat/discussion/private'
  privateDiscussionList:Discussion [] = []
  getPrivateDiscussionList() {
    return this.http.get(this.getPrivateDiscussionListRoute, {responseType: 'text' }).pipe(map((data) => {
    this.privateDiscussionList = JSON.parse(data)
    console.log(this.privateDiscussionList)
    })).subscribe(res => { })

}

  // Get message list (paramater : discussion_name)
  readonly getMessageListRoute = 'http://localhost:4200/chat/discussion/message/list'
  messageList:Message [] = []
  getMessageList(item:string) {
    this.selectedDiscussion = item;
    const querParam = new HttpParams().set('groupName', this.selectedDiscussion!);
    return this.http.get(this.getMessageListRoute, { params: querParam, responseType: 'text' }).pipe(map((data:any) => {
    console.log(data)
this.messageList = JSON.parse(data)
    })).subscribe(res => { })

}


  ngOnInit(): void {

    this.getUsername()
    this.getGlobalDiscussionList()
    this.getPrivateDiscussionList()
  }

}
