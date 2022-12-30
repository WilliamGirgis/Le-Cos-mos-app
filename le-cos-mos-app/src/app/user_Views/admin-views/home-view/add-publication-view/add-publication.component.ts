import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { map } from 'rxjs/internal/operators/map';
import { formErrors } from 'src/app/interface&classe/interfaces';
import { PublicationModel } from './publication-model';

@Component({
  selector: 'app-add-publication',
  templateUrl: './add-publication.component.html',
  styleUrls: ['./add-publication.component.scss']
})
export class AddPublicationComponent implements OnInit {

  publicationList: PublicationModel[] = [];

  constructor(public dialogRef:MatDialogRef<AddPublicationComponent>,private formBuilder:FormBuilder,private http:HttpClient) { }

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

  /*getPublication() {
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
        );
      });
  }*/
  /*onPickPublication(post: PublicationModel, index: string) {
    this.pickedPost = post;
    this.pickedPostIndex = index;

      this.router.navigate(['admin/postPublication/' + this.pickedPost.title]);
  }*/

  ngOnInit(): void {
  }

}
