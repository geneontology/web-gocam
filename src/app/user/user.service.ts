import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';

import { UrlHandlerService } from '../core/url-handler.service';
import { UtilsService } from '../core/utils.service';

import * as jsyaml from "js-yaml";

import { environment } from '../../environments/environment';


@Injectable()
export class UserService {

  baseUrl = environment.apiUrl;

  constructor(private http: Http,
              private utils: UtilsService,
              private urlHandler: UrlHandlerService) {
  }

  getUserMetaData(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.http.get(this.baseUrl + "users/" + orcid);
  }

  getUserModels(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.http.get(this.baseUrl + "users/" + orcid + "/models");
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
    if (!orcid.startsWith(this.urlHandler.getORCID(''))) {
      orcid = this.urlHandler.getORCID(orcid);
    }
    return this.users.filter(user => user.uri === orcid)[0];
  }


}
