import { AfterContentInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-router-top',
  templateUrl: './router-top.component.html',
  styleUrls: ['./router-top.component.scss']
})
export class RouterTopComponent implements OnInit {

  constructor(private router:Router,private route: ActivatedRoute) { }

  navigateBack(): void {
    this.test = this.router.url.split(/\//g)[this.router.url.split(/\//g).length - 1]
    if((this.test == 'list')) {
      this.router.navigate(['..'], { relativeTo: this.route });

    } else {
      this.router.navigate(['./list'], { relativeTo: this.route })

    }
  }
  lvl0Block = this.router.url.split(/\//g)[3] // /supports
  lvl1Block = this.router.url.split(/\//g)[3]
  lvl2Block = this.router.url.split(/\//g)[4]
  lvl3Block = this.router.url.split(/\//g)[5]
  lvl4Block = this.router.url.split(/\//g)[6]


  lvl1BlockClean =  this.lvl1Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl2BlockClean = this.lvl2Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl3BlockClean = this.lvl3Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  lvl4BlockClean = this.lvl4Block.replace(/%20/g,' ').replace(/%C3%A9/g,'e')
  //

  test!:string


  ngOnInit(): void {
console.log(this.router.url.split(/\//g))

  }

}
