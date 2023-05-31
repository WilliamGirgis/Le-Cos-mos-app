import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterContentChecked, Component, EventEmitter, OnInit, Output,NgZone, Input, OnChanges, SimpleChanges  } from '@angular/core';
import { map } from 'rxjs/operators';
import { Discussion } from './discussion';
import { Message } from './message';
import { ChatService } from 'src/app/app.module';
import { HttpService } from 'src/app/services/http.services';
import { FileUploader } from 'ng2-file-upload';
import { saveAs } from 'file-saver';

const endpointUploadFile = "http://localhost:4200/chat/discussion/message/file/save"

const sentMessageRoute = 'http://localhost:4200/chat/discussion/message/send'
@Component({
  selector: 'app-bubule-chat',
  templateUrl: './bubule-chat.component.html',
  styleUrls: ['./bubule-chat.component.scss']
})
export class BubuleChatComponent implements OnInit {
  globalIndex: number = 0
  hotCount: number = 0
  isScrollLocked:boolean = true
  @Output() getHotCount = new EventEmitter<string>();

  loadingIndexFile?:number
  getHotCounts() {
    return this.getHotCount.emit(`${this.hotCount}`)
  }

  onScrollMessageList() {
    if ((document.getElementById('messageList')!.scrollTop >= (document.getElementById('messageList')!.scrollHeight - document.getElementById('messageList')!.offsetHeight))) {
      // code executed if scroll of the message list window is at the bottom
      this.isScrollLocked = true
      this.hotCount = 0
      this.getHotCounts()
    }

    // If the top is reached
    if(document.getElementById('messageList')!.scrollTop <= 0) {

      if(!this.isFetchingMessage) {
        this.message_limit += 10
        this.isScrollLocked = false
        this.getMessageList(this.selectedDiscussion)
      }


      // To make sure it is not at the top directly
      // document.getElementById('messageList')!.scrollTo({
      //   top: 300
      // })
    }
  }
@Input() inputBblChat?:boolean
  filename?: string
  constructor(private http: HttpClient, private chatService: ChatService, private httpService: HttpService,private ngZone: NgZone) {

    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Exécuter le code qui doit être exécuté après la mise à jour du template
          // code executed if scroll of the message list window is at the bottom
          document.getElementById('messageList')!.scrollTo({
            top: document.getElementById("messageList")!.scrollHeight
          })

      });
    });
    this.uploader!.onCompleteAll = () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      this.filename = undefined
      this.uploader.clearQueue()
    }
    this.uploader.onCompleteItem = (file) => {

    }
    this.uploader.onBeforeUploadItem = (file) => {
            // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript

      file.file.name = file.file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    }


    this.uploader!.onAfterAddingFile = (file) => {
      this.filename = file._file.name
    }
    this.chatService?.getMessage().pipe(map((data) => {

      let discussionList = this.discussionTypeView == 'global' ? this.globalDiscussionList : this.privateDiscussionList
      this.getMessageList(discussionList[this.globalIndex].name)
      this.hotCount++
      this.getHotCounts()

    })).subscribe((res) => {

    })
    // this.chatService?.sendMessage('Hey')
  }

  public uploader: FileUploader = new FileUploader({
    url: endpointUploadFile,
    queueLimit: 5,
    method: 'post',
  });

  @Input()isWindowOpen?:boolean
  discussionTypeView: string = 'global' // dg -> discussions générales ; pri -> discussion privées


  selectedDiscussion: string = ' '
isFetchingMessage?:boolean = false
  sendMessage(message: string) {
    let time = new Date()
    let fileArray = []

    for (let i = 0; i < this.uploader.queue.length; i++) {
      // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
      fileArray.push(this.uploader.queue[i]._file.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""))
    }
    let messageMetaData: Message = { message: message, emiter: this.httpService.user_name + ' ' + this.httpService.user_last_name, date: time.getTime(), filesName: fileArray }
    const querParam = new HttpParams().set('groupName', this.selectedDiscussion).set('_id',localStorage.getItem('user-id')!);
    return this.http.post(sentMessageRoute, { messageMetaData, responseType: 'text' }, { params: querParam }).pipe(map(async (data: any) => {

      if(this.uploader.queue.length > 0 ) {
        this.uploader.uploadAll()
      }
      this.isFetchingMessage = true
        let discussionList = this.discussionTypeView == 'global' ? this.globalDiscussionList : this.privateDiscussionList
        this.getMessageList(discussionList[this.globalIndex].name)


    })).subscribe((res) => { })
  }

  textAreaValue?: string = ''





  // Get global discussion list
  readonly getGlobalDiscussionListRoute = 'http://localhost:4200/chat/discussion/global'
  globalDiscussionList: Discussion[] = [{
    name: '', discussionType: '', user_list: [
    ]
  }]
  getGlobalDiscussionList() {


    new Promise((resolve,reject) =>{

    this.http.get(this.getGlobalDiscussionListRoute, { responseType: 'text' }).pipe(map(async (data) => {
      if (JSON.parse(data).length == 0) {
        reject(null)
      }

      this.globalDiscussionList = JSON.parse(data)
     resolve(null)

    })).subscribe(res => { })

    }).then((resolved) => {
 this.getMessageList(this.globalDiscussionList[0].name)
    }).catch((rejected) => {

    })



  }
  // Get private discussion list
  readonly getPrivateDiscussionListRoute = 'http://localhost:4200/chat/discussion/private'

  privateDiscussionList: Discussion[] = [{
    name: '', discussionType: '', user_list: [
    ]
  }]
  getPrivateDiscussionList() {
    this.http.get(this.getPrivateDiscussionListRoute, { responseType: 'text' }).pipe(map(async (data) => {

      if (JSON.parse(data).length == 0) {
        return
      }
      this.privateDiscussionList = JSON.parse(data)
    })).subscribe(res => { })

  }

  readonly downloadFileRoute = 'http://localhost:4200/chat/file'
  downloadFile(filename:string) {
    const querParam = new HttpParams().set('filename', filename)
    this.http.get(this.downloadFileRoute, { params: querParam,responseType:'blob' }).pipe(map(async (data: any) => {
      saveAs(data, filename);
      return
    })).subscribe((res) => {

    })


  }

  // Get message list (paramater : discussion_name)
  readonly getMessageListRoute = 'http://localhost:4200/chat/discussion/message/list'
  readonly getProfilPicturesListRoute = 'http://localhost:4200/chat/discussion/message/profilPicture/list'
  messageList: Message[] = [{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']},{date:0,emiter:'lux',message:'Hey',filesName:['test']}]
  profilePictureList:any = []
  imgFile:any = []
  async getProfilePicture(parsedData:any) {
this.profilePictureList = []
parsedData = [...new Set(parsedData)]
    for(let i = 0;i < parsedData.length;i++) {
      if(parsedData[i].user_id) {
                const param = new HttpParams().set('user_id', parsedData[i].user_id!)
        let requ = this.http.get(this.getProfilPicturesListRoute,{params:param,responseType:'blob'}).pipe(map((data:any)=>{
          this.profilePictureList.push(data)
          let img  = new File([data!], data.filename! ); // On transform le Blob en fichier
          let fr = new FileReader(); // On li le fichier et stock le nouveau format
          fr.readAsDataURL(img)
          fr.onloadend = () =>{
            // la donnée à afficher dans le parametre '[src]' de la balise image
            this.imgFile[i]=fr.result
          }
          return Promise.resolve(data)
        }))
       await new Promise<void>((resolve,reject) =>{


        requ.subscribe((res) =>{
          resolve()
        })

       }).then((data) =>{
       })
      }

    }


  }

message_limit:number = 25
  async getMessageList(item: string, event?: string) {
    this.isFetchingMessage = true
    if(event == 'click') {

      this.message_limit = 25
    }
    this.selectedDiscussion = item;
    const querParam = new HttpParams().set('groupName', this.selectedDiscussion!).set('message_list_length',this.message_limit);
    this.messageList = []
    await  new Promise((resolve,reject) =>{


     this.http.get(this.getMessageListRoute, { params: querParam, responseType: 'text' }).pipe(map( async (data: any) => {

      if (JSON.parse(data).length == 0) {
        this.messageList = []
        return
      }

      this.messageList = JSON.parse(data)

        this.getProfilePicture(JSON.parse(data))


      for (let i = 0; i < this.messageList.length; i++) {
        // Transform the intergers Date in the message list in the local date format
        let date = new Date(Number(this.messageList[i].date))
        let computed_Hour = date.getHours() < 10 ? '0' + +date.getHours() : +date.getHours()
        let computed_Minutes = date.getMinutes() < 10 ? '0' + +date.getMinutes() : +date.getMinutes()
        let final_hour = +computed_Hour + ':' + computed_Minutes
        this.messageList[i].date = 'Le ' + date.toLocaleDateString() + ' à ' + final_hour
      }

      if( event == 'click') {

        resolve(null)
      }
      if(!this.isScrollLocked) {
        // If the user has unLocked, then we return before executing scroll down
       reject(null)
      }


      resolve(null)
    })).subscribe(res => { })
    }).then((resolvedData) => {
      this.ngZone.runOutsideAngular(() => {
        setTimeout(() => {
          // Exécuter le code qui doit être exécuté après la mise à jour du template

          // code executed if scroll of the message list window is at the bottom
          document.getElementById('messageList')!.scrollTo({
            top: document.getElementById("messageList")!.scrollHeight
          })
        })
      });

    return

    }).catch((rejectedData) => {
      return
    })

  }

  user_name = localStorage.getItem('fname')!
  user_last_name = localStorage.getItem('lname')!

   ngOnInit() {
     this.getGlobalDiscussionList()
     this.getPrivateDiscussionList()
    this.httpService.getUsername().subscribe((res) => {
      this.user_name = this.httpService.user_name!
      this.user_last_name = this.httpService.user_last_name!
    })
  }


}

/*
Est-ce que tu sais me dire, comment forcer l'attente de la mise à jour du template, après que des données ai changé dans Angular avant de continuer l'exécution d'un code ?
ChatGPT
Oui, en Angular, lorsque des données sont modifiées, le changement n'est pas toujours immédiatement reflété dans le DOM. Au lieu de cela, Angular utilise une boucle de détection des modifications pour détecter les changements de données et mettre à jour le DOM en conséquence.

Si vous avez besoin d'attendre que la boucle de détection des modifications se termine avant de continuer l'exécution de votre code, vous pouvez utiliser la méthode NgZone.runOutsideAngular() pour exécuter votre code en dehors de la boucle de détection des modifications. De cette façon, votre code sera exécuté immédiatement, mais il ne mettra pas à jour le DOM jusqu'à ce que la boucle de détection des modifications se termine.

Voici un exemple de code qui utilise NgZone.runOutsideAngular() pour forcer l'attente de la mise à jour du template :

typescript
Copy code
import { Component, NgZone } from '@angular/core';

@Component({
  selector: 'app-example',
  template: `
    <div>{{ data }}</div>
    <button (click)="updateData()">Mettre à jour</button>
  `
})
export class ExampleComponent {
  data = 'Initial value';

  constructor(private ngZone: NgZone) {}

  updateData() {
    // Mettre à jour les données
    this.data = 'Nouvelle valeur';

    // Forcer l'attente de la mise à jour du template
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        // Exécuter le code qui doit être exécuté après la mise à jour du template
        console.log('Le template a été mis à jour');
      });
    });
  }
}
Dans cet exemple, NgZone.runOutsideAngular() est utilisé pour exécuter le code de la fonction de rappel de setTimeout() en dehors de la boucle de détection des modifications. Le code de la fonction de rappel ne sera exécuté qu'après que la boucle de détection des modifications se termine et que le template ait été mis à jour.

*/
