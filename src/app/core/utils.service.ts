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
  
  curieGOCam(model: string) {
    if(model.indexOf("/")) {
      model = model.substring(model.lastIndexOf("/") + 1);
    }
    if(!model.startsWith("gomodel:")) {
      model = "gomodel:" + model;
    }
    return model;
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
