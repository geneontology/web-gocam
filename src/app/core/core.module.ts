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
    PreferencesService,
    UrlHandlerService,
    UtilsService
  ],

  exports: [
    FooterComponent
  ]

})
export class CoreModule { }
