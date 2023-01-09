import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { formErrors } from 'src/app/interface&classe/interfaces';
import { PublicationModel } from './publication-model';
import { FileUploader } from 'ng2-file-upload';

const endpointUploadFile = "http://localhost:4200/file/upload"
const folderPath = "http://localhost:4200/assets/images/"

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {

  publicationList: PublicationModel[] = [];




  constructor(public dialogRef:MatDialogRef<AddPublicationComponent>,private formBuilder:FormBuilder,private http:HttpClient) {
    this.uploader!.onCompleteAll = () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      console.log("All Uploaded to : " + this.uploader!.options.url)
      this.filename = undefined
      this.uploader.clearQueue()
    }
    this.uploader.onCompleteItem  = (file) => {

    }


    this.uploader!.onAfterAddingFile = (file) => {
      this.filename = file._file.name
      console.log("FILE = " + file._file.name)
      console.log(this.uploader!.queue.length)
    }
  }
  public uploader: FileUploader = new FileUploader({
    url: endpointUploadFile,
    queueLimit:1,
    method: 'post'
});
filename?:string





  publicationForm:FormGroup = this.formBuilder.group({

    title:['',[Validators.required]],
    content: ['',[Validators.required]],
   }
   );
  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };

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
        /*this.onPickPublication(
          this.publicationList[this.publicationList.length - 1],
          JSON.stringify(this.publicationList.length - 1)
        );*/
      });
  }



   async newPublication() {

    let title = this.publicationForm.get('title')!.value
    let content = this.publicationForm.get('content')!.value
    let imgLink:string | undefined = undefined
    if(this.filename) {
       imgLink = folderPath + this.filename
    }


    await Promise.resolve(this.uploader.uploadAll()).then((response) =>{

      console.log("FILE SAVED, Go next .. " + response)
    }) // Encapsuler en promesse pour être sûr que la mise en ligne se réalise ne premier
    console.log("IMG Link =" + imgLink)
    let publication: PublicationModel = { title, date: '', content,imgLink:imgLink };
    this.http
      .post('http://localhost:4200/publication/publish', publication, {
        responseType: 'json',
      })
      .pipe(
        map((data) => {
          //this.uploader.uploadAll()
          this.getPublication();

          this.dialogRef.close()
        })
      )
      .subscribe((response) => {});
  }



  ngOnInit(): void {
  }

}
