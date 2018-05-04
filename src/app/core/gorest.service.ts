import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import * as xml2js from 'xml2js';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

@Injectable()
export class GoRESTService {

  baseUrl = "https://uumywyarhi.execute-api.us-west-1.amazonaws.com/gocam/"

  constructor(private http: Http,
              private utils: UtilsService) {
  }


  getMostRecents(nb: number): Observable<object> {
    return this.http.get(this.baseUrl + "models/last/" + nb);
  }

  getModelList(start: number): Observable<object> {
    return this.http.get(this.baseUrl + "models");
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
    return this.http.get(this.baseUrl + "models/bps?gocams=" + gocamString);
  }

  getModelsGOs(gocams: string[]): Observable<object> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.http.get(this.baseUrl + "models/gos?gocams=" + gocamString);
  }

  getAllModelsGOs(): Observable<object> {
    return this.http.get(this.baseUrl + "models/go");
  }


 

}

