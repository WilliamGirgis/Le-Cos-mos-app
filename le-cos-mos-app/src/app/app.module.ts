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
import {MatButtonToggleModule,MatButtonModule,MatInputModule,MatCardModule,MatIconModule,MatListModule, MatFormFieldModule, MatProgressSpinnerModule, MatRadioModule, MatTableModule, MatToolbarModule,MatMenuModule, MatDialogModule, MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material';

import {CommonModule } from '@angular/common';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { LoginViewComponent } from './user_Views/login-view/login-view.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'corridor',
    pathMatch: 'full',
  },
  {
    path: 'corridor',
    component: AppComponent,
   // data: { animation: 'Publications' },
    children: [
      {
        path: 'login',
        component: LoginViewComponent,
        //data: { animation: 'publicationList' },
      },
      {
        path: 'register',
        component: InscriptionViewComponent ,
        //data: { animation: 'publicationId' },
      },
    ],
  },


];


@NgModule({
    declarations: [
        AppComponent,
        InscriptionViewComponent,
        LoginViewComponent

    ],
    providers: [{provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}}], //Mettre par default tous les input en "outline"
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
        CommonModule,
        MatButtonModule,
        MatInputModule,
        MatButtonToggleModule,
        FlexLayoutModule,
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
        FlexModule
    ]
})
export class AppModule { }
