import { Injectable } from '@angular/core';
import { HttpClient } from '../../../node_modules/@angular/common/http';

import { environment } from '../../environments/environment';

import * as jsyaml from "js-yaml";


@Injectable()
export class UtilsService {  
  
  releaseMetaData: any;

  constructor(private httpClient: HttpClient) { 
      this.httpClient.get(environment.zenodoRelease)
      .subscribe(data => {
        this.releaseMetaData = data;
      })      
  }


  extractORCID(orcid: string) {
    var checkedOrcid = orcid;
    if (orcid.includes("http://orcid.org/")) {
      checkedOrcid = orcid.replace("http://orcid.org/", "");
    }
    return checkedOrcid;
  }

  /* extract the id of a given url xxx/{id}. By default, if this is not a URL, return the parameter itself */
  extractURLID(url: string) {
    if(url.indexOf("/") == -1)
      return url;
    return url.substring(url.lastIndexOf("/") + 1);
  }


  concat(a, b) {
    return a + "," + b;
  }

  parseYAML(text: string) {
    return jsyaml.load(text);
  }

  /*
  TODO: I am fetching the last date from zenodo, but we should have a better strategy just in case zenodo is not chosen or used
  Another strategy: http://current.geneontology.org/notes.txt
  */
  lastUpdate(): string {
    if(!this.releaseMetaData)
      return "";
    return this.releaseMetaData.metadata.version;
  }

  genericSPARQLJSON(json) {
      let tmp = "";
      let tmpjs = [];
      json.results.bindings.map(elt => {
        tmp = "{";
        Object.keys(elt).forEach(function (key) {
          tmp += "\"" + key + "\":\"" + elt[key].value + "\",";
        });
        tmp = tmp.substring(0, tmp.length - 1);
        tmp += "}";
        tmpjs.push(JSON.parse(tmp));
      });
      return tmpjs;
  }

}
