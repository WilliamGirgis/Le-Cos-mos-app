import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor() { }
  value = '';
  psw ='';
  sendLoginForm(mail:string,psw:string) {

  }
  type = 'text'
  showHidePassword() {

    if(this.type === 'password') {
      this.type = 'text'
    } else {
    this.type = 'password'
    }
  }

  ngOnInit(): void {
  }

}
