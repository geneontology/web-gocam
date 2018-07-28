import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { PreferencesService } from './preferences.service';
import { UrlHandlerService } from './url-handler.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { AbstractDataService } from './abstract-data.service';
import { GoRESTService } from './gorest.service';
import { UtilsService } from './utils.service';
import { GoSPARQLService } from './gosparql.service';
import { SparqlrService } from './sparqlr.service';
import { CacheService } from './cache.service';
import { PubmedRestService } from './pubmed-rest.service';

import { ModelsModule } from '../models/models.module';
import { QueriesModule } from '../queries/queries.module';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientJsonpModule,  // for linkedin and tumblr share counts
    ModelsModule,
    QueriesModule
  ],
  
  declarations: [
    FooterComponent
  ],
  
  providers: [
    AbstractDataService,
    GoRESTService,
    GoSPARQLService,
    SparqlrService,
    PubmedRestService,
    PreferencesService,
    UrlHandlerService,
    UtilsService,
    CacheService
  ],

  exports: [
    FooterComponent
  ]

})
export class CoreModule { }
