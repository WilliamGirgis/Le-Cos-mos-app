import { Component, OnInit } from '@angular/core';
import { PublicationModel } from '../../admin-views/home-view/add-publication-view/publication-model';
import { ViewPublicationComponent } from '../../admin-views/home-view/view-publication/view-publication.component';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-home-view-etudiant',
  templateUrl: './home-view-etudiant.component.html',
  styleUrls: ['./home-view-etudiant.component.scss']
})
export class HomeViewEtudiantComponent implements OnInit {

  loaded?:boolean
  publicationList: PublicationModel[] = [];
  publicationListTest:PublicationModel[] = [{date:'25/02/1997',description:'Description',title:'New Title'},{date:'25/02/1997',description:'Description',title:'New Title'},{date:'25/02/1997',description:'Description DescriptionDescription Description Description Description Description Description Description Description Description Description Description Description',title:'New Title'}]
  constructor(private http:HttpClient,public dialog:MatDialog) { }

  openPublicationView(publication:PublicationModel,img_id?:string) {
    this.dialog.open(ViewPublicationComponent, {width:'95vw',height:'96vh',maxWidth:'none',data: {publication,img_id:img_id} })
  }

  ngOnInit(): void {
    this.getPublication()
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

  readonly getImagesURL = "http://localhost:4200/publication/publishGet"
  imgFile:any = []
  async getImages(index:number,id?:string) {
    const querParam = new HttpParams().set('imgid',id!);
   await Promise.resolve(

     this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(map((data) =>{
        console.log(data)
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

}
