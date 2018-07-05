import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import * as xml2js from 'xml2js';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

export class GOCamSimple {
  gocam: string;
  date: Date;
  title: string;
  names: [string];
  orcids: [string]
}

export class GOCam {
  gocam: string;
  date: string;
  title: string;
  orcids: [string];
  names: [string];
  groupids: [string];
  groupnames: [string];
}

export class GOCamGO {
  gocam: string;
  goclasses: [string];
  goids: [string];
  gonames: [string];
  definitions: [string]
}

export class GOCamGP {
  gocam: string;
  gpnames: [string];
  gpids: [string];
}


export class GOCamPMID {
  gocam: string;
  sources: [string];
}

@Injectable()
export class GoRESTService {

//  baseUrl = "https://uumywyarhi.execute-api.us-west-1.amazonaws.com/gocam/"
  baseUrl = "https://api.geneontology.cloud/"

  constructor(private http: Http,
              private httpClient: HttpClient,
              private utils: UtilsService) {
  }

  getMostRecents(nb: number): Observable<GOCamSimple[]> {
    return this.httpClient.get<[GOCamSimple]>(this.baseUrl + 'models/last/' + nb)
    .map(res => res);
  }

  getAllModelsPMIDs(): Observable<GOCamPMID[]> {
    return this.httpClient.get<[GOCamPMID]>(this.baseUrl + 'models/pmid')
    .map(res => res);
  }

  getModelsPMIDs(gocams): Observable<GOCamPMID[]> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<[GOCamPMID]>(this.baseUrl + 'models/pmid?gocams=' + gocamString)
    .map(res => res);
  }

  getModelList(): Observable<GOCam[]> {
    return this.httpClient.get<[GOCam]>(this.baseUrl + 'models')
    .map(res => res);
  }
 
  /*
  getModelList(): Observable<object> {
    return this.http.get(this.baseUrl + "models");
  }
  */

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

  /*
  getModelsGOs(gocams: string[]): Observable<object> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.http.get(this.baseUrl + "models/go?gocams=" + gocamString);
  }
  */


  getModelsGOs(gocams: string[]): Observable<GOCamGO[]> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<GOCamGO[]>(this.baseUrl + "models/go?gocams=" + gocamString)
    .map(res => res);
}
  
  getAllModelsGOs(): Observable<GOCamGO[]> {
    return this.httpClient.get<GOCamGO[]>(this.baseUrl + 'models/go/')
    .map(res => res);
  }


  getModelsGPs(gocams: string[]): Observable<GOCamGP[]> {
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<GOCamGP[]>(this.baseUrl + "models/gp?gocams=" + gocamString)
    .map(res => res);
  }
 

}

