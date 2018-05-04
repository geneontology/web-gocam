import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatSidenavModule} from '@angular/material/sidenav';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { FooterDisclaimerComponent } from './footer-disclaimer/footer-disclaimer.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { QueryExamplesComponent } from './query-examples/query-examples.component';
import { DocumentationsComponent } from './documentations/documentations.component';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { ApiComponent } from './api/api.component';

import { UrlHandlerService } from './url-handler.service';
import { SearchComponent } from './search/search.component';
import { UsageTypeComponent } from './usage-type/usage-type.component';
import { UserService } from './user.service';
import { NewsComponent } from './news/news.component';

import { SuiModule } from 'ng2-semantic-ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { UseCasesComponent } from './use-cases/use-cases.component';
import { CamSparqlService } from './cam-sparql.service';


import { RouterModule, Routes } from '@angular/router';
import { BrowseModelsComponent } from './browse-models/browse-models.component';
import { HomeComponent } from './home/home.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { GroupProfileComponent } from './group-profile/group-profile.component';

import { ShareButtonModule } from '@ngx-share/button';
import { MatChipsModule } from '@angular/material/chips';
import { GroupService } from './group.service';
import { PreferencesService } from './preferences.service';
import { FormatService } from './format.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProcessProfileComponent } from './process-profile/process-profile.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'browse', component: BrowseModelsComponent },
  { path: 'users/:id', component: UserProfileComponent },
  { path: 'groups/:id', component: GroupProfileComponent },
  { path: 'process/:id', component: ProcessProfileComponent },
  { path: '**', component: PageNotFoundComponent }
];


@NgModule({

  declarations: [
    AppComponent,
    NavigationComponent,
    StatisticsComponent,
    DownloadsComponent,
    FooterDisclaimerComponent,
    WelcomeComponent,
    QueryExamplesComponent,
    DocumentationsComponent,
    ApiComponent,
    SearchComponent,
    UsageTypeComponent,
    NewsComponent,
    UseCasesComponent,
    BrowseModelsComponent,
    HomeComponent,
    UserProfileComponent,
    GroupProfileComponent,
    ProcessProfileComponent,
    PageNotFoundComponent
  ],

  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    RouterModule.forRoot(
      appRoutes /*,
      { enableTracing: true } // <-- debugging purposes only
      */
    ),

    HttpClientJsonpModule,  // for linkedin and tumblr share counts
    ShareButtonModule.forRoot(),

    MatChipsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,

    SuiModule,
    NgxChartsModule
  ],

  providers: [
    UrlHandlerService,
    UserService,
    GroupService,
    CamSparqlService,
    PreferencesService,
    FormatService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
