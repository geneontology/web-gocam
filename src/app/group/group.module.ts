import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { GroupProfileComponent } from './group-profile/group-profile.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupService } from './group.service';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

const routes = [
  { path: 'groups', component: GroupListComponent },
  { path: 'groups/:id', component: GroupProfileComponent }
];

@NgModule({
  imports: [
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    GroupProfileComponent,
    GroupListComponent
  ],
  providers: [
    GroupService
  ]
})
export class GroupModule { }
