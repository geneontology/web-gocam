import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class GoSPARQLService {

  baseUrl = "http://rdf.geneontology.org/blazegraph/sparql";

  constructor(private http: Http) { }

  submit(query: string): Observable<any> {
//    console.log("sending query: " + query);
//    return this.http.get(this.baseUrl, query);
    return this.http.get(this.baseUrl + "?query=" + encodeURIComponent(query));

  }

}
