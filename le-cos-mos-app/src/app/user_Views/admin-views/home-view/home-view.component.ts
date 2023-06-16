import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { AddPublicationComponent } from './add-publication-view/add-publication.component';
import { PublicationModel } from './add-publication-view/publication-model';
import { ModifyPublicationViewComponent } from './modify-publication-view/modify-publication-view.component';
import { ViewPublicationComponent } from './view-publication/view-publication.component';
//import * as data from '../publications/posts.json';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  //posts: any = (data as any).default;
  constructor(public dialog:MatDialog,private http:HttpClient) {
    dialog.afterAllClosed.subscribe((res:any) => {
      if(this.modified) {
        this.getPublication()
        this.modified = false
      }

    })


  }
  publicationList: PublicationModel[] = [];
  publicationListTest:PublicationModel[] = []


  openSavePostForm() {
    this.dialog.open(AddPublicationComponent, {width:'70vw',height:'max-content',data:{modified:this.modified}}).afterClosed().subscribe((res) =>{
      if(res = 'added') {
this.getPublication()
      }
    })
  }
  openPublicationView(publication:PublicationModel,img_id?:string) {
    this.dialog.open(ViewPublicationComponent, {width:'95vw',height:'96vh',maxWidth:'none',data: {publication,img_id:img_id} })
  }
  modified?:boolean = false
  openModifyPublicationView(publication:PublicationModel,img_id?:string,i?:number) {
    const index = i! - 1
    this.dialog.open(ModifyPublicationViewComponent, {width:'90vw',height:'95vh',maxWidth:'none',data: {publication,img_id:img_id,i,modified:this.modified} }).afterClosed().subscribe((res) =>{
      if(res = 'modified') {
this.getPublication()
      }
    })
  }

  getPublication() {
    this.http
      .get('http://localhost:4200/publication/publishGet/all', {
        responseType: 'json',

      })
      .pipe(map((data) =>{
        if(data === null) {// if the post.json is empty
          this.publicationList = []
          return console.error("No Posts")
        }
        this.publicationList = JSON.parse(JSON.stringify(data));
        for(let i = 0; i < this.publicationList.length;i++) {

           this.getImages(i,this.publicationList[i].img_id)
           if( i == this.publicationList.length -1) {
            this.loaded = true
           }
        }

      })).subscribe((res) =>{

      })
  }

  deletePost(index:number) {
   let ind = index +1
    if(!window.confirm("Are you sure you wanna delete the publication number " + ind + " ?")) {
      return
        }
    this.http
      .post('http://localhost:4200/publication/publish/del', { img_id: this.publicationList[index].img_id, })
      .pipe(
        map((data) => {
          this.getPublication();
        })
      )
      .subscribe((response) => {});
  }
  imgLink?:string
  imgExtension?:string


  readonly getImagesURL = "http://localhost:4200/publication/publishGet"
  imgFile:any = []
  async getImages(index:number,id?:string) {
    const querParam = new HttpParams().set('imgid',id!);
   await Promise.resolve(

     this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(map((data) =>{
                        // Les données renvoyer par le back-end sont sous forme Blob
                        const img  = new File([data!], id! ); // On transform le Blob en fichier
                        const fr = new FileReader(); // On li le fichier et stock le nouveau format
                        fr.readAsDataURL(img)
                        fr.onloadend = () =>{
                          // la donnée à afficher dans le parametre '[src]' de la balise image
                          this.imgFile[index]=fr.result
                        }

      })).subscribe((res) =>{

      })
      )
  }

  loaded:boolean = false
   ngOnInit(): void {
      this.getPublication()
  }


}
