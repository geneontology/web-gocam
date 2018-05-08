import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class SparqlrService {

  baseUrl = "https://13irjbwknl.execute-api.us-west-1.amazonaws.com/sparqlr";

  constructor(private http: Http) { 
    if(!this.baseUrl.endsWith("/"))
      this.baseUrl += "/";
  }

  list(): Observable<object>  {
    return this.http.get(this.baseUrl + "sparqlr/");
  }

  get(id: string): Observable<object>  {
    return this.http.get(this.baseUrl + "sparqlr/" + encodeURIComponent(id));    
  }

}
