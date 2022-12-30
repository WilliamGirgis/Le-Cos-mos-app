import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs/internal/operators/map';
import { AddPublicationComponent } from './add-publication-view/add-publication.component';
import { PublicationModel } from './add-publication-view/publication-model';
//import * as data from '../publications/posts.json';

@Component({
  selector: 'app-home-view',
  templateUrl: './home-view.component.html',
  styleUrls: ['./home-view.component.scss']
})
export class HomeViewComponent implements OnInit {
  //posts: any = (data as any).default;
  constructor(public dialog:MatDialog,private router: Router,private http:HttpClient) {
    dialog.afterAllClosed.subscribe((res) => {
      this.getPublication()
    })
  }
  publicationList: PublicationModel[] = [];


  openSavePostForm() {
    this.dialog.open(AddPublicationComponent, {width:'70vw',height:'max-content'})
  }
  getPublication() {
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
        );*/
      });
  }

  deletePost(index:number) {
   let ind = index +1
    if(!window.confirm("Are you sure you wanna delete the publication number " + ind + " ?")) {
      return
        }
    this.http
      .post('http://localhost:4200/publication/publish/del', { index: index, })
      .pipe(
        map((data) => {
          this.getPublication();
        })
      )
      .subscribe((response) => {});
  }


  ngOnInit(): void {
this.getPublication()
  }


}



/*#btn-wrapper {
position: absolute;
top: 5vh;
right: 15vw;
color: var(--white-them-color);
& button {
  background-color: var(--blue-them-color);
  font-weight: bolder;
  border-radius: 10px;
     &:first-child {
     margin-right: 20px;
     }
     &:last-child {
      margin-right: 20px;
     }
}
}

#wrapper {
  width: 100%;
  height: fit-content;
  text-align: center;
  height: 70vh;
  display: inline-block;
}

#publication {

  width: 45%;
  color: rgb(207, 179, 137);
  height: 100px;
  margin: auto 10px auto auto;
  background-color: var(--blue-them-color);
  display: inline-flex;
  cursor: pointer;
  font-size: 90% ;
  transition: 200ms ease-in-out;
}
*/
