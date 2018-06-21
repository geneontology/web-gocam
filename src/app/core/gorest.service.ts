import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import * as xml2js from 'xml2js';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

@Injectable()
export class GoRESTService {

//  baseUrl = "https://uumywyarhi.execute-api.us-west-1.amazonaws.com/gocam/"
baseUrl = "https://api.geneontology.cloud/"

  constructor(private http: Http,
              private utils: UtilsService) {
  }


  getMostRecents(nb: number): Observable<object> {
    return this.http.get(this.baseUrl + "models/last/" + nb);
  }

  getModelList(): Observable<object> {
    return this.http.get(this.baseUrl + "models");
  }

  models = [];
  getStaticModelList() {
    this.getModelList().subscribe(data => {
            var json = JSON.parse(JSON.stringify(data));
            json = json._body;
            json = JSON.parse(json);
            json.map(res => {
              this.models.push(res);
            });
            return this.models;
          });        
  }

  getModelListRange(start: number, size: number): Observable<object> {
    return this.http.get(this.baseUrl + "models?start=" + start + "&size=" + size);      
  }

  getModelListDetails(start: number): Observable<object> {
    return this.http.get(this.baseUrl + "models/details");
  }

  getUserMetaData(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.http.get(this.baseUrl + "users/" + orcid);
  }

  getGroupMetaData(id: string): Observable<object> {
    return this.http.get(this.baseUrl + "groups/" + id);
  }

  getUserModels(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.http.get(this.baseUrl + "users/" + orcid + "/models");
  }

  getModelsBPs(gocams: string[]): Observable<object> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.http.get(this.baseUrl + "models/bp?gocams=" + gocamString);
  }

  getModelsGOs(gocams: string[]): Observable<object> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.http.get(this.baseUrl + "models/go?gocams=" + gocamString);
  }

  getAllModelsGOs(): Observable<object> {
    return this.http.get(this.baseUrl + "models/go");
  }


  getModelsGPs(gocams: string[]): Observable<object> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.http.get(this.baseUrl + "models/gp?gocams=" + gocamString);
  }
 

}

