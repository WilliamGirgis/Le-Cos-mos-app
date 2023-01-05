import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionViewComponent } from './user_Views/inscription-view/inscription-view.component';
import {BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule, Routes } from '@angular/router';

import {FlexLayoutModule } from '@angular/flex-layout';
import {FlexModule } from '@angular/flex-layout';

//Materials
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {MatButtonToggleModule} from  '@angular/material/button-toggle';
import {MatButtonModule} from  '@angular/material/button'
import {MatInputModule} from  '@angular/material/input';
import {MatCardModule} from  '@angular/material/card/';
import {MatIconModule} from  '@angular/material/icon/';
import {MatListModule} from  '@angular/material/list/';
import {MatFormFieldModule} from  '@angular/material/form-field';
import {MatProgressSpinnerModule} from  '@angular/material/progress-spinner';
import {MatRadioModule} from  '@angular/material/radio/';
import {MatTableModule} from  '@angular/material/table';
import {MatPaginatorModule} from  '@angular/material/paginator';
import {MatToolbarModule} from  '@angular/material/toolbar';
import {MatMenuModule} from  '@angular/material/menu/';
import {MatDialogModule} from  '@angular/material/dialog/';
import {MatFormFieldDefaultOptions} from  '@angular/material/form-field';
import {MatProgressBarModule} from  '@angular/material/progress-bar';


import {CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginViewComponent } from './user_Views/login-view/login-view.component';
import { HttpService } from './services/http.services';
import { WebReqInterceptorService } from './services/webRequestInterceptor';
import { HomeViewComponent } from './user_Views/admin-views/home-view/home-view.component';
import { PlanningViewComponent } from './user_Views/admin-views/planning-view/planning-view.component';
import { SupportsViewComponent } from './user_Views/admin-views/supports-view/supports-view.component';
import { ExamensViewComponent } from './user_Views/admin-views/examens-view/examens-view.component';
import { MessagerieViewComponent } from './user_Views/admin-views/messagerie-view/messagerie-view.component';
import { StatistiquesViewComponent } from './user_Views/admin-views/statistiques-view/statistiques-view.component';
import { GestionViewComponent } from './user_Views/admin-views/gestion-view/gestion-view.component';
import { HandlerViewComponent } from './user_Views/admin-views/handler-view/handler-view.component';
import { AuthGuard } from './guards/authguard';
import { AddPublicationComponent } from './user_Views/admin-views/home-view/add-publication-view/add-publication.component';
import { ViewPublicationComponent } from './user_Views/admin-views/home-view/view-publication/view-publication.component';
import { FileUploadModule } from 'ng2-file-upload';


// Récupérer depuis localstorage
/*function userType() {
  return 'admin' | 'etudiant' | 'prof';


}*/



const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

const routes: Routes = [
  {
    path: '*',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  /*{ path: JSON.toString(), component: (() => {
    return LoginViewComponent
  })() },*/
  {
  path: 'login',
  component: LoginViewComponent,
  data: { animation: 'Login' },
  },
  {
  path: 'register',
  component: InscriptionViewComponent ,
  data: { animation: 'Register' },
  },
  {
    path: 'app',
    component: HandlerViewComponent ,
    data: { animation: 'App' },
    canActivate :[AuthGuard]
    ,
    children: [
      {
        path: 'home',
        component: HomeViewComponent ,
        data: { animation: 'Accueil' },
       /* children:[
          {path:'addPublications',
          component: AddPublicationComponent
        }
        ]*/
        },
      {
        path: 'planning',
        component: PlanningViewComponent ,
        data: { animation: 'Planning' },
      },
      {
        path: 'supports',
        component: SupportsViewComponent ,
        data: { animation: 'Supports' },
      },
      {
        path: 'examens',
        component: ExamensViewComponent ,
        data: { animation: 'Examens' },
      },
      {
        path: 'messagerie',
        component: MessagerieViewComponent ,
        data: { animation: 'Messagerie' },
      },
      {
        path: 'statistiques',
        component: StatistiquesViewComponent ,
        data: { animation: 'Statistiques' },
      },
      {
        path: 'gestion',
        component: GestionViewComponent ,
        data: { animation: 'Gestion' },
      }
    ]
    }

];


@NgModule({
    declarations: [
        AppComponent,
        InscriptionViewComponent,
        LoginViewComponent,
        HomeViewComponent,
        PlanningViewComponent,
        SupportsViewComponent,
        ExamensViewComponent,
        MessagerieViewComponent,
        StatistiquesViewComponent,
        GestionViewComponent,
        HandlerViewComponent,
        AddPublicationComponent,
        ViewPublicationComponent

    ],
    providers: [HttpService,{provide:HTTP_INTERCEPTORS,useClass:WebReqInterceptorService,multi:true},{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance},AuthGuard], //Mettre par default tous les input en "outline"
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
        CommonModule,
        //MatButtonToggle,
        MatInputModule,
        MatButtonToggleModule,
        FlexLayoutModule,
        MatButtonModule,
        FlexModule,
        MatCardModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatListModule,
        MatMenuModule,
        MatToolbarModule,
        MatDialogModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        HttpClientModule,
        MatTableModule,
        MatRadioModule,
        FormsModule,
        FlexModule,
        MatPaginatorModule,
        MatProgressBarModule,
        FileUploadModule
    ]
})


export class AppModule { }
