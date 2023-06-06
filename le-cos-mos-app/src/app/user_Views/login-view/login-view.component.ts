import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { errorMessages, formErrors } from 'src/app/interface&classe/interfaces';
import { AuthService } from 'src/app/services/AuthService.service';
import { HttpService } from 'src/app/services/http.services';


@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.scss']
})
export class LoginViewComponent implements OnInit {

  constructor(private authService:AuthService,private formBuilder:FormBuilder, private router: Router,private httpService:HttpService) {
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
      .login(email.toLowerCase(), password)
      .pipe(
        map(async (data:any) => {
          console.log(data.error)
          let userType = localStorage.getItem('user-type')
          switch(userType?.toLocaleLowerCase()) {
            case 'etudiant':
              this.router.navigate(['etudiant']); // Navigue vers la vue 'accueil' par default
              break;
              case 'enseignant':
                this.router.navigate(['enseignant']); // Navigue vers la vue 'accueil' par default
                break;
                case 'admin':
                  this.router.navigate(['admin']); // Navigue vers la vue 'accueil' par default
                break;
                default:
                  break
          }
          })
      )
      .subscribe((res:any) => {


      });
  }



  type = 'password'
  showHidePassword() {

    if(this.type === 'password') {
      this.type = 'text'
      setTimeout(() => {
        this.type == 'text' ? this.type = 'password' : this.type
      },2500)
    } else {
    this.type = 'password'
    }
  }

  ngOnInit(): void {

  }

}
