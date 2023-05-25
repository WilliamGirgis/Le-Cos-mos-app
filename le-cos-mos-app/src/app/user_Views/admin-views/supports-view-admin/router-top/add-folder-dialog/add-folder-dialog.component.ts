import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { FileDescription } from 'src/app/shared/file_description';

@Component({
  selector: 'app-add-folder-dialog',
  templateUrl: './add-folder-dialog.component.html',
  styleUrls: ['./add-folder-dialog.component.scss']
})
export class AddFolderDialogComponent implements OnInit {

  constructor( private http:HttpClient,private route:Router,public dialogRef:MatDialogRef<AddFolderDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:string,imgLink:string,currentFolderName:string,parentFolderNames:FileDescription[],contentType:string,cour_name:string,contentList:FileDescription[]},private formBuilder:FormBuilder) {
    this.currentFolder =  this.data.currentFolderName
  }
  formGroup?:FormGroup
  ngOnInit(): void {
    console.log(this.data.contentList)
  }
  currentFolder?:string
  readonly addFolderRoute = 'http://localhost:4200/support/folder/save'
  addFolder(newfolderName:string) {

    this.data.contentList.push({name:newfolderName,document_list:[]})



this.http.post(this.addFolderRoute,{folderName:newfolderName,parentFolderNames:this.data.parentFolderNames,contentType:this.data.contentType,cour_name:this.data.cour_name,contentList:this.data.contentList}).pipe(map((data)=>{

  this.dialogRef.close()
})).subscribe((res) =>{

})
  }

}
