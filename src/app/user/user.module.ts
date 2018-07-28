import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

const routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [
    SharedModule,
    SharedMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserProfileComponent,
    UserListComponent
  ],
  providers: [
  ]
})
export class UserModule { }
