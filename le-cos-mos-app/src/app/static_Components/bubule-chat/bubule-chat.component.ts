import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bubule-chat',
  templateUrl: './bubule-chat.component.html',
  styleUrls: ['./bubule-chat.component.scss']
})
export class BubuleChatComponent implements OnInit {

  constructor() { }
  isWindowOpen?:boolean = true

  groupTest = [{name:'Discussion 1'},{name:'Discussion 2'},{name:'Discussion 3'}]
  availableDiscussionTest = [{name:'Discussion 1'},{name:'Discussion 2'},{name:'Discussion 3'},{name:'Discussion 4'},{name:'Discussion 5'},{name:'Discussion 6'},{name:'Discussion 7'},{name:'Discussion 8'},{name:'Discussion 9'},{name:'Discussion 10'} ]
  ngOnInit(): void {

  }

}
