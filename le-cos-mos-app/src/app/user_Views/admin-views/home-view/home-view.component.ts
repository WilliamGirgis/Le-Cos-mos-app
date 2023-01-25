import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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
    dialog.afterAllClosed.subscribe((res) => {
      this.getPublication()
    })
  }
  publicationList: PublicationModel[] = [];
  publicationListTest:PublicationModel[] = [  {
    "title": "idt-",
    "date": "2-1-2023",
    "content": "oie-(oi(e-",
    "imgName":"http://localhost:4200/assets/images/RIB.png",
    "imgExtension":'pdf'
  },
  {
    "title": "kyukyu",
    "date": "2-1-2023",
    "content": "lyulyulyu"
  },
  {
    "title": "Hello",
    "date": "2-1-2023",
    "content": "verqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeq"
  },
  {
    "title": "This is again a test",
    "date": "2-1-2023",
    "content": "verqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeq\ngrehyrezherh"
  },
  {
    "title": "This is again a test",
    "date": "2-1-2023",
    "content": "verqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeq\ngrehyrezherh"
  },
  {
    "title": "This is again a test",
    "date": "2-1-2023",
    "content": "verqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeqverqheqhjeqtjeq\ngrehyrezherh"
  }]


  openSavePostForm() {
    this.dialog.open(AddPublicationComponent, {width:'70vw',height:'max-content'})
  }
  openPublicationView(publication:PublicationModel,imgLink?:string) {
    this.dialog.open(ViewPublicationComponent, {width:'95vw',height:'96vh',maxWidth:'none',data: {publication,imgLink:imgLink} })
  }
  openModifyPublicationView(publication:PublicationModel,imgLink?:string,i?:number) {
    const index = i! - 1
    this.dialog.open(ModifyPublicationViewComponent, {width:'90vw',height:'95vh',maxWidth:'none',data: {publication,imgLink:imgLink,i} })
  }

  getPublication() {
    this.http
      .get('http://localhost:4200/publication/publishGet', {
        responseType: 'json',

      })
      .toPromise()
      .then((data) => {
        if(data === null) {// if the post.json is empty
          this.publicationList = []
          return console.error("No Posts")
        }
        this.publicationList = JSON.parse(JSON.stringify(data));

// Init thes images
        for(let i = 0; i < this.publicationList.length;i++) {
          this.imgFile[i] = []
          console.log(this.publicationList[i])
           this.getImages(i,this.publicationList[i].imgName)
           if( i == this.publicationList.length -1) {
            console.log("finished ! " + this.publicationList.length)
            this.loaded = true
           }
        }
        /*this.onPickPublication(
          this.publicationList[this.publicationList.length - 1],
          JSON.stringify(this.publicationList.length - 1)
        );*/
      });
  }

  deletePost(index:number) {
   let ind = index +1
    if(!window.confirm("Are you sure you wanna delete the publication number " + ind + " ?")) {
      return
        }
    this.http
      .post('http://localhost:4200/publication/publish/del', { index: index, })
      .pipe(
        map((data) => {
          this.getPublication();
        })
      )
      .subscribe((response) => {});
  }




  imgLink?:string

  pub?:PublicationModel
  imgExtension?:string

  readonly getImagesURL = "http://localhost:4200/file/images"
  imgFile:any = []
  async getImages(index:number,imageName?:string) {
    const querParam = new HttpParams().set('imageName',imageName!);
   await Promise.resolve(

     this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .toPromise().then((data) => {

                  // Les données renvoyer par le back-end sont sous forme Blob
                  let img  = new File([data!], imageName! ); // On transform le Blob en fichier
                  let fr = new FileReader(); // On li le fichier et stock le nouveau format
                  fr.readAsDataURL(img)
                  fr.onloadend = () =>{
                    // la donnée à afficher dans le parametre '[src]' de la balise image
                    this.imgFile[index]=fr.result
                    console.log(this.imgFile[index])
                  }
      })
      )



  }




  loaded:boolean = false
   ngOnInit(): void {
      this.getPublication()
  }


}
