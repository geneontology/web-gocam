import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartsModule } from 'ng2-charts';

import { FeedbackComponent } from './feedback/feedback.component';
import { SocialSharingComponent } from './social-sharing/social-sharing.component';
import { AuthService } from './auth.service';



@NgModule({

  imports: [
    CommonModule
  ],

  declarations: [
    FeedbackComponent, 
    SocialSharingComponent
  ],

  providers: [
    AuthService
  ],

  exports: [
    CommonModule,

    ChartsModule,

    FeedbackComponent,
    SocialSharingComponent
  ]

})
export class SharedModule { }
