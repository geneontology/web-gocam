import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { UrlHandlerService } from './url-handler.service';

import * as jsyaml from "js-yaml";

export enum UsageType {
  research = "Research",
  curation = "Curation",
  development = "Development",
  unknown = "Unknown"
}

@Injectable()
export class UserService {

  uType: UsageType = UsageType.unknown;

  users;

  constructor(private http: Http,
    private urlHandler: UrlHandlerService) { }


  getUsage(): string {
    return this.uType;
  }

  setUsage(uType: UsageType) {
    this.uType = uType;
  }

  isUsageDefined(): boolean {
    return this.uType != UsageType.unknown;
  }


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
