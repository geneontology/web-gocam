import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import * as jsyaml from "js-yaml";


@Injectable()
export class GoSPARQLService {

  baseUrl = "http://rdf.geneontology.org/blazegraph/sparql";

  constructor(private http: Http) { }

  submit(query: string): Observable<any> {
//    console.log("sending query: " + query);
//    return this.http.get(this.baseUrl, query);
    return this.http.get(this.baseUrl + "?query=" + encodeURIComponent(query));

  }


  getQuery(path: string) {
//    return this.http.get("https://raw.githubusercontent.com/lpalbou/temp-sparqlr/master/" + path)
//                    .map((response: Response) => (response));
  }

}

export interface SPARQLQuery {
  title: string;
  description: string;
  endpoint: string;
  query: string;
  variables: [{
    name: string;
    comment: string;
  }]
}