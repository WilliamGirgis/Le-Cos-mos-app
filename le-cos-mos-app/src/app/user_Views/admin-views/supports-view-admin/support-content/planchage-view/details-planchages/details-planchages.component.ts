import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details-planchages',
  templateUrl: './details-planchages.component.html',
  styleUrls: ['./details-planchages.component.scss']
})
export class DetailsPlanchagesComponent implements OnInit {

  constructor(private route:Router,private router: ActivatedRoute) { }
  imgLink:any
  imgFile:any
  imgExtension:any

  documentTitle?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[0]
  documentChapter?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[1]

isDetails:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1]


  ngOnInit(): void {

  }

}
