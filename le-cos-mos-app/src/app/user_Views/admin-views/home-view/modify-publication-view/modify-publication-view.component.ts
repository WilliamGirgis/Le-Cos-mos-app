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

  constructor(public dialogRef:MatDialogRef<ModifyPublicationViewComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,imgLink:string,i:number},private http:HttpClient) {
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

  imgLink?:string = this.data.imgLink
  index?:number = this.data.i

  pub:PublicationModel = this.data.publication



public uploader: FileUploader = new FileUploader({
  url: endpointUploadFile,
  queueLimit:1,
  method: 'post'
});
filename?:string


modifyPost(title: string, date: string, content: string) {
  let publication: PublicationModel = { title, date, content };
  const querParam = new HttpParams().set('index', this.index!);
  this.http
    .post('http://localhost:4200/publication/publish/modify', publication, {
      params: querParam,
      responseType: 'json',
    })
    .pipe(
      map((data) => {
        this.dialogRef.close()
      })
    )
    .subscribe((response) => {});
}





  ngOnInit(): void {
    console.log(this.index)
    this.filename = this.imgLink?.replace("http://localhost:4200/assets/images/","")
  }

}
