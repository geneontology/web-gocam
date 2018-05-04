import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlexLayoutModule } from "@angular/flex-layout";
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { ChartsModule } from 'ng2-charts';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatChipsModule } from '@angular/material/chips';

import { SuiModule } from 'ng2-semantic-ui';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { UrlHandlerService } from './url-handler.service';
import { PreferencesService } from './preferences.service';
import { FormatService } from './format.service';
import { CamSparqlService } from './cam-sparql.service';


@NgModule({

  imports: [
    CommonModule
  ],

  declarations: [],

  providers: [
    UrlHandlerService,
    PreferencesService,
    FormatService,
    CamSparqlService
  ],

  exports: [
    CommonModule,
    MatChipsModule,
    FlexLayoutModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatMenuModule,
    ChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,

    SuiModule,
    NgxChartsModule
  ]

})
export class SharedModule { }
