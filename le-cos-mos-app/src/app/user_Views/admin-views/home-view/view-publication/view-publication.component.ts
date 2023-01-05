import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PublicationModel } from '../add-publication-view/publication-model';

@Component({
  selector: 'app-view-publication',
  templateUrl: './view-publication.component.html',
  styleUrls: ['./view-publication.component.scss']
})
export class ViewPublicationComponent implements OnInit {

  constructor(public dialogRef:MatDialogRef<ViewPublicationComponent>,@Inject(MAT_DIALOG_DATA) public data:{publication:PublicationModel,imgLink:string}) { }

  imgLink?:string = this.data.imgLink

  pub:PublicationModel = this.data.publication

  ngOnInit(): void {
  }

}
