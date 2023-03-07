import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-add-user-to-group',
  templateUrl: './add-user-to-group.component.html',
  styleUrls: ['./add-user-to-group.component.scss']
})
export class AddUserToGroupComponent implements OnInit {
  readonly addUserToGroupRoute = "http://localhost:4200/planning/user/add"
  constructor(public dialogRef:MatDialogRef<AddUserToGroupComponent>,@Inject(MAT_DIALOG_DATA) public data:{globalIndex:number,name?:string,userList:User[]},private http:HttpClient) {



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

      const querParam = new HttpParams().set('id', userName!);
   this.http.get(this.getUserListRoute,{params:querParam,responseType:'text'}).pipe(map((data) => {
    let userListResult = JSON.parse(data)
    console.log(this.data.userList)
    this.userList = []
// Delete all occurence from the User array from parent component, and then assign the new array to the userList to print
let isDoubled:boolean = false

for(let userResponseIndex = 0;userResponseIndex < userListResult.length;userResponseIndex++) {
  isDoubled = false
  console.log(userListResult[userResponseIndex])
  for(let dataIndex = 0;dataIndex < this.data.userList.length;dataIndex++) {
    if(this.data.userList[dataIndex]._id == userListResult[userResponseIndex]._id || (userListResult[userResponseIndex].planningNameGroupBelonging.length >= 2)) { // Check if the user is already present in the group (data.userList)
      isDoubled = true
    }
  }


   if(!isDoubled) {
    this.userList.push(userListResult[userResponseIndex])
  }
}

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
