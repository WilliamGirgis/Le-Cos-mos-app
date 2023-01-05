import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { formErrors } from 'src/app/interface&classe/interfaces';
import { PublicationModel } from './publication-model';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {

  publicationList: PublicationModel[] = [];


readonly endpointUploadFile = "http://localhost:4200/file/upload"
uploader: FileUploader = new FileUploader({ url: this.endpointUploadFile});
  constructor(public dialogRef:MatDialogRef<AddPublicationComponent>,private formBuilder:FormBuilder,private http:HttpClient) {
    /*this.uploader.onCompleteAll = () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      console.log("All Uploaded to : " + this.uploader.options.url)

    };*/

    /*this.uploader.onCompleteItem = (file) => {
      console.log("FILE = " + file)
      this.uploader.removeFromQueue(file)
      if(this.uploader.queue.length == 0) {

      }
    };*/
  }

  publicationForm:FormGroup = this.formBuilder.group({

    title:['',[Validators.required]],
    content: ['',[Validators.required]],
   }
   );
  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };


   newPublication() {

    let title = this.publicationForm.get('title')!.value
    let content = this.publicationForm.get('content')!.value

    let publication: PublicationModel = { title, date: '', content };
    this.http
      .post('http://localhost:4200/publication/publish', publication, {
        responseType: 'json',
      })
      .pipe(
        map((data) => {
          //this.getPublication();

          this.dialogRef.close()
        })
      )
      .subscribe((response) => {});
  }



  ngOnInit(): void {
  }

}
