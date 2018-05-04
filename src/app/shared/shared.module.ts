import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from "@angular/flex-layout";


import { ChartsModule } from 'ng2-charts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { FeedbackComponent } from './feedback/feedback.component';
import { SocialSharingComponent } from './social-sharing/social-sharing.component';

import { FormatService } from './format.service';
import { CamSparqlService } from './cam-sparql.service';


@NgModule({

  imports: [
    CommonModule
  ],

  declarations: [
    FeedbackComponent, 
    SocialSharingComponent
  ],

  providers: [
    FormatService,
    CamSparqlService
  ],

  exports: [
    CommonModule,
    FlexLayoutModule,

    ChartsModule,
    NgxChartsModule,

    FeedbackComponent,
    SocialSharingComponent
  ]

})
export class SharedModule { }
