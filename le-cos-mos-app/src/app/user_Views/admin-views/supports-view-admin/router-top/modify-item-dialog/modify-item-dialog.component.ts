import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { formErrors } from 'src/app/interface&classe/interfaces';

@Component({
  selector: 'app-modify-item-dialog',
  templateUrl: './modify-item-dialog.component.html',
  styleUrls: ['./modify-item-dialog.component.scss']
})
export class ModifyItemDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ModifyItemDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:string,imgLink:string},private formBuilder:FormBuilder,private route:Router) { }


  publicationForm:FormGroup = this.formBuilder.group({

    title:['',[Validators.required]],
    content: ['',[Validators.required]],
   }
   );
  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };

  addFiles() {

  }
  documentTitle?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[0]
  documentChapter?:string = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1].replace(/%20/g , ' ').replace(/%C3%A8/, 'è').split(/_/)[1]

  ngOnInit(): void {
  }

}
