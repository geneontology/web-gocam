import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroductionComponent } from './introduction/introduction.component';
import { RouterModule } from '../../../node_modules/@angular/router';
import { SharedMaterialModule } from '../shared-material/shared-material.module';


const routes = [
  { path: 'docs', component: IntroductionComponent }
];

@NgModule({
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule.forChild(routes)
  ],
  declarations: [IntroductionComponent]
})
export class DocumentationModule { }
