import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { PreferencesService } from './preferences.service';
import { UrlHandlerService } from './url-handler.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoRESTService } from './gorest.service';
import { UtilsService } from './utils.service';
import { GoSPARQLService } from './gosparql.service';
import { SparqlrService } from './sparqlr.service';
import { CacheService } from './cache.service';
import { PubmedRestService } from './pubmed-rest.service';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientJsonpModule,  // for linkedin and tumblr share counts
  ],
  
  declarations: [
    FooterComponent
  ],
  
  providers: [
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
