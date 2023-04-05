import { Injectable, NgModule } from '@angular/core';
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
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
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
import { AddItemDialogComponent } from './user_Views/admin-views/supports-view-admin/router-top/add-item-dialog/add-item-dialog.component';
import { ModifyItemDialogComponent } from './user_Views/admin-views/supports-view-admin/router-top/modify-item-dialog/modify-item-dialog.component';
import { LogoutDialogComponentComponent } from './user_Views/admin-views/handler-view-admin/logout-dialog-component/logout-dialog-component.component';
import { PreferencesViewComponent } from './user_Views/preferences-view/preferences-view.component';
import { SaveRouteService } from './services/save-route.service';
import { BubuleChatComponent } from './static_Components/bubule-chat/bubule-chat.component';
import { Socket, SocketIoModule } from 'ngx-socket-io';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
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
        path: 'preferences',
        component: PreferencesViewComponent,
        data: { animation: 'Preferences' },
      },
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
            component: GroupComponent,
            data: { animation: 'GroupList' },
          },
          {
            path: ':id',
            component: GroupPlanningComponent,
            data: { animation: 'SelectedGroup' },
          }
        ]
      },
      {
        path: 'supports',
        component: SupportsViewComponent,
        children: [{
          path: 'blocks',
          component: SupportBlocksComponent,
          data: { animation: 'SupportsBlocks' },
        },
        { path: 'sante', component: SupporUEComponent,
        data: { animation: 'Sante' }, }, // The courses selection
        { path: 'sante/:id', component: ContentBlockListComponent,
        data: { animation: 'Sante2' } }, // The List of action-related item (Cours magistraux ; Travaux Dirigées ; Annales ; etc..)
        {
          path: 'sante/:id/cm', component: CmViewComponent,
          data: { animation: 'Sante3' },
           // The list of items inside the 'Cours magistraux' rubrique
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Sante4' } }
            ,
            { path: 'list/:id', component: DetailsCmComponent
            ,
            data: { animation: 'Sante5' }
           }
          ]
        },
        {
          path: 'sante/:id/td', component: TdViewComponent,
            data: { animation: 'Sante3' } ,
          children: [
            { path: 'list', component: ListContentDisplayerComponent
            ,
            data: { animation: 'Sante4' }  }
            ,
            { path: 'list/:id', component: DetailsTdComponent
            ,
            data: { animation: 'Sante5' }  }
          ]
        },
        {
          path: 'sante/:id/video', component: VideoViewComponent,
          data: { animation: 'Sante3' } ,
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Sante4' }
           }
            ,
            { path: 'list/:id', component: DetailsVideoComponent,
            data: { animation: 'Sante5' }  }
          ]
        },
        {
          path: 'sante/:id/annales', component: AnnalesViewComponent,
          data: { animation: 'Sante3' } ,
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Sante4' }  }
            ,
            { path: 'list/:id', component: DetailsAnnalesComponent,
            data: { animation: 'Sante5' }  }
          ]
        },
        {
          path: 'sante/:id/excercices', component: ExcercicesViewComponent,
          data: { animation: 'Sante3' } ,
          children: [
            { path: 'list', component: ListContentDisplayerComponent ,
            data: { animation: 'Sante4' }  }
            ,
            { path: 'list/:id', component: DetailsExcercicesComponent ,
            data: { animation: 'Sante5' }  }
          ]
        },
        {
          path: 'sante/:id/planchage', component: PlanchageViewComponent,
          data: { animation: 'Sante3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Sante4' }  }
            ,
            { path: 'list/:id', component: DetailsPlanchagesComponent,
            data: { animation: 'Sante5' }  }
          ]
        },
        { path: 'transversal', component: TransversalBlockListComponent
        ,
        data: { animation: 'Transversal' }, },
        {
          path: 'transversal/:id', component: ContentBlockListComponent
          ,
          data: { animation: 'Transversal2' },
        },
        {
          path: 'transversal/:id/cm', component: CmViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsCmComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },
        {
          path: 'transversal/:id/td', component: TdViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsTdComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },
        {
          path: 'transversal/:id/video', component: VideoViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsVideoComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },
        {
          path: 'transversal/:id/annales', component: AnnalesViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsAnnalesComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },
        {
          path: 'transversal/:id/excercices', component: ExcercicesViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsExcercicesComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },
        {
          path: 'transversal/:id/planchage', component: PlanchageViewComponent,
          data: { animation: 'Transversal3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'Transversal4' }, }
            ,
            { path: 'list/:id', component: DetailsPlanchagesComponent,
            data: { animation: 'Transversal5' }, }
          ]
        },

        { path: 'hors_sante', component: HsBlockListComponent
        ,
        data: { animation: 'HS' } },
        { path: 'hors_sante/:id', component: ContentBlockListComponent,
        data: { animation: 'HS2' } },
        {
          path: 'hors_sante/:id/cm', component: CmViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsCmComponent,
            data: { animation: 'HS5' } }
          ]
        },
        {
          path: 'hors_sante/:id/td', component: TdViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsTdComponent,
            data: { animation: 'HS5' } }
          ]
        },
        {
          path: 'hors_sante/:id/video', component: VideoViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsVideoComponent,
            data: { animation: 'HS5' } }
          ]
        },
        {
          path: 'hors_sante/:id/annales', component: AnnalesViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsAnnalesComponent,
            data: { animation: 'HS5' } }
          ]
        },
        {
          path: 'hors_sante/:id/excercices', component: ExcercicesViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsExcercicesComponent,
            data: { animation: 'HS5' } }
          ]
        },
        {
          path: 'hors_sante/:id/planchage', component: PlanchageViewComponent,
          data: { animation: 'HS3' },
          children: [
            { path: 'list', component: ListContentDisplayerComponent,
            data: { animation: 'HS4' } }
            ,
            { path: 'list/:id', component: DetailsPlanchagesComponent,
            data: { animation: 'HS5' } }
          ]
        }]
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


import {SocketIoConfig } from 'ngx-socket-io';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) {}

  sendMessage(msg: string) {
    this.socket.emit('message', msg);
  }
  getMessage() {
    return this.socket.fromEvent('message').pipe(map((data:any) => {data.msg
    console.log("Message received : " + data)
    }));
  }
}
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {transports: ['websocket'],withCredentials:true,} };
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
    DetailsVideoComponent,
    AddItemDialogComponent,
    ModifyItemDialogComponent,
    LogoutDialogComponentComponent,
    PreferencesViewComponent,
    BubuleChatComponent


  ],
  providers: [ChatService,HttpService, { provide: HTTP_INTERCEPTORS, useClass: WebReqInterceptorService, multi: true }, { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: appearance }, AuthGuard, HttpService, SaveRouteService], //Mettre par default tous les input en "outline"
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
    MatCommonModule,
    SocketIoModule.forRoot(config)

  ]
})



export class AppModule {

}
platformBrowserDynamic().bootstrapModule(AppModule);


