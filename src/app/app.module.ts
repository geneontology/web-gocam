import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { ShareButtonModule } from '@ngx-share/button';





import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavigationComponent } from './navigation/navigation.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { FooterDisclaimerComponent } from './footer-disclaimer/footer-disclaimer.component';

import { DownloadsComponent } from './downloads/downloads.component';
import { ApiComponent } from './api/api.component';
import { DocumentationsComponent } from './documentations/documentations.component';
import { QueryExamplesComponent } from './query-examples/query-examples.component';
import { UseCasesComponent } from './use-cases/use-cases.component';
import { NewsComponent } from './news/news.component';
import { BrowseModelsComponent } from './browse-models/browse-models.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { ProcessModule } from './process/process.module';
import { SharedModule } from './shared/shared.module';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseModelsComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({

  declarations: [
    AppComponent,
    NavigationComponent,
    FooterDisclaimerComponent,

    HomeComponent,
    WelcomeComponent,
    StatisticsComponent,

    DownloadsComponent,
    ApiComponent,
    DocumentationsComponent,
    NewsComponent,

    QueryExamplesComponent,
    UseCasesComponent,

    BrowseModelsComponent,
    PageNotFoundComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),

    SharedModule,
    UserModule,
    GroupModule,
    ProcessModule,

    HttpClientJsonpModule,  // for linkedin and tumblr share counts
    ShareButtonModule.forRoot()
  ],

  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
