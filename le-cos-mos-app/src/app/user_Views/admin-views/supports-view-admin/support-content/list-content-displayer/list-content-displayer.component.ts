import { HttpClient, HttpParams } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs';
import { FileDescription } from 'src/app/shared/file_description';

@Component({
  selector: 'app-list-content-displayer',
  templateUrl: './list-content-displayer.component.html',
  styleUrls: ['./list-content-displayer.component.scss']
})
export class ListContentDisplayerComponent implements OnInit,AfterViewInit {
  readonly getFileListRoute = 'http://localhost:4200/support/file'
  selectedItemIndex:number = 0
  contentListTest = [{name:'Composition de la matière',chapter:'I'},{name:'Composition de la matière',chapter:'II'},{name:'Composition de la matière',chapter:'III'},{name:'Composition de la matière',chapter:'IV'},{name:'Composition de la matière',chapter:'V'},{name:'Composition de la matière',chapter:'VI'}]

  contentList:FileDescription[] = []

  cour_name = decodeURIComponent(this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 3])
    blockContentList = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 2]
  cleanContent = decodeURIComponent(this.blockContentList.replace(/%20/g,' '))
  contentType = decodeURIComponent(this.cleanContent)
  constructor(private http:HttpClient,private router:ActivatedRoute,private route:Router) { }
  // ngAfterViewChecked(): void {
  //   this.getFileList()
  // }
  ngAfterViewInit(): void {
this.getFileList()
  }

  readonly deletDocumentRoute = 'http://localhost:4200/support/file/del'

  deleteDocument(i:number) {
    this.http.post(this.deletDocumentRoute,{courName:this.cour_name,contentType:this.contentType,documentName:this.contentList[i].name}).pipe(map((data)=>{
      this.getFileList()
    })).subscribe((res) =>{

    })

  }
  getFileList() {


    const querParam = new HttpParams().set('cour_name', this.cour_name!).set('content_type',this.contentType);

    this.http.get(this.getFileListRoute,{params:querParam}).pipe(map((data:any)=> {
      this.contentList = data

    })).subscribe((res) => {

    })
  }

  displayDetails(selectedItemIndex:number){
    this.selectedItemIndex = selectedItemIndex
  }
  ngOnInit(): void {


  }

}
