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
export class ListContentDisplayerComponent implements OnInit, AfterViewInit {
  readonly getFileListRoute = 'http://localhost:4200/support/file'


  selectedFolder: FileDescription = {}
  savedPathFolders: FileDescription[] = []
  contentList: FileDescription[] = []
  stateTree?: FileDescription
  folderTree: FileDescription[] = []
  routerFolder: FileDescription[] = this.contentList // This make initialising the pointer and make it accessible for back-end to replace document in mongo, so that after every add to array contentList, will be saved
  getInToFolder(folderIndex?: number) {
    this.folderTree.push(this.contentList[folderIndex!])
    this.selectedFolder = this.folderTree[this.folderTree.length - 1]

    this.contentList = this.contentList[folderIndex!].document_list!
  }
  navigateFolderBack(index?: number) {

    if (index && index! != 0) {
      this.contentList = this.folderTree[index].document_list!
      this.selectedFolder = this.folderTree[index]
      for (let i = this.folderTree.length; i != (index + 1); i--) {
        this.folderTree.pop()
      }
      return
    }
    if (index == 0) {
      this.contentList = this.folderTree[0].document_list!
      this.selectedFolder = this.folderTree[0]
      for (let i = this.folderTree.length; i != 1; i--) {
        this.folderTree.pop()
      }
      return
    }

    if (this.folderTree.length == 0) {
      return
    }

    if (this.folderTree.length - 1 == 0) {
      this.selectedFolder = { name: '' }
      this.contentList = this.routerFolder
      this.folderTree.pop()
    } else {
      this.folderTree.pop()
      this.selectedFolder = this.folderTree[this.folderTree.length - 1]
      this.contentList = this.folderTree[this.folderTree.length - 1].document_list!
    }
  }

  cour_name = decodeURIComponent(this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 3])
  blockContentList = this.route.url.split(/\//g)[this.route.url.split(/\//g).length - 2]
  cleanContent = decodeURIComponent(this.blockContentList.replace(/%20/g, ' '))
  contentType = decodeURIComponent(this.cleanContent)
  constructor(private http: HttpClient, private router: ActivatedRoute, private route: Router) { }
  // ngAfterViewChecked(): void {
  //   this.getFileList()
  // }
  isAdmin?:boolean = localStorage.getItem('user-type') == 'admin'
  ngAfterViewInit(): void {
    this.isAdmin = localStorage.getItem('user-type') == 'admin'
    this.getFileList()
  }

  readonly deletDocumentRoute = 'http://localhost:4200/support/file/del'
  readonly updateFolderRoute = 'http://localhost:4200/support/file/unlink'
  deleteDocument(i: number) {
 let tempFileName:string = this.contentList[i].name!
    this.contentList.splice(i, 1);

    this.http.post(this.deletDocumentRoute,{courName:this.cour_name,contentType:this.contentType,documentName:tempFileName}).pipe(map((data)=>{ // + 1 (because of the splice())

    })).subscribe((res) =>{

    })

    this.http.post(this.updateFolderRoute,{parentFolderNames:this.routerFolder,contentType:this.contentType,cour_name:this.cour_name,contentList:this.contentList}).pipe(map((data) =>{

      console.log("Done !")
     })).subscribe((res) =>{

     })

  }
  getFileList() {


    let foldersStringName: string[] = []

    if (this.folderTree.length == 0) {
      foldersStringName.push(this.contentType)
    } else {
      for (let i = 0; i < this.folderTree.length - 1; i++) {
        foldersStringName.push(this.folderTree[i].name!)
      }
    }

    let params = new HttpParams().set('cour_name', this.cour_name).set('content_type', this.contentType).set('foldersName', foldersStringName.join(', ')).set('selectedFolder', this.selectedFolder.name!)
    this.http.get(this.getFileListRoute, { params: params }).pipe(map((data: any) => {
      this.contentList = data
      this.routerFolder = this.contentList


    })).subscribe((res) => {

    })
  }

  ngOnInit(): void {


  }

}
// How does the folder system works ? :

/*

For communicating with the <app-router> component, i passed input. These inputs include all data required to find the location and the ACTUAL state of the folder tree

*/
