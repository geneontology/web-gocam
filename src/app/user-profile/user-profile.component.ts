import { Component, OnInit } from '@angular/core';
import { CamSparqlService } from '../cam-sparql.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  orcid: string;

  constructor(private sparqlHandler: CamSparqlService) { }

  ngOnInit() {

  }

}

export interface UserProfile {
  name: string;
  organization: string;
  affiliation: string[];
  productionModels: number;
  developmentModels: number;
  joinDate: Date;
}