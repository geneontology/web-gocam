import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { UrlHandlerService } from '../core/url-handler.service';

import * as jsyaml from "js-yaml";

@Injectable()
export class GroupService {

  groups;

  baseUrl = "https://uumywyarhi.execute-api.us-west-1.amazonaws.com/gocam/"

  constructor(private http: Http,
              private urlHandler: UrlHandlerService) { 
    if(!this.baseUrl.endsWith("/")) {
      this.baseUrl += "/";
    }
  }


  loadGroupMetaData() {
    if (!this.groups) {
      var observable = this.http.get(this.urlHandler.getURLGroupMetaData());
      observable.subscribe(data => {
        var json = JSON.parse(JSON.stringify(data));
        var body = json._body;
        this.groups = jsyaml.load(body);
      });
      return observable;
    }
  }

  getGroupMetaDataByShorthand(shorthand: string) {
//    console.log("result: ", this.groups.filter(group => group.shorthand === shorthand));
    return this.groups.filter(group => group.shorthand === shorthand)[0];
  }

  getGroupMeta(shorthand: string) {
    return this.http.get(this.baseUrl + "groups/" + shorthand);
  }
  
}
