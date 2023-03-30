import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubule-chat',
  templateUrl: './bubule-chat.component.html',
  styleUrls: ['./bubule-chat.component.scss']
})
export class BubuleChatComponent implements OnInit {

  constructor() { }
  isWindowOpen?:boolean = true
  selectedGroup:string = 'dg' // dg -> discussions générales ; pri -> discussion privées

  availablePrivateDiscussionTest = [{name:'Private Discussion 1',amount_people:2},{name:'Private Discussion 2',amount_people:5},{name:'Private Discussion 3',amount_people:12},{name:'Private Discussion 4',amount_people:2},{name:'Private Discussion 5',amount_people:8},{name:'Private Discussion 6',amount_people:5},{name:'Private Discussion 7',amount_people:4},{name:'Private Discussion 8',amount_people:10},{name:'Private Discussion 9',amount_people:15},{name:'Private Discussion 10',amount_people:3} ]
  availableGlobalDiscussionTest = [{name:'Global Discussion 1',amount_people:12},{name:'Global Discussion 2',amount_people:11},{name:'Global Discussion 3',amount_people:8},{name:'Global Discussion 4',amount_people:4},{name:'Global Discussion 5',amount_people:30},{name:'Global Discussion 6',amount_people:9},{name:'Global Discussion 7',amount_people:9},{name:'Global Discussion 8',amount_people:5},{name:'Global Discussion 9',amount_people:6},{name:'Global Discussion 10',amount_people:12} ]
  selectedDiscussion:string = this.availableGlobalDiscussionTest[0].name

  messageDisplayed = [{id:1,content:"Wesh le Sang c'est comment ?",user:'William',time:'0'},{id:2,content:"Tranquille et toi ?",user:'Samuel',time:'1'},{id:3,content:"Oue tranquile le S ?",user:'William',time:'2'},{id:4,content:"Et bah alors ça donne plus de nouvelles ?",user:'William',time:'3'},{id:5,content:"Comme tu fais genre ahha",user:'Samuel',time:'5'},{id:6,content:"ça fait quand même 3 mois ta pas donné de nouvelles",user:'William',time:'7'},{id:7,content:"Ouè c'est vrai j'ai un peu abusé le S ahha",user:'Samuel',time:'7'},{id:8,content:"tqt c'est rien mon reuf",user:'William',time:'7'}]

  currentTime?:string

  sendMessage(username:string,message:string) {
    let time = new Date()
    this.currentTime = new Date(time.getTime()).toDateString()
    let transformedHours = time.getHours() + ':' + time.getMinutes()
    let object = {id:1,content:message,user:username,time: 'le ' + time.toLocaleDateString().replace(/Thu/g,' ') + ' à ' + time.getHours() + ':' + time.getMinutes() }
    this.messageDisplayed.push(object)

    console.log(transformedHours)
  }
  ngOnInit(): void {

  }

}
