import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs';
import { errorMessages, formErrors } from 'src/app/interface&classe/interfaces';
import { AuthService } from 'src/app/services/AuthService.service';

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private authService:AuthService,private formBuilder:FormBuilder, private router: Router) {
    this.loginForm.valueChanges.subscribe((data) => {
      this.isValid = this.loginForm.valid
  const form = this.loginForm
      for(const input in this.formErrors) {
        if(this.formErrors.hasOwnProperty(input)) {
          this.formErrors[input] = ''
          const control = form.get(input) //We take the control name
          if(control && control.dirty && !control.valid) {
            let messages = this.errorMessages[input] as string
            for (let key in control.errors) {
              if(control.errors.hasOwnProperty(key)) {
                messages = JSON.stringify(messages)
                messages = JSON.parse(messages)[key]
                this.formErrors[input] += messages + ' '
              }
            }
          }
        }
      }
    })
   }

  msg:string = ''
  submited:boolean = false
  error:boolean = false

  loginForm:FormGroup = this.formBuilder.group({

    email:['',[Validators.required,Validators.email]],
    password: ['',[Validators.required]],
   }
   );
   isValid = this.loginForm.valid
   errorMessages:errorMessages = {
     email: {
       required: "*L'email est necéssaire",
       email: "*Le format de l'email n'est pas valide"
     },
     password: {
       required: "*Le mot de passe est necéssaire",
       minlength: "*Le mot de passe doit contenir au moin 12 caractères"
     },
     firstname: {

     },
     lastname: {

     },
     confirmPsw: {

     }
   }



  formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };



  loginUser() {
    let email = this.loginForm.get('email')!.value
    let password = this.loginForm.get('password')!.value
    this.authService
      .login(email, password)
      .pipe(
        map((data) => {
          this.router.navigate(['handler']);
          })
      )
      .subscribe((res:any) => {// Suppression tu type ": HttpResponse<any>" et remplacé par 'any'
        this.msg = res.body

      });
  }



  type = 'text'
  showHidePassword() {

    if(this.type === 'password') {
      this.type = 'text'
    } else {
    this.type = 'password'
    }
  }

  ngOnInit(): void {
  }

}
