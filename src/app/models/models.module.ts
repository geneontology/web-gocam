import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GOCam } from './gocam';
import { GOCamGO } from './gocam-go';
import { GOCamGP } from './gocam-gp';
import { GOCamPMID } from './gocam-pmid';
import { SPARQLQuery } from './sparql-query';


@NgModule({
  imports: [
    CommonModule,    
  ],
  exports : [
  ]
})
export class ModelsModule { }
