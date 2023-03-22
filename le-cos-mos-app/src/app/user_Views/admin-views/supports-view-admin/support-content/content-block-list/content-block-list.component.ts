import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-content-block-list',
  templateUrl: './content-block-list.component.html',
  styleUrls: ['./content-block-list.component.scss']
})
export class ContentBlockListComponent implements OnInit {

  constructor(private router:ActivatedRoute,private route:Router) { }
  content:any = [{name:'Cours Magistraux',link_key:'cm'},{name:'Travaux Dirigés',link_key:'td'},{name:'Annales',link_key:'annales'},{name:'Vidéos',link_key:'video'},{name:'Exercices',link_key:'excercices'},{name:'Séance de Planchages',link_key:'planchage'}]

  selectedUed:string = this.router.snapshot.paramMap.get('id')!

  globalBlock = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 2]

  blockContentList = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1]


  cleanContent = this.blockContentList.replace(/%20/g,' ')
  globalBlockClean = this.cleanContent.replace(/%20/g,' ').replace(/%C3%A9/g,'e')



  ngOnInit(): void {
  }

}
