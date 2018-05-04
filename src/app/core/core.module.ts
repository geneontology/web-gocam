import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterComponent } from './footer/footer.component';
import { PreferencesService } from './preferences.service';
import { UrlHandlerService } from './url-handler.service';
import { HttpClientJsonpModule } from '@angular/common/http';

@NgModule({
  
  imports: [
    CommonModule,
    HttpClientJsonpModule,  // for linkedin and tumblr share counts
  ],
  
  declarations: [
    FooterComponent
  ],
  
  providers: [
    PreferencesService,
    UrlHandlerService
  ],

  exports: [
    FooterComponent
  ]

})
export class CoreModule { }
