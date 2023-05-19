import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { ModifyItemDialogComponent } from './modify-item-dialog/modify-item-dialog.component';

@Component({
  selector: 'app-router-top',
  templateUrl: './router-top.component.html',
  styleUrls: ['./router-top.component.scss']
})
export class RouterTopComponent implements OnInit,AfterContentChecked {



  constructor(public dialog:MatDialog,private router:Router,private route: ActivatedRoute) {
    dialog.afterAllClosed.subscribe((res) => {
      this.dialogClosedPing.emit()
    })
  }
  ngAfterContentChecked(): void {
    this.isDetails = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]

  }


  openAddItemDialog() {
    this.dialog.open(AddItemDialogComponent, {width:'50vw',height:'70vh',data: {publication:'null',imgLink:'imgLink'} })

  }
  openModifyItemDialog() {
    this.dialog.open(ModifyItemDialogComponent, {width:'50vw',height:'70vh',data: {routeUrl:this.router.url,imgLink:'imgLink'} })

  }
  navigateBack(): void {
    this.isDetails = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
    if((this.isDetails == 'list')) {
      this.router.navigate(['../..'], { relativeTo: this.route });

    } else {
      this.router.navigate(['./list'], { relativeTo: this.route })

    }
  }
  lvl0Block = this.router.url.split(/\//g)[3] // /supports
  lvl1Block = this.router.url.split(/\//g)[3]
  lvl2Block = this.router.url.split(/\//g)[4]
  lvl3Block = this.router.url.split(/\//g)[5]
  lvl4Block = this.router.url.split(/\//g)[6]
@Output() dialogClosedPing:EventEmitter<any> = new EventEmitter()

  lvl1BlockClean =  this.lvl1Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl2BlockClean = this.lvl2Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl3BlockClean = this.lvl3Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl4BlockClean = this.lvl4Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  //

  isDetails:string = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]


  ngOnInit(): void {
  }

}
