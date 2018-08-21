import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModelListComponent } from './model-list/model-list.component';
import { ModelComponent } from './model/model.component';

import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { ModelsModule } from '../models/models.module';

@NgModule({
  imports: [
    CommonModule,
    MatIconModule,
    MatCardModule,
    ModelsModule
  ],
  exports: [
    ModelListComponent
  ],
  providers: [

  ],
  declarations: [ModelListComponent, ModelComponent]
})
export class RecentModelsModule { }
