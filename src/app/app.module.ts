import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShareButtonModule } from '@ngx-share/button';

import {FormsModule} from '@angular/forms';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StatisticsComponent } from './statistics/statistics.component';

import { DownloadsComponent } from './downloads/downloads.component';
import { ApiComponent } from './api/api.component';
import { DocumentationsComponent } from './documentations/documentations.component';
import { UseCasesComponent } from './use-cases/use-cases.component';
import { BrowseModelsComponent } from './browse-models/browse-models.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ProcessModule } from './process/process.module';
import { RecentModelsModule } from './recent-models/recent-models.module';
import { DocumentationModule } from './documentation/documentation.module';


import { ChartsModule } from 'ng2-charts';
import { SharedMaterialModule } from './shared-material/shared-material.module';
import { QueryModule } from './query/query.module';

import {FlexLayoutModule} from "@angular/flex-layout";

import * as config from '../gocam-config.json';

const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseModelsComponent },
  { path: 'browse/:search', component: BrowseModelsComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({

  declarations: [
    AppComponent,

    NavigationComponent,
    HomeComponent,
    WelcomeComponent,
    StatisticsComponent,

    DownloadsComponent,
    ApiComponent,
    DocumentationsComponent,

    UseCasesComponent,

    BrowseModelsComponent,
    PageNotFoundComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    CoreModule,
    SharedMaterialModule,
    UserModule,
    GroupModule,
    DocumentationModule,
    ProcessModule,
    QueryModule,
    
    ChartsModule,

    RecentModelsModule,

    FlexLayoutModule,

    ShareButtonModule.forRoot(),
    RouterModule.forRoot(appRoutes), // advised to put the router at the end of imports
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
