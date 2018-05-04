import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { PreferencesService } from './preferences.service';
import { UrlHandlerService } from './url-handler.service';
import { HttpClientJsonpModule } from '@angular/common/http';
import { GoRESTService } from './gorest.service';
import { UtilsService } from './utils.service';

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
    PreferencesService,
    UrlHandlerService,
    UtilsService
  ],

  exports: [
    FooterComponent
  ]

})
export class CoreModule { }
