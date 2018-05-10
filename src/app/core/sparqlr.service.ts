import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import * as jsyaml from "js-yaml";
import * as fs from "fs";

@Injectable()
export class SparqlrService {

  baseUrl = "https://13irjbwknl.execute-api.us-west-1.amazonaws.com/sparqlr";

  constructor(private http: Http) {
    if (!this.baseUrl.endsWith("/"))
      this.baseUrl += "/";
  }

  /*
  list(): Observable<object> {
    return this.http.get(this.baseUrl + "sparqlr/");
  }

  get(id: string): Observable<object> {
    return this.http.get(this.baseUrl + "sparqlr/" + encodeURIComponent(id));
  }
  */


  sparqlrList = [
    {
      id: 0,
      name: "GO-CAMs Contributors",
      comment: "Return the list of people who have contributed to GO-CAMs",
      uri: "https://raw.githubusercontent.com/geneontology/sparqlr/master/templates/website/UserList.yaml"
    },
    {
      id: 1,
      name: "GO-CAMs List",
      comment: "Return the list of production GO-CAMs (does not include GO-CAMs under development)",
      uri: "https://raw.githubusercontent.com/geneontology/sparqlr/master/templates/website/ModelList.yaml"
    },
    {
      id: 2,
      name: "Last GO-CAMs",
      comment: "Return the X last production GO-CAMs",
      uri: "https://raw.githubusercontent.com/geneontology/sparqlr/master/templates/website/LastModels.yaml"
    },
    {
      id: 3,
      name: "Contributor Meta",
      comment: "Return the Meta Data about a specific contributor",
      uri: "https://raw.githubusercontent.com/geneontology/sparqlr/master/templates/website/UserMeta.yaml"
    },
    {
      id: 4,
      name: "GO-CAMs GO-Terms",
      comment: "Return the list of GO-Terms used in a given GO-CAM",
      uri: "https://raw.githubusercontent.com/geneontology/sparqlr/master/templates/website/ModelGOs.yaml"
    }
  ];

  list() {
    return this.sparqlrList;
  }

  get(id: number): Observable<object> {
    return this.http.get(this.sparqlrList[id].uri);
//    return this.http.get(this.baseUrl + "sparqlr/" + encodeURIComponent(id));
  }

}
