import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
const uploadFileRoute = 'http://localhost:4200/support/file/save'

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {
  selectedItemIndex:number = 0
  contentListTest = [{name:'Composition de la matière',chapter:'I'},{name:'Composition de la matière',chapter:'II'},{name:'Composition de la matière',chapter:'III'},{name:'Composition de la matière',chapter:'IV'},{name:'Composition de la matière',chapter:'V'},{name:'Composition de la matière',chapter:'VI'}]

  cour_name= decodeURIComponent(this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 3])
  blockContentList = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 2]
  cleanContent = this.blockContentList.replace(/%20/g,' ')
  contentType = this.cleanContent.replace(/%20/g,' ').replace(/%C3%A9/g,'e')

  public uploader: FileUploader = new FileUploader({
    url: uploadFileRoute,
    queueLimit:10,
    method: 'post'
    // itemAlias:'Alias 1',
    // formatDataFunction: (item: FileItem, formData: FormData) => {
    //   formData.append('cour_name', this.cour_name);
    //   formData.append('content_type', this.contentType);
    //   return formData
    // },
    // additionalParameter:[{'cour_name':this.cour_name},{'content_type':this.contentType}]
  });

  imgExtension:any [] = []
  constructor( private route:Router,public dialogRef:MatDialogRef<AddItemDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:string,imgLink:string},private formBuilder:FormBuilder) {
    this.formGroup = this.formBuilder.group({});
    this.uploader!.onCompleteAll = () => {
      // When the upload queue is completely done, we refresh the page to output it correctly
      // this.filename = undefined
      this.uploader.clearQueue()

      this.isSending = false
      this.dialogRef.close()

    }

    this.uploader.onCompleteItem = (file) => {
    // file.formData = {
    //   'cour_name': this.cour_name,
    //   'content_type':this.contentType
    // }
    // file.alias = file._file.name
    // let chapter = this.formGroup!.get(`chapter${this.uploader.getIndexOfItem(file)}`)!.value
    //   this.uploader.setOptions({headers:[
    //     { name: 'content_type', value: this.contentType },
    //     {name: 'cour_name',  value: this.cour_name},
    //   {name:'chapter',value:chapter}
    //   ]
    //   });

    }


    this.uploader.onBeforeUploadItem = (file) => {
      let name = this.formGroup!.get(`name${this.uploader.getIndexOfItem(file)}`)!.value.split(/\./g)[0]
      let extension = this.imgExtension[this.uploader.getIndexOfItem(file)]
      let chapter = this.formGroup!.get(`chapter${this.uploader.getIndexOfItem(file)}`)!.value
      this.uploader.setOptions({headers:[
        { name: 'content_type', value: this.contentType },
        {name: 'cour_name',  value: this.cour_name},
      {name:'chapter',value:chapter}
      ]
      });

      file.file.name = name.normalize("NFD").replace(/[\u0300-\u036f]/g, "")  + extension

    }

    this.uploader.onAfterAddingFile = (file) => {
      let index = this.uploader.getIndexOfItem(file)
      let inputName:string = `name${index}`
      let chapter:string = `chapter${index}`
      let name = file._file.name
      this.imgExtension.push('.' + name.split(/\./g)[name.split(/\./g).length -1])
            // https://stackoverflow.com/questions/990904/remove-accents-diacritics-in-a-string-in-javascript
            this.formGroup!.addControl(inputName, new FormControl(name.split(/\./g)[0]));
            this.formGroup!.addControl(chapter, new FormControl());
    }
   }

   isSending:boolean = false


  addFiles() {
    this.isSending = true
    // const querParam = new HttpParams().set('cour_name', this.cour_name!).set('content_type',this.contentType);

this.uploader.uploadAll()


  }






  ngAfterViewChecked(): void {
    //Called after every check of the component's view. Applies to components only.
    //Add 'implements AfterViewChecked' to the class.

  }


formGroup?:FormGroup
  ngOnInit(): void {

  }

}
