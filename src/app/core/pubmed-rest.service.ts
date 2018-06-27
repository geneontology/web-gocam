import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

export class PMIDMeta {
  uid: string;
  pubdate: string;
  epubdate: string;
  source: string;
  authors: [{
    name: string;
    authtype: string;
    clusterid: string;
  }];
  lastauthor: string;
  title: string;
  issn: string;
  essn: string;
  pubtype: [string];
  recordstatus: string;
  pubstatus: string;
  articleids: [{
    idtype: string;
    idtypen: number;
    value: string;
  }];
  fulljournalname: string;
  elocationid: string;
}

@Injectable()
export class PubmedRestService {

  pubmedMetaURL: string = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esummary.fcgi?db=pubmed&retmode=json";

  constructor(private httpClient: HttpClient) { }

  getMeta(pmid): Observable<PMIDMeta> {
//    console.log("receive request for: ", pmid);
    pmid = pmid.replace("PMID:", "");
    return this.httpClient.get<any>(this.pubmedMetaURL + "&id=" + pmid)
    .map(res => res.result[res.result.uids[0]]);
  }

}
