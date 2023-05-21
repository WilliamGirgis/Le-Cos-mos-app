import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';

@Component({
  selector: 'app-details-excercices',
  templateUrl: './details-excercices.component.html',
  styleUrls: ['./details-excercices.component.scss']
})
export class DetailsExcercicesComponent implements OnInit ,AfterViewInit {

  constructor(private route:Router,private http:HttpClient) { }
  ngAfterViewInit(): void {
  this.downloadFile()
  }

  imgFile:any

  documentTitle?:string = decodeURIComponent(this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1]).split(/_/)[0]
  documentChapter?:string = decodeURIComponent(this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 1]).split(/_/)[1]
  imgExtension:any = this.documentTitle?.split(/\./g)[this.documentTitle?.split(/\./g).length - 1]


readonly downloadFileRoute = 'http://localhost:4200/support/file/download'
contentType = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 3]
downloadFile() {
  const querParam = new HttpParams().set('filename', this.documentTitle!).set('contentType',this.contentType)
  this.http.get(this.downloadFileRoute, { params: querParam,responseType:'blob' }).pipe(map(async (data: any) => {

this.imgFile = data
let img  = new File([data], this.documentTitle! ); // On transform le Blob en fichier
let fr = new FileReader(); // On li le fichier et stock le nouveau format
fr.readAsDataURL(img)
fr.onloadend = () =>{
  // la donnée à afficher dans le parametre '[src]' de la balise image
  this.imgFile = fr.result
}
    return
  })).subscribe((res) => {

  })
}

  ngOnInit(): void {

  }

}

