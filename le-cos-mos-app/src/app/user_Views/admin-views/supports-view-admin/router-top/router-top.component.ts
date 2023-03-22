import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-router-top',
  templateUrl: './router-top.component.html',
  styleUrls: ['./router-top.component.scss']
})
export class RouterTopComponent implements OnInit {

  constructor(private router:Router) { }
  globalBlock = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
  contentName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 2]
  blockName = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 3]
  blockContentList = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]


  cleanContent = this.contentName.replace(/%20/g,' ')
  globalBlockClean = this.cleanContent.replace(/%20/g,' ').replace(/%C3%A9/,'e')
  ngOnInit(): void {
  }

}
