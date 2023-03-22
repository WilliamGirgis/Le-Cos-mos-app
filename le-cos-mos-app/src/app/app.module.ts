import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionViewComponent } from './user_Views/inscription-view/inscription-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FlexModule } from '@angular/flex-layout';

//Materials
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button'
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card/';
import { MatIconModule } from '@angular/material/icon/';
import { MatListModule } from '@angular/material/list/';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio/';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog/';
import { MatFormFieldDefaultOptions } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';


import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginViewComponent } from './user_Views/login-view/login-view.component';
import { HttpService } from './services/http.services';
import { WebReqInterceptorService } from './services/webRequestInterceptor';
import { HomeViewComponent } from './user_Views/admin-views/home-view/home-view.component';
import { PlanningViewComponent } from './user_Views/admin-views/planning-view/planning-view.component';
import { SupportsViewComponent } from './user_Views/admin-views/supports-view-admin/supports-view.component';
import { ExamensViewComponent } from './user_Views/admin-views/examens-view-admin/examens-view.component';
import { MessagerieViewComponent } from './user_Views/admin-views/messagerie-view/messagerie-view.component';
import { StatistiquesViewComponent } from './user_Views/admin-views/statistiques-view-admin/statistiques-view.component';
import { GestionViewComponent } from './user_Views/admin-views/gestion-view-admin/gestion-view.component';
import { HandlerViewComponent } from './user_Views/admin-views/handler-view-admin/handler-view.component';
import { AuthGuard } from './guards/authguard';
import { AddPublicationComponent } from './user_Views/admin-views/home-view/add-publication-view/add-publication.component';
import { ViewPublicationComponent } from './user_Views/admin-views/home-view/view-publication/view-publication.component';
import { FileUploadModule } from 'ng2-file-upload';
import { ModifyPublicationViewComponent } from './user_Views/admin-views/home-view/modify-publication-view/modify-publication-view.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AddUserDialogComponent } from './user_Views/admin-views/messagerie-view/add-user-dialog/add-user-dialog.component';
import { GroupComponent } from './user_Views/admin-views/planning-view/group/group.component';
import { GroupPlanningComponent } from './user_Views/admin-views/planning-view/group-planning/group-planning.component';
import { AddUserToGroupComponent } from './user_Views/admin-views/planning-view/group/add-user-to-group/add-user-to-group.component';
import { DragDropModule } from '@angular/cdk/drag-drop'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { HomeViewEtudiantComponent } from './user_Views/etudiant-views/home-view-etudiant/home-view-etudiant.component';
import { SupportBlocksComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/support-blocks.component';
import { SupporUEComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/sante-blocks/support-ue-list/suppor-ue.component';
import { SupportContentComponent } from './user_Views/admin-views/supports-view-admin/support-content/support-content.component';
import { TransversalBlocksComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/transversal-blocks/transversal-blocks.component';
import { HorsSanteBlocksComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/hors-sante-blocks/hors-sante-blocks.component';
import { TdViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/td-view/td-view.component';
import { VideoViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/video-view/video-view.component';
import { AnnalesViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/annales-view/annales-view.component';
import { CmViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/cm-view/cm-view.component';
import { TransversalBlockListComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/transversal-blocks/transversal-block-list/transversal-block-list.component';
import { SanteBlocksComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/sante-blocks/support-ue-list.component';
import { HsBlockListComponent } from './user_Views/admin-views/supports-view-admin/support-blocks/hors-sante-blocks/hs-block-list/hs-block-list.component';
import { ContentBlockListComponent } from './user_Views/admin-views/supports-view-admin/support-content/content-block-list/content-block-list.component';
import { ExcercicesViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/excercices-view/excercices-view.component';
import { PlanchageViewComponent } from './user_Views/admin-views/supports-view-admin/support-content/planchage-view/planchage-view.component';
import { RouterTopComponent } from './user_Views/admin-views/supports-view-admin/router-top/router-top.component';
import { RouterTop2Component } from './user_Views/admin-views/supports-view-admin/router-top2/router-top2.component';
import { ListContentDisplayerComponent } from './user_Views/admin-views/supports-view-admin/support-content/list-content-displayer/list-content-displayer.component';
import { DetailsCmComponent } from './user_Views/admin-views/supports-view-admin/support-content/cm-view/details-cm/details-cm.component';
import { DetailsAnnalesComponent } from './user_Views/admin-views/supports-view-admin/support-content/annales-view/details-annales/details-annales.component';
import { DetailsExcercicesComponent } from './user_Views/admin-views/supports-view-admin/support-content/excercices-view/details-excercices/details-excercices.component';
import { DetailsPlanchagesComponent } from './user_Views/admin-views/supports-view-admin/support-content/planchage-view/details-planchages/details-planchages.component';
import { DetailsTdComponent } from './user_Views/admin-views/supports-view-admin/support-content/td-view/details-td/details-td.component';
import { DetailsVideoComponent } from './user_Views/admin-views/supports-view-admin/support-content/video-view/details-video/details-video.component';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

const routes: Routes = [
  {
    path: '',
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
    component: InscriptionViewComponent,
    data: { animation: 'Register' },
  },
  {
    path: 'admin',
    component: HandlerViewComponent,
    data: { animation: 'Admin' },
    canActivate: [AuthGuard]
    ,
    children: [
      {
        path: 'home',
        component: HomeViewComponent,
        data: { animation: 'Accueil' },

      },
      {
        path: 'planning',
        component: PlanningViewComponent,
        data: { animation: 'Planning' },
        children: [
          {
            path: 'group',
            component: GroupComponent
          },
          {
            path: ':id',
            component: GroupPlanningComponent
          }
        ]
      },
      {
        path: 'supports',
        component: SupportsViewComponent,
        data: { animation: 'Supports' },
        children:[      {
          path: 'blocks',
          component: SupportBlocksComponent,
        },
        { path: 'sante', component: SupporUEComponent},
          {path:'sante/:id',component:ContentBlockListComponent} ,
          {path:'sante/:id/cm',component:CmViewComponent,
          children:[
            {path:'details',component:DetailsCmComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsCmComponent}
        ]
        },
          {path:'sante/:id/td',component:TdViewComponent,
          children:[
            {path:'details',component:DetailsTdComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsTdComponent}
        ]},
          {path:'sante/:id/video',component:VideoViewComponent,
          children:[
            {path:'details',component:DetailsVideoComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsVideoComponent}
        ]},
          {path:'sante/:id/annales',component:AnnalesViewComponent,
          children:[
            {path:'details',component:DetailsAnnalesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsAnnalesComponent}
        ]},
          {path:'sante/:id/excercices',component:ExcercicesViewComponent,
          children:[
            {path:'details',component:DetailsExcercicesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsExcercicesComponent}
        ]},
          {path:'sante/:id/planchage',component:PlanchageViewComponent,
          children:[
            {path:'details',component:DetailsPlanchagesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsPlanchagesComponent}
        ]},
          { path: 'transversal', component: TransversalBlockListComponent},
          {path:'transversal/:id',component:ContentBlockListComponent,

          children:[
            {path:'details',component:DetailsCmComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsCmComponent}
        ]},
          {path:'transversal/:id/cm',component:CmViewComponent,
          children:[
            {path:'details',component:DetailsCmComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsCmComponent}
        ]},
          {path:'transversal/:id/td',component:TdViewComponent,
          children:[
            {path:'details',component:DetailsTdComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsTdComponent}
        ]},
          {path:'transversal/:id/video',component:VideoViewComponent,
          children:[
            {path:'details',component:DetailsVideoComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsVideoComponent}
        ]},
          {path:'transversal/:id/annales',component:AnnalesViewComponent,
          children:[
            {path:'details',component:DetailsAnnalesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsAnnalesComponent}
        ]},
          {path:'transversal/:id/excercices',component:ExcercicesViewComponent,
          children:[
            {path:'details',component:DetailsExcercicesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsExcercicesComponent}
        ]},
          {path:'transversal/:id/planchage',component:PlanchageViewComponent,
          children:[
            {path:'details',component:DetailsPlanchagesComponent},
            {path:'list',component:ListContentDisplayerComponent}
            ,
            {path:'list/:id',component:DetailsPlanchagesComponent}
        ]},

        { path: 'hors_sante', component: HsBlockListComponent},
        {path:'hors_sante/:id',component:ContentBlockListComponent},
        {path:'hors_sante/:id/cm',component:CmViewComponent,
        children:[
          {path:'details',component:DetailsCmComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsCmComponent}
      ]},
        {path:'hors_sante/:id/td',component:TdViewComponent,
        children:[
          {path:'details',component:DetailsTdComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsTdComponent}
      ]},
        {path:'hors_sante/:id/video',component:VideoViewComponent,
        children:[
          {path:'details',component:DetailsVideoComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsVideoComponent}
      ]},
        {path:'hors_sante/:id/annales',component:AnnalesViewComponent,
        children:[
          {path:'details',component:DetailsAnnalesComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsAnnalesComponent}
      ]},
        {path:'hors_sante/:id/excercices',component:ExcercicesViewComponent,
        children:[
          {path:'details',component:DetailsExcercicesComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsExcercicesComponent}
      ]},
        {path:'hors_sante/:id/planchage',component:PlanchageViewComponent,
        children:[
          {path:'details',component:DetailsPlanchagesComponent},
          {path:'list',component:ListContentDisplayerComponent}
          ,
          {path:'list/:id',component:DetailsPlanchagesComponent}
      ]}]
      },




      {
        path: 'examens',
        component: ExamensViewComponent,
        data: { animation: 'Examens' },
      },
      {
        path: 'messagerie',
        component: MessagerieViewComponent,
        data: { animation: 'Messagerie' },
      },
      {
        path: 'statistiques',
        component: StatistiquesViewComponent,
        data: { animation: 'Statistiques' },
      },
      {
        path: 'gestion',
        component: GestionViewComponent,
        data: { animation: 'Gestion' },
      }
    ]
  }
]


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
    ViewPublicationComponent,
    ModifyPublicationViewComponent,
    AddUserDialogComponent,
    GroupComponent,
    GroupPlanningComponent,
    AddUserToGroupComponent,
    HomeViewEtudiantComponent,
    SupportBlocksComponent,
    SupporUEComponent,
    SupportContentComponent,
    HorsSanteBlocksComponent,
    TdViewComponent,
    TransversalBlocksComponent,
    TransversalBlockListComponent,
    SanteBlocksComponent,
    HsBlockListComponent,
    ContentBlockListComponent,
    PlanchageViewComponent,
    AnnalesViewComponent,
    VideoViewComponent,
    CmViewComponent,
    ExcercicesViewComponent,
    RouterTopComponent,
    RouterTop2Component,
    ListContentDisplayerComponent,
    DetailsCmComponent,
    DetailsAnnalesComponent,
    DetailsExcercicesComponent,
    DetailsPlanchagesComponent,
    DetailsTdComponent,
    DetailsVideoComponent


  ],
  providers: [HttpService, { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptorService, multi: true }, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance }, AuthGuard, HttpService], //Mettre par default tous les input en "outline"
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
    FileUploadModule,
    PdfViewerModule,
    MatMenuModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule,


  ]
})


export class AppModule {

}
platformBrowserDynamic().bootstrapModule(AppModule);


