import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserService } from './user.service';

const routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserProfileComponent }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    UserProfileComponent,
    UserListComponent
  ],
  providers: [
    UserService
  ]
})
export class UserModule { }
