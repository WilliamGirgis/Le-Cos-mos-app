import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formErrors } from 'src/app/interface&classe/interfaces';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.scss']
})
export class AddItemDialogComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<AddItemDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:string,imgLink:string},private formBuilder:FormBuilder) { }


  publicationForm:FormGroup = this.formBuilder.group({

    title:['',[Validators.required]],
    content: ['',[Validators.required]],
   }
   );
  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };

  addFiles() {

  }


  ngOnInit(): void {
  }

}
