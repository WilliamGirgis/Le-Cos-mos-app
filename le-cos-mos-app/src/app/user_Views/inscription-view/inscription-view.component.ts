import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inscription-view',
  templateUrl: './inscription-view.component.html',
  styleUrls: ['./inscription-view.component.scss']
})
export class InscriptionViewComponent implements OnInit {

  firstname=""
  lastname=""
  email=""
  psw1=""
  psw2=""

  constructor() { }

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
