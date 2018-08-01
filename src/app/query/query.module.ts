import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../shared-material/shared-material.module';

import { SparqlExamplesComponent } from './sparql-examples/sparql-examples.component';

const routes = [
  { path: 'query/sparql-examples', component: SparqlExamplesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedMaterialModule
  ],
  declarations: [SparqlExamplesComponent]
})
export class QueryModule { }
