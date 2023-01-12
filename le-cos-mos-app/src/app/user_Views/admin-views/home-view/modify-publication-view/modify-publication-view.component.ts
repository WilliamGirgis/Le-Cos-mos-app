import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { map } from 'rxjs';
import { PublicationModel } from '../add-publication-view/publication-model';




const endpointUploadFile = "http://localhost:4200/file/upload"
@Component({
  selector: 'app-modify-publication-view',
  templateUrl: './modify-publication-view.component.html',
  styleUrls: ['./modify-publication-view.component.scss']
})
export class ModifyPublicationViewComponent implements OnInit {
  readonly getImagesURL = "http://localhost:4200/file/images"
  readonly deleteImagesURL = "http://localhost:4200/file/images/del"
  modifyPostOrigin?:string


  imgFile:any
  getImages(imageName?:string) {
    const querParam = new HttpParams().set('imageName',imageName!);
    return this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(
        map(async (data) => {

          // Les données renvoyer par le back-end sont sous forme Blob
          let img = new File([data], imageName! ); // On transform le Blob en fichier
          if(img.size < this.imgSize) { // On check si il n'y a pas eu d'échec lors de l'envoi de donnée, sinon on relance la requête pour le fichier
             this.getImages(imageName)
             return
          }
          let fr = new FileReader(); // On li le fichier et stock le nouveau format
          await Promise.resolve(this.uploader.uploadAll()).then((response) =>{
            fr.readAsDataURL(img)
          })
          fr.onloadend = async (eve) =>{

            // la donnée à afficher dans le parametre '[src]' de la balise image
            await Promise.resolve(this.uploader.uploadAll()).then((response) =>{
              this.imgFile=fr.result
            })


          }

        })
      )
      .subscribe((result) => {});
  }

  pub:PublicationModel = this.data.publication
  imgExtension?:string = this.pub.imgExtension
  publicationForm:FormGroup = this.formBuilder.group({

    title:[this.pub.title,[Validators.required]],
    date:[this.pub.date,[Validators.required]],
    content: [this.pub.content,[Validators.required]],
   }
   );

   imgSize:any

  constructor(public dialogRef:MatDialogRef<ModifyPublicationViewComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,imgLink:string,i:number},private formBuilder:FormBuilder,private http:HttpClient) {

    this.dialogRef.afterOpened().pipe().subscribe((res) => {

     this.modifyPostOrigin = undefined
     if(this.imgLink != undefined) {
      this.getImages(this.imgLink)
     }
    })



    this.uploader!.onCompleteAll =  () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      this.uploader.clearQueue()
    }
    this.uploader.onCompleteItem  = (file) => {
      //this.imgLink = file._file.name
    }


    this.uploader!.onAfterAddingFile = async (file) => {
      this.imgLink = file._file.name
      this.imgSize = file._file.size
      await Promise.resolve(this.uploader.uploadAll()).then((response) =>{
      })
      this.getImages(this.imgLink)
    }
  }

  imgLink?:string = this.data.imgLink
  index?:number = this.data.i


  deleteImage() {
    if(!window.confirm("Are you sure you wanna delete " +  this.imgLink! + " ?")) {
      return
        }
    return this.http
      .post(this.deleteImagesURL,{imageName:this.imgLink!}, {
        responseType: 'text'
      })
      .pipe(
        map((data) => {

// Une fois l'image supprimer, on enlève le lien dans la publication en appelant modifyPost() et ainsi supprimer son lien dans le fichier post.json
          this.imgLink = undefined
          this.modifyPost()
        })
      )
      .subscribe((result) => {});
  }

public uploader: FileUploader = new FileUploader({
  url: endpointUploadFile,
  queueLimit:1,
  method: 'post'
});



async modifyPost() {
  let publication: PublicationModel
  let title = this.publicationForm.get('title')!.value
  let date = this.publicationForm.get('date')!.value
  let content = this.publicationForm.get('content')!.value

  let ext:string [] = this.imgLink?.split(/\./)!

  if(  this.imgLink != undefined) {
    publication = { title, date, content,imgName: this.imgLink,imgExtension:ext[ext.length - 1] };
  } else {
    publication = { title, date, content };
  }



  const querParam = new HttpParams().set('index', this.index!);
  this.http
    .post('http://localhost:4200/publication/publish/modify', publication, {
      params: querParam,
      responseType: 'json',
    })
    .pipe(
      map((data) => {

        // Si la fonction a été appelé par le button 'Submit', alors on ferme le dialog
if(this.modifyPostOrigin == "Submit") {
  this.dialogRef.close()
}



      })
    )
    .subscribe((response) => {});
}





  ngOnInit(): void {


  }

}
