
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SaveRouteService } from '../../services/save-route.service'
import { FileItem, FileUploader } from 'ng2-file-upload';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map } from 'rxjs';
@Component({
  selector: 'app-preferences-view',
  templateUrl: './preferences-view.component.html',
  styleUrls: ['./preferences-view.component.scss']
})
export class PreferencesViewComponent implements OnInit,AfterViewInit {

  constructor(private http:HttpClient,private savedRouteService: SaveRouteService) {
    this.downloadProfilPicture()
    this.uploader.onCompleteAll = () => {
      this.imgTouched = false
      this.uploader.clearQueue()
      this.downloadProfilPicture()
    }

    this.uploader.onCompleteItem = (file) => {


    }


    this.uploader.onWhenAddingFileFailed = (file) => {
      this.imgTouched = true

      let tempFile = file.rawFile
      this.imgFile = tempFile
      let img = new File([file.rawFile], file.name); // On transform le Blob en fichier
      let fr = new FileReader(); // On li le fichier et stock le nouveau format
      fr.readAsDataURL(img)
      fr.onloadend = () => {
        // la donnée à afficher dans le parametre '[src]' de la balise image
        this.imgFile = fr.result
      }

      // On sauvgarde le fichier à uploader.
      this.savedFile = new File([file.rawFile],file.name)



    }
    this.uploader.onAfterAddingFile = (file) => {





    }
    this.uploader.onBeforeUploadItem = (file) => {

      file.file.name = localStorage.getItem('user-id')!

      this.uploader.setOptions({headers:[
        { name: '_id', value: localStorage.getItem('user-id')!},
      ]
      });
    }

  }
  ngAfterViewInit(): void {
this.email = this.getMail()
  }

  imgTouched?:boolean = false
  savedFile?:File
  readonly downloadFileRoute: string = `http://localhost:4200/user/user/profil/file/get`

  isLoading:boolean = false
  downloadProfilPicture() {
let params:HttpParams = new HttpParams().set('_id',localStorage.getItem('user-id')!)
    this.http.get(this.downloadFileRoute,{params:params,responseType:'blob'}).pipe(map((data)=>{
      this.isLoading = true
      let img = new File([data], localStorage.getItem('user-id')!); // On transform le Blob en fichier
      let fr = new FileReader(); // On li le fichier et stock le nouveau format
      fr.readAsDataURL(img)
      fr.onloadend = () => {
        // la donnée à afficher dans le parametre '[src]' de la balise image
        this.imgFile = fr.result
        this.isLoading = false
      }
    })).subscribe((res) =>{

    })
  }
  password?:string = ''
  pswTouched?:boolean = false
  readonly passWordChangesRoute: string = `http://localhost:4200/user/user/profil/psw/modify`
  saveModifications(pswInputValue:string) {
    // On modifie la limite de la queue à 1 pour qu'on puisse ajoter le fichier enregistré dans le dernier appel de la fonction onWhenAddingFileFailed
     if(this.pswTouched) {
      let pswNId = { newPsw: pswInputValue,_id:localStorage.getItem('user-id') };
      return this.http
      .post(this.passWordChangesRoute, pswNId)
      .pipe(
        map((data) => {
         this.successMsgSaved =  "Votre mot de passe a été modifié avec succès"
         this.pswTouched = false
         setTimeout(() =>{
          this.successMsgSaved = undefined
         },2000)
        })
      )
      .subscribe((result) => {});
     }

     if(this.imgTouched) {
      this.uploader.options.queueLimit = 1
      this.uploader.addToQueue([this.savedFile!])
       this.uploader.uploadAll()
     }

     return


  }
  imgFile?: any
  readonly uploadFileRoute: string = `http://localhost:4200/user/user/profil/file/save`
   uploader: FileUploader = new FileUploader({
    url: this.uploadFileRoute,
    queueLimit: 0,
    method: 'post',

  });

  pswEditable?:boolean = false
  successMsgSaved?:string

  readonly getMailRoute: string = `http://localhost:4200/user/user/profil/mail`
  getMail():any  {

    const param = new HttpParams().set('_id',localStorage.getItem('user-id')!)

      this.http.get(this.getMailRoute,{params:param,responseType:'text'}).pipe(map((data) =>{
this.email = data
      }),catchError((e:any) =>{
        return e
      })).subscribe((res) =>{

      })

  }

  fname:string = localStorage.getItem('fname')!
  lname:string = localStorage.getItem('lname')!
  userType?:string = localStorage.getItem('user-type')!
  email?:string
  routeToNavBack?: string = this.savedRouteService.savedRoute

  ngOnInit(): void {

    this.getMail()


  }

}
