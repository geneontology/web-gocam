import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

import * as xml2js from 'xml2js';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class CamSparqlService {

  /*
  urlMostRecent = "http://rdf.geneontology.org/blazegraph/sparql?query=PREFIX%20metago%3A%20%3Chttp%3A%2F%2Fmodel.geneontology.org%2F%3E%0D%0A%0D%0APREFIX%20dc%3A%20%3Chttp%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%3E%0D%0A%0D%0ASELECT%20%3Fid%20%3Ftitle%20%3Fdate%0D%0AWHERE%20%7B%0D%0A%20%20%0D%0A%23%20%20BIND%28%3Chttp%3A%2F%2Fmodel.geneontology.org%2F584b49fa00000326%3E%20as%20%3Fcam%29%0D%0A%20%20%0D%0A%20%20GRAPH%20%3Fcam%20%7B%0D%0A%20%20%20%20%3Fcam%20metago%3AgraphType%20metago%3AnoctuaCam%20%20.%0D%0A%20%20%20%20%0D%0A%20%20%20%20%3Fcam%20%3Chttp%3A%2F%2Fwww.geneontology.org%2Fformats%2FoboInOwl%23id%3E%20%3Fid%20.%0D%0A%20%20%20%20%3Fcam%20dc%3Atitle%20%3Ftitle%20.%0D%0A%20%20%20%20%3Fcam%20dc%3Adate%20%3Fdate%20.%0D%0A%20%20%7D%0D%0A%0D%0A%7D%0D%0AORDER%20BY%20DESC%28%3Fdate%29%0D%0ALIMIT%20";

  urlGS_MostRecent = "https://genosearch.org:9000/api/gocam/last/";

  urlGS_ListModel = "https://genosearch.org:9000/api/gocam/list/";

  urlGS_UserMetadata = "https://genosearch.org:9000/api/gocam/usermeta/";

  urlGS_UserNbModels = "https://genosearch.org:9000/api/gocam/contribution/nb/";

  urlGS_UserModelIDs = "https://genosearch.org:9000/api/gocam/contribution/";
  */

//  baseUrl = "https://ipgc7a2b2e.execute-api.us-east-2.amazonaws.com/gocamv3/";
//  baseUrl = "https://api.gokb.net/gosparql/";
//  baseUrl = "https://e2dd1wml95.execute-api.us-east-1.amazonaws.com/gocam/";
  baseUrl = "https://api2.gokb.net/gosparql/";

  constructor(private httpClient: HttpClient,
              private http: Http) { 
  }


  /*
  getMostRecents(nb: number): Observable<object> {
    console.log("requesting for most recent GO-CAMs: ", this.urlGS_MostRecent + nb);
    return this.httpClient.get(this.urlGS_MostRecent + nb);
  } 
  */ 

  /*
 getMostRecents(nb: number) {
  console.log("requesting for most recent GO-CAMs: ", this.urlGS_MostRecent + nb);
  this.http.get(this.urlGS_MostRecent + nb).subscribe(data => {
    console.log(data);
  })
} 
*/

getMostRecents(nb: number): Observable<object> {
//  return this.http.get(this.urlGS_MostRecent + nb);
  return this.http.get(this.baseUrl + "models/last/" + nb);
} 

getModelList(start: number): Observable<object> {
//  return this.http.get(this.urlGS_ListModel + start);
return this.http.get(this.baseUrl + "models");
}

getModelListDetails(start: number): Observable<object> {
  //  return this.http.get(this.urlGS_ListModel + start);
  return this.http.get(this.baseUrl + "models/details");
}

getUserMetaData(orcid: string): Observable<object> {
  var checkedOrcid = this.getORCID(orcid);
//  return this.http.get(this.urlGS_ListModel + checkedOrcid);
  return this.http.get(this.baseUrl + "users/" + orcid);
}

getUserModels(orcid: string): Observable<object> {
  var checkedOrcid = this.getORCID(orcid);
//  return this.http.get(this.urlGS_UserModelIDs + checkedOrcid);
  return this.http.get(this.baseUrl + "users/" + orcid + "/models");

}

getModelsBPs(gocams: string[]): Observable<object> {
  var gocamString = gocams.reduce(concat);
  console.log("query: " + this.baseUrl + "models/bps?gocams=" + gocamString );
  return this.http.get(this.baseUrl + "models/bps?gocams=" + gocamString);
}

getModelsGOs(gocams: string[]): Observable<object> {
  var gocamString = gocams.reduce(concat);
  console.log("query: " + this.baseUrl + "models/gos?gocams=" + gocamString );
  return this.http.get(this.baseUrl + "models/gos?gocams=" + gocamString);
}


getORCID(orcid: string) {
  var checkedOrcid = orcid;
  if(orcid.includes("http://orcid.org/")) {
    checkedOrcid = orcid.replace("http://orcid.org/", "");
  }
  return checkedOrcid;
}

  query() {
//    return this.sparql.template(inyml, vars);
      return "toto";
  }
  
}

function concat(a, b) {
  return a + "," + b;
}
