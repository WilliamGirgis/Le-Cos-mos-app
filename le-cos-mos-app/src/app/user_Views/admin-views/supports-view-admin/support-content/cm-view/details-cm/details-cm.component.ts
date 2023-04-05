import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details-cm',
  templateUrl: './details-cm.component.html',
  styleUrls: ['./details-cm.component.scss']
})
export class DetailsCmComponent implements OnInit {

  constructor(private route:Router) { }
  imgLink:any
  imgFile:any
  imgExtension:any
  documentTitle?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[0]
  documentChapter?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[1]
  ngOnInit(): void {
  }

}
