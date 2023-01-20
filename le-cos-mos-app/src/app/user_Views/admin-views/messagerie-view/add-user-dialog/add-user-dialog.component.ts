import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss']
})
export class AddUserDialogComponent implements OnInit {
  readonly addUserToGroupRoute = "http://localhost:4200/chat/user/add"
  constructor(public dialogRef:MatDialogRef<AddUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{globalIndex:number,name?:string},private http:HttpClient) {



  }
  globalIndex = this.data.globalIndex
  name = this.data.name
  readonly getUserListRoute = "http://localhost:4200/user/users/id"
  userList:User [] = []
  isSelected:boolean = false

  userToAdd_Temp:User [] = []





   addUserToGroup(){


    return  this.http.post<string>(this.addUserToGroupRoute,{name:this.name,userList:this.userToAdd_Temp,responseType:'text'}).pipe(map( (data) =>{




    })).subscribe((res) => {
      this.dialogRef.close()
    })


  }

  applyFilter(event?: Event,name?:string) {
    let userName
    if(event == undefined) {
       userName = name
    } else {
      userName = (event!.target as HTMLInputElement).value;
    }
      console.log(userName)

      const querParam = new HttpParams().set('id', userName!);
   this.http.get(this.getUserListRoute,{params:querParam,responseType:'text'}).pipe(map((data) => {
    this.userList = JSON.parse(data)

   })).subscribe(res => {})
      }


      async selectUser(users:User) {
        let index:number = this.userToAdd_Temp.lastIndexOf(users)
        if(this.userToAdd_Temp.includes(users)) {
         this.userToAdd_Temp.splice(index, 1); // 2nd parameter means remove one item only

        } else {
          await Promise.resolve(this.userToAdd_Temp.push(users))
          console.log(this.userToAdd_Temp)
        }
      }



  ngOnInit(): void {
    this.applyFilter(undefined,' ')
  }

}
