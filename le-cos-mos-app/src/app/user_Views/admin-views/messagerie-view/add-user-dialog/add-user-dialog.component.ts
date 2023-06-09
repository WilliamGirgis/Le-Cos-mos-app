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
  readonly addUserToGroupRoute = "http://localhost:4200/chat/discussion/user/add"
  constructor(public dialogRef:MatDialogRef<AddUserDialogComponent>,@Inject(MAT_DIALOG_DATA) public data:{discussionId?:string,userList:User[]},private http:HttpClient) {



  }
  discussionId = this.data.discussionId
  readonly getUserListRoute = "http://localhost:4200/user/users/id"
  userList:User [] = []
  userListTest:User [] = [{email:'Willy@gmail.com',firstname:'Willy',ID:1,lastname:'Girgis',userType:'Professeur'},{email:'Adrien@gmail.com',firstname:'Adrien',ID:2,lastname:'Akgul',userType:'Etudiant'},{email:'Daniel@gmail.com',firstname:'Daniel',ID:3,lastname:'Akgul',userType:'Etudiant'}]
  isSelected:boolean = false

  userToAdd_Temp:User [] = []





   addUserToGroup(){


    return  this.http.post<string>(this.addUserToGroupRoute,{discussionId:this.discussionId,userList:this.userToAdd_Temp,responseType:'text'}).pipe(map( (data) =>{
      this.dialogRef.close()



    })).subscribe((res) => {

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
// Delete all occurence from the User array from parent component, and then assign the new array to the userList to print
   let isDoubled:boolean = false
   this.userList = []
    for(let userResponseIndex = 0;userResponseIndex < userListResult.length;userResponseIndex++) {
      isDoubled = false
      for(let dataIndex = 0;dataIndex < this.data.userList.length;dataIndex++) {
        if(this.data.userList[dataIndex]._id == userListResult[userResponseIndex]._id) {
          isDoubled = true
        }
      }
       if(!isDoubled) {
        this.userList.push(userListResult[userResponseIndex])
      }

    }



      // this.data.userList.forEach((user_data) => {

      //   if(!(user_data._id == user._id)) {
      //     addUser = true
      //   } else {
      //     addUser = false
      //     console.log("EGAUX !" + dataIndex + " Responsezdata index = " + responseDataIndex)
      //   }
      //   responseDataIndex++
      //  })
      //  if(addUser) {
      //   this.userList.push(user)
      // }
      //  responseDataIndex++



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
