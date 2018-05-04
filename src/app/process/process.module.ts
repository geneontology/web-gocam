import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { ProcessProfileComponent } from './process-profile/process-profile.component';
import { ProcessListComponent } from './process-list/process-list.component';
import { ProcessService } from './process.service';

const routes = [
  { path: 'processes', component: ProcessListComponent },
  { path: 'processes/:id', component: ProcessProfileComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProcessProfileComponent,
    ProcessListComponent
  ],
  providers: [
    ProcessService
  ]
})
export class ProcessModule { }
