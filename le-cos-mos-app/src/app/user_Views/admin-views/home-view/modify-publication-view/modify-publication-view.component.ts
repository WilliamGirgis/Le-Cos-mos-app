import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileUploader } from 'ng2-file-upload';
import { map } from 'rxjs';
import { PublicationModel } from '../add-publication-view/publication-model';




const endpointUploadFile = "http://localhost:4200/publication/publish"
const endPointModifyPublicationFile = "http://localhost:4200/publication/publish/modify"
@Component({
  selector: 'app-modify-publication-view',
  templateUrl: './modify-publication-view.component.html',
  styleUrls: ['./modify-publication-view.component.scss']
})
export class ModifyPublicationViewComponent implements OnInit {
  readonly getImagesURL = "http://localhost:4200/publication/publishGet"
  readonly deleteImagesURL = "http://localhost:4200/publication/publish/file/del"
  modifyPostOrigin?:string


  imgFile:any
  getImages(id?:string) {
    const querParam = new HttpParams().set('imgid',id!);

    return this.http
      .get(this.getImagesURL, { responseType: 'blob',params:querParam})
      .pipe(
        map(async (data) => {
          // Les données renvoyer par le back-end sont sous forme Blob

          let img = new File([data], id!); // On transform le Blob en fichier
          let fr = new FileReader(); // On li le fichier et stock le nouveau format
          fr.readAsDataURL(img)
          fr.onloadend = async (eve) =>{
            this.imgFile=fr.result

          }

        })
      )
      .subscribe((result) => {});
  }

  pub:PublicationModel = this.data.publication
  imgExtension?:string = this.pub.extension
  publicationForm:FormGroup = this.formBuilder.group({

    title:[this.pub.title,[Validators.required]],
    date:[this.pub.date,[Validators.required]],
    content: [this.pub.description,[Validators.required]],
   }
   );



   initialDate = this.pub.date
   initialTitle = this.pub.title
  constructor(public dialogRef:MatDialogRef<ModifyPublicationViewComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,img_id:string,i:number,modified:boolean},private formBuilder:FormBuilder,private http:HttpClient) {

    this.dialogRef.afterOpened().subscribe((res) =>{
      this.getImages(this.pub.img_id)
    })
    this.uploader.onBeforeUploadItem = (file) => {
      let name = file._file.name
      let title = this.publicationForm.get('title')!.value
      let givenDate = this.publicationForm.get('date')!.value
      let givenDescription = this.publicationForm.get('content')!.value
      this.uploader.setOptions({headers:[
        { name: 'title', value: title },
        {name: 'givendescription',  value: givenDescription},
        { name: 'givendate', value: givenDate },
        {name: 'oldtitle',  value: this.initialTitle},
        {name: 'olddate',  value: this.initialDate},
        {name: 'extension',  value: name.split(/\./)[name.split(/\./).length - 1]},
        {name: 'img_id',  value: this.pub.img_id}
      ]

      ,url:endPointModifyPublicationFile});
    }


    this.uploader!.onCompleteAll =  () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      this.uploader.clearQueue()
      this.uploader.setOptions({url:endpointUploadFile});

      if(this.touched = true) {
        this.dialogRef.close('modified')
      } else {
        this.dialogRef.close()
      }

    }

    this.uploader.onCompleteItem  = (file) => {
      this.imgExtension = file._file.name.split(/\./)[file._file.name.split(/\./).length -1]
      this.modifyPostOrigin = undefined
      this.imgLink?.split(/\./)!.forEach((splitedArray) => {
        if(splitedArray == 'pdf' || splitedArray ==   'png' || splitedArray ==  'jpg' || splitedArray ==  'jpeg') {
          this.imgExtension = splitedArray
        }
      })
      //this.imgLink = file._file.name
    }

    this.uploader.onWhenAddingFileFailed = (file) => {
      this.imgExtension = file.name.split(/\./)[file.name.split(/\./).length -1]
      this.touched = true
      let img = new File([file.rawFile], file.name); // On transform le Blob en fichier
      this.uploader.queue.pop()
      this.uploader.addToQueue([img])
      let fr = new FileReader(); // On li le fichier et stock le nouveau format
      fr.readAsDataURL(img)
      fr.onloadend = () => {
        // la donnée à afficher dans le parametre '[src]' de la balise image
        this.imgFile = fr.result
      }
    }

    this.uploader!.onAfterAddingFile = async (file) => {
      this.imgFile = undefined
      this.touched = true
      this.imgExtension = file._file.name.split(/\./)[file._file.name.split(/\./).length -1]
      let img = new File([file.file.rawFile], file._file.name); // On transform le Blob en fichier
      let fr = new FileReader(); // On li le fichier et stock le nouveau format
      fr.readAsDataURL(img)
      fr.onloadend = () => {
        // la donnée à afficher dans le parametre '[src]' de la balise image
        this.imgFile = fr.result
      }
    }
  }
  touched:boolean = false
  imgLink?:string = this.data.img_id
  index?:number = this.data.i
  imgSize?:number

  deleteImage() {
    if(!window.confirm("Are you sure you wanna delete " +  this.imgLink! + " ?")) {
      return
        }
    return this.http
      .post(this.deleteImagesURL,{img_id:this.pub.img_id!}, {
        responseType: 'text'
      })
      .pipe(
        map((data) => {
          this.imgFile = undefined
          this.imgLink = undefined
          this.imgExtension = undefined
          this.data.modified = true
        })
      ).subscribe((result) => {});
  }

public uploader: FileUploader = new FileUploader({
  url: endpointUploadFile,
  queueLimit:1,
  method: 'post'
});



async modifyPost() {

  if(this.touched) {
    this.uploader.uploadAll()
  } else {
    let title = this.publicationForm.get('title')!.value
    let givenDate = this.publicationForm.get('date')!.value
    let givenDescription = this.publicationForm.get('content')!.value
    this.http.post('http://localhost:4200/publication/modify',{newTitle:title,newDate:givenDate,newDescription:givenDescription,oldTitle:this.pub.title,oldDate:this.pub.date}).pipe(map((data) =>{

    this.dialogRef.close('modified')
    })).subscribe((resulting) => {

    })
  }
}





  ngOnInit(): void {


  }

}
