import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelComponent } from './model/model.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule
  ],
  exports: [
    ModelListComponent
  ],
  declarations: [ModelListComponent, ModelComponent]
})
export class RecentModelsModule { }
