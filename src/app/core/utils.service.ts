import { Injectable } from '@angular/core';

import * as jsyaml from "js-yaml";


@Injectable()
export class UtilsService {

  constructor() { }


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

  lastUpdate(): string {
    return "May, 2018";
  }

}
