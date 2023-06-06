import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { formErrors } from 'src/app/interface&classe/interfaces';
import { PublicationModel } from './publication-model';
import { FileUploader } from 'ng2-file-upload';

const endpointUploadFile = "http://localhost:4200/publication/publish"

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {

  publicationList: PublicationModel[] = [];




  constructor(public dialogRef:MatDialogRef<AddPublicationComponent>,private formBuilder:FormBuilder,@Inject(MAT_DIALOG_DATA) public data:{modified:boolean}) {
    this.uploader!.onCompleteAll = () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      this.filename = undefined
      this.uploader.clearQueue()

      this.dialogRef.close("added")
    }
    this.uploader.onCompleteItem  = (file) => {

    }


    this.uploader!.onAfterAddingFile = (file) => {
      this.filename = file._file.name

    }

    this.uploader.onBeforeUploadItem = (file) => {
      let name = file._file.name
      let title = this.publicationForm.get('title')!.value
      let content = this.publicationForm.get('content')!.value




      this.uploader.setOptions({headers:[
        { name: 'title', value: title },
        {name: 'description',  value: content},
        {name: 'extension',  value: name.split(/\./)[name.split(/\./).length - 1]}
      ]
      });

      file.file.name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")

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

   async newPublication() {
    await Promise.resolve(this.uploader.uploadAll()).then((response) =>{
    })
  }



  ngOnInit(): void {
  }

}
