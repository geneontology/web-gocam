import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { UrlHandlerService } from '../shared/url-handler.service';

import * as jsyaml from "js-yaml";

@Injectable()
export class UserService {

  baseUrl = "https://uumywyarhi.execute-api.us-west-1.amazonaws.com/gocam/"


  constructor(private http: Http,
              private urlHandler: UrlHandlerService) { 
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
  var checkedOrcid = this.getORCID(orcid);
  return this.http.get(this.baseUrl + "users/" + orcid);
}

getGroupMetaData(id: string): Observable<object> {
  return this.http.get(this.baseUrl + "groups/" + id);
}

getUserModels(orcid: string): Observable<object> {
  var checkedOrcid = this.getORCID(orcid);
  return this.http.get(this.baseUrl + "users/" + orcid + "/models");

}

getModelsBPs(gocams: string[]): Observable<object> {
  var gocamString = gocams.reduce(this.concat);
  return this.http.get(this.baseUrl + "models/bps?gocams=" + gocamString);
}

getModelsGOs(gocams: string[]): Observable<object> {
  var gocamString = gocams.reduce(this.concat);
  return this.http.get(this.baseUrl + "models/gos?gocams=" + gocamString);
}

getAllModelsGOs(): Observable<object> {
  return this.http.get(this.baseUrl + "models/go");
}


getORCID(orcid: string) {
  var checkedOrcid = orcid;
  if(orcid.includes("http://orcid.org/")) {
    checkedOrcid = orcid.replace("http://orcid.org/", "");
  }
  return checkedOrcid;
}


  concat(a, b) {
    return a + "," + b;
  }






  users;

  loadUserMetaData() {
    if (!this.users) {
      var observer = this.http.get(this.urlHandler.getURLUserMetaData());
      observer.subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        var body = json._body;
        this.users = jsyaml.load(body);
      });
      return observer;
    }
  }

  /* automatically format orcid with http://orcid.org/ if missing */
  getUserMetaDataByORCID(orcid: string) {
    if(!orcid.startsWith("http://orcid.org/")) {
      orcid = "http://orcid.org/" + orcid;
    }
//    console.log(this.users.filter(user => user.uri === orcid));
    return this.users.filter(user => user.uri === orcid)[0];
  }  
    
  
}
