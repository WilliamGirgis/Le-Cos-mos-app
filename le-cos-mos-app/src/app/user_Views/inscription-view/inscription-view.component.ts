import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { formErrors, errorMessages } from '../../interface&classe/interfaces';

@Component({
  selector: 'app-inscription-view',
  templateUrl: './inscription-view.component.html',
  styleUrls: ['./inscription-view.component.scss']
})
export class InscriptionViewComponent implements OnInit {
  readonly registerUserURL = 'http://localhost:4200/user/users';

  subscribeForm:FormGroup = this.formBuilder.group({

     email:['',[Validators.required,Validators.email]],
     firstname : ['',[Validators.required]],
     lastname: ['', [Validators.required]],
     password: ['',[Validators.required,Validators.minLength(2)]],
     confirmPsw: ['',[Validators.required,this.isEqual()]] // Problème du "undefined" lorsque l'on rajoute le Validators.required


    }
    );
    isValid = this.subscribeForm.valid

    psw:string = ''
    isEqual(): ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        return (this.psw != control.value && control.value != '') ? {isEqual: {isEqual: control.value}} : null;
        //&& control.value != '' -> car sinon les deux check se font (le required et le isEqual qui entrainent un "undefined" )
      };
    }

    errorMessages:errorMessages = {
      email: {
        required:"*L'email est necéssaire",
        email :"*Le format de l'email n'est pas valide"
      },
      firstname: {
        required:"*Veuillez rentrer votre prénom",
      },
      lastname: {
        required:"*Veuillez rentrer votre nom",
      },
      password: {
        required:"*Le mot de passe est necéssaire",
        minlength: "*Le mot de passe doit contenir au moin 12 caractères"

      },
      confirmPsw: {
        required:"*Veuillez confirmer le mot de passe",
        isEqual: "*Le mot de passe n'est pas identique"
      }
    }



    formErrors:formErrors = { email:'' ,firstname: '', lastname: '',password:'',confirmPsw:'' };

  constructor(private formBuilder:FormBuilder,private http:HttpClient) {
    this.subscribeForm.valueChanges.subscribe((data) => {
      this.psw =  this.subscribeForm.get('password')!.value
this.subscribeForm.get('confirmPsw')!.updateValueAndValidity()// Nécessaire pour vérifier la validité lorsque le "confirmPsw" a été modifié, mais pas le "password"
      this.isValid = this.subscribeForm.valid
 const form = this.subscribeForm


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

  type = 'text'
  showHidePassword() {

    if(this.type === 'password') {
      this.type = 'text'
    } else {
    this.type = 'password'
    }
  }

  register() {
    let email = this.subscribeForm.get('email')!.value
    let firstname = this.subscribeForm.get('firstname')!.value
    let lastname = this.subscribeForm.get('lastname')!.value
    let password = this.subscribeForm.get('password')!.value
    let userType = 'Etudiant' // valeur par défault
    let user = {userType:userType,email: email,firstname:firstname,lastname:lastname,password:password,planningNameGroupBelonging:[],groupsNameDiscussionBelonging:[]};
    return this.http
      .post(this.registerUserURL, user)
      .pipe(
        map((data) => {
        })
      )
      .subscribe((result) => {});
  }


  ngOnInit(): void {
  }

}
