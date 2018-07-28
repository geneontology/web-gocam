import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SparqlGO } from './sparql-go';
import { SparqlGP } from './sparql-gp';
import { SparqlGroups } from './sparql-groups';
import { SparqlModels } from './sparql-models';
import { SparqlPMIDs } from './sparql-pmids';
import { SparqlUsers } from './sparql-users';

@NgModule({
  imports: [
  ],
  exports: [
    CommonModule
  ]
})
export class QueriesModule { }
