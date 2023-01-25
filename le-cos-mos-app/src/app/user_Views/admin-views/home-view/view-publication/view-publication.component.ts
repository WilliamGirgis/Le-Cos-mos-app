import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { PublicationModel } from '../add-publication-view/publication-model';


@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrls: ['./view-publication.component.scss'],
})
export class ViewPublicationComponent implements OnInit {
  constructor(public dialogRef:MatDialogRef<ViewPublicationComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,imgLink:string},private http:HttpClient) {


    this.dialogRef.afterOpened().subscribe((res) => {

      if(this.imgLink != undefined) {
        this.getImages(this.imgLink)
      }
    })

   }

  imgLink?:string = this.data.imgLink

  pub:PublicationModel = this.data.publication
  imgExtension?:string = this.pub.imgExtension

  readonly getImagesURL = "http://localhost:4200/file/images"
  imgFile:any
  getImages(imageName?:string) {
    const querParam = new HttpParams().set('imageName',imageName!);
    return this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(
        map((data) => {
          // Les données renvoyer par le back-end sont sous forme Blob
          let img  = new File([data], imageName! ); // On transform le Blob en fichier
          let fr = new FileReader(); // On li le fichier et stock le nouveau format
          fr.readAsDataURL(img)
          fr.onloadend = () =>{
            // la donnée à afficher dans le parametre '[src]' de la balise image
            this.imgFile=fr.result
          }
        })
      )
      .subscribe((result) => {});
  }


  ngOnInit(): void {

  }

}
