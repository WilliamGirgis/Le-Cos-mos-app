 import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Discussion } from './discussion';
import { Message } from './message';
import { ChatService } from 'src/app/app.module';
import { HttpService } from 'src/app/services/http.services';

@Component({
  selector: 'app-bubule-chat',
  templateUrl: './bubule-chat.component.html',
  styleUrls: ['./bubule-chat.component.scss']
})
export class BubuleChatComponent implements OnInit, AfterContentChecked {
  globalIndex: number = 0
hotCount:number = 0
  @Output() getHotCount = new EventEmitter<string>();
  getHotCounts() {
return this.getHotCount.emit(`${this.hotCount}`)
  }
  onScrollMessageList() {
    if((document.getElementById('messageList')!.scrollTop >= (document.getElementById('messageList')!.scrollHeight - document.getElementById('messageList')!.offsetHeight))) {
      // code executed if scroll of the message list window is at the bottom

this.hotCount = 0
this.getHotCounts()
    }
  }

  constructor(private http: HttpClient, private chatService: ChatService,private httpService:HttpService) {

     this.httpService.getUsername()


    this.chatService?.getMessage().pipe(map((data) => {
      let discussionList = this.discussionTypeView == 'global' ? this.globalDiscussionList : this.privateDiscussionList
      this.getMessageList(discussionList[this.globalIndex].name)
      this.hotCount++
this.getHotCounts()
    })).subscribe((res) => {

    })
    this.chatService?.sendMessage('Hey')
  }

  async ngAfterContentChecked(): Promise<void> {
    // this.getMessageList()
    document.getElementById('blur')!.addEventListener('click', () => {
      this.isWindowOpen = false
      document.getElementById('blur')!.removeEventListener('click', () => {

      })
    })

  }
  isWindowOpen?: boolean = false
  discussionTypeView: string = 'global' // dg -> discussions générales ; pri -> discussion privées


  selectedDiscussion: string = ' '

  readonly sentMessageRoute = 'http://localhost:4200/chat/discussion/message/send'
  sendMessage(message: string) {
    setTimeout(() => { // This setTimeout is called because the content value of this.messageList is not updated in the DOM
      document.getElementById('messageList')!.scrollTo({
        top: document.getElementById("messageList")!.scrollHeight
      })

    }, 10)
    let time = new Date()
    let messageMetaData: Message = { message: message, emiter: this.httpService.user_name + ' ' + this.httpService.user_last_name, date: time.getTime() }
    const querParam = new HttpParams().set('groupName', this.selectedDiscussion);
    // this.messageDisplayed.push(msg)
    return this.http.post(this.sentMessageRoute, { messageMetaData, responseType: 'text' }, { params: querParam }).pipe(map(async (data: any) => {

      await Promise.resolve(this.getMessageList(this.selectedDiscussion))
    })).subscribe((res) => { })
  }

  textAreaValue?: string = ''





  // Get global discussion list
  readonly getGlobalDiscussionListRoute = 'http://localhost:4200/chat/discussion/global'
  globalDiscussionList: Discussion[] = [{
    name: '', discussionType: '', user_list: [
      {
        email: '', firstname: '', ID: 0, lastname: ''
      }
    ]
  }]
  async getGlobalDiscussionList():Promise<void> {
     await Promise.resolve(this.http.get(this.getGlobalDiscussionListRoute, { responseType: 'text' }).pipe(map((data) => {
      if(JSON.parse(data).length == 0 ) {
        return
      }
      this.globalDiscussionList = JSON.parse(data)
      this.getMessageList(this.globalDiscussionList[0].name)
    })).subscribe(res => { })

  )}
  // Get private discussion list
  readonly getPrivateDiscussionListRoute = 'http://localhost:4200/chat/discussion/private'

  privateDiscussionList: Discussion[] = [{
    name: '', discussionType: '', user_list: [
      {
        email: '', firstname: '', ID: 0, lastname: ''
      }
    ]
  }]
  async getPrivateDiscussionList():Promise<void> {
     await Promise.resolve(this.http.get(this.getPrivateDiscussionListRoute, { responseType: 'text' }).pipe(map((data) => {
      if(JSON.parse(data).length == 0 ) {
        return
      }
      this.privateDiscussionList = JSON.parse(data)
    })).subscribe(res => { }))

  }

  // Get message list (paramater : discussion_name)
  readonly getMessageListRoute = 'http://localhost:4200/chat/discussion/message/list'
  messageList: Message[] = [{ message: '', emiter: '', date: 0 }]
  user_name = this.httpService.user_name!
  user_last_name = this.httpService.user_last_name!
  async getMessageList(item: string) {
    this.selectedDiscussion = item;
    const querParam = new HttpParams().set('groupName', this.selectedDiscussion!);
     await Promise.resolve(this.http.get(this.getMessageListRoute, { params: querParam, responseType: 'text' }).pipe(map(async (data: any) => {
      if(JSON.parse(data).length == 0 ) {
        this.messageList = [{ message: ' ', emiter: ' ', date: 0 }]
        return
      }
      await Promise.resolve(
        this.messageList = JSON.parse(data)
      )
      for(let i = 0; i < this.messageList.length; i++) {

    let date = new Date(Number(this.messageList[i].date))
    let computed_Hour = date.getHours() < 10 ? '0' + +date.getHours() : +date.getHours()
    let computed_Minutes = date.getMinutes() < 10 ? '0' + +date.getMinutes() : +date.getMinutes()
    let final_hour = +computed_Hour + ':' +computed_Minutes
        this.messageList[i].date = 'Le ' + date.toLocaleDateString() + ' à ' + final_hour
      }
      setTimeout(() => { // This setTimeout is called because the content value of this.messageList is not updated in the DOM
        if (!(document.getElementById('messageList')!.scrollTop <= (document.getElementById('messageList')!.scrollHeight - 500))) {
          // code executed if scroll of the message list window is at the bottom
          document.getElementById('messageList')!.scrollTo({
            top: document.getElementById("messageList")!.scrollHeight
          })
        } else {
          return
        }

      }, 10)
    })).subscribe(res => { }))



  }


   async ngOnInit(): Promise<void> {

    await this.getGlobalDiscussionList()
    await this.getPrivateDiscussionList()

  }

}
