import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formErrors } from 'src/app/interface&classe/interfaces';
import { AuthService } from 'src/app/services/AuthService.service';
@Component({
  selector: 'app-logout-dialog-component',
  templateUrl: './logout-dialog-component.component.html',
  styleUrls: ['./logout-dialog-component.component.scss']
})
export class LogoutDialogComponentComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<LogoutDialogComponentComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:string,imgLink:string},private formBuilder:FormBuilder,private authService:AuthService) { }


  publicationForm:FormGroup = this.formBuilder.group({

    title:['',[Validators.required]],
    content: ['',[Validators.required]],
   }
   );
  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };

  addFiles() {

  }

  yes() {
    this.authService.logout()
    this.dialogRef.close()
  }

  no() {
    this.dialogRef.close()
  }


  ngOnInit(): void {
  }

}
