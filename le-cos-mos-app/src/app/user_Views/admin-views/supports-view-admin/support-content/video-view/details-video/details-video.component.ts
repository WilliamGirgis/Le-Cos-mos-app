import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-video',
  templateUrl: './details-video.component.html',
  styleUrls: ['./details-video.component.scss']
})
export class DetailsVideoComponent implements OnInit {

  constructor(private route:Router) { }
  imgLink:any
  imgFile:any
  imgExtension:any

  documentTitle?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[0]
  documentChapter?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[1]

isDetails:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1]

  ngOnInit(): void {

  }

}
