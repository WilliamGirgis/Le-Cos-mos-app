import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
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
  imgFile:any
  getImages(imageName?:string) {
    const querParam = new HttpParams().set('imageName',imageName!);
    return this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(
        map((data) => {
          // Les données renvoyer par le back-end sont sous forme Blob
          this.imgFile = new File([data], "test.png" ); // On transform le Blob en fichier
          let fr = new FileReader(); // On li le fichier et stock le nouveau format
          fr.readAsDataURL(this.imgFile)
          fr.onload = () =>{

            // la donnée à afficher dans le parametre '[src]' de la balise image
            this.imgFile=fr.result

          }


        })
      )
      .subscribe((result) => {});
  }


  constructor(public dialogRef:MatDialogRef<ModifyPublicationViewComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,imgLink:string,i:number},private http:HttpClient) {

    this.dialogRef.afterOpened().pipe().subscribe((res) => {


     if(this.imgLink != undefined) {
      this.getImages(this.imgLink)
     }
    })



    this.uploader!.onCompleteAll =  () => {
      // When the upload queue is completely done, we refresh the page to output it correctly


      this.uploader.clearQueue()
    }
    this.uploader.onCompleteItem  = (file) => {
      this.imgLink = file._file.name
    }


    this.uploader!.onAfterAddingFile = async (file) => {
      this.imgLink = file._file.name
      await Promise.resolve(this.uploader.uploadAll()).then((response) =>{

        this.getImages(this.imgLink)
      })
    }
  }

  imgLink?:string = this.data.imgLink
  index?:number = this.data.i

  pub:PublicationModel = this.data.publication
  deleteImage() {
    console.log("Inside deleteImage(), imgLink = " + this.imgLink)
    if(!window.confirm("Are you sure you wanna delete " +  this.imgLink! + " ?")) {
      return
        }
    return this.http
      .post(this.deleteImagesURL,{imageName:this.imgLink!}, {
        responseType: 'text'
      })
      .pipe(
        map((data) => {
          this.imgLink = undefined
          this.modifyPost(this.pub.title,this.pub.date,this.pub.content,false)
        })
      )
      .subscribe((result) => {});
  }

public uploader: FileUploader = new FileUploader({
  url: endpointUploadFile,
  queueLimit:1,
  method: 'post'
});



async modifyPost(title: string, date: string, content: string,closDialog?:boolean) {
  console.log("Inside modifyPost(), imgLink = " + this.imgLink)
  let publication: PublicationModel

  if(  this.imgLink != undefined) {
    publication = { title, date, content,imgName: this.imgLink };
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

          this.getImages(this.imgLink)


      })
    )
    .subscribe((response) => {});
}





  ngOnInit(): void {


  }

}
