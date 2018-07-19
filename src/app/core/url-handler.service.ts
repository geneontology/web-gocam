import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class UrlHandlerService {

  constructor(private utilsService: UtilsService) { }

  getRESTEndpoint() {
    return environment.swaggerUrl;
  }

  getSPARQLEndPoint() {
//    return "http://rdf.geneontology.org/blazegraph/#query";
    return "query/sparql-examples";
  }

  getNoctuaPlatform() {
    return "http://noctua.berkeleybop.org/";    
  }

  getAmigoTerm(goterm: string) {
    goterm = this.extractGOTerm(goterm);
    return "http://amigo.geneontology.org/amigo/term/" + goterm;
  }

  getDBXRefs(): string {
    return "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/db-xrefs.yaml";    
  }

  getURLGroupContacts(): string {
    return "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/group-contacts.csv";
  }

  getURLGroupMetaData(): string {
    return "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/groups.yaml";
  }

  getURLUserMetaData(): string {
    return "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/users.yaml";
  }


  getURLNoctuaModelDescription(): string {
    //    return "https://github.com/geneontology/minerva/blob/master/specs/owl-model.md";
    //    return "http://wiki.geneontology.org/index.php/Cam";
    return "http://wiki.geneontology.org/index.php/GO-CAM";
  }

  getDownloadURL_GOCAM_TTL(): string {
    return "https://s3.us-east-2.amazonaws.com/noctua.dev/GO-CAMs.ttl.gz";
  }

  getDownloadURL_GOCAM_JNL(): string {
    return "https://s3.us-east-2.amazonaws.com/noctua.dev/GO-CAMs-blazegraph.jnl.gz";
  }

  getDownloadURL_GOCAM_CTAB(): string {
    return "#";
  }

  getDownloadURL_GOCAM_SIF(): string {
    return "#";
  }


  getGraphView(goModelId: string) {
    var model = this.utilsService.curieGOCam(goModelId);
    //        return "http://tomodachi.berkeleybop.org/amigo/model/" + goModelId;
    return "http://noctua.berkeleybop.org/editor/graph/" + model;
  }

  getPathwayView(goModelId: string) {
    var model = this.utilsService.curieGOCam(goModelId);
    //        return "http://tomodachi.berkeleybop.org/amigo/model/" + goModelId;
    //return "http://noctua.berkeleybop.org/workbench/pathwayview/?model_id=" + goModelId;
    return this.getGraphView(model);
  }


  getPubMedAbstract(pmid: string) {
    pmid = pmid.replace("PMID:", "");
    return "https://www.ncbi.nlm.nih.gov/pubmed/" + pmid;    
  }

  extractGOTerm(term) {
    if(term.indexOf("/") != -1) {
      term = term.substring(term.lastIndexOf("/") + 1).trim();
    }
    term = term.replace("_", ":");
    return term;
  }

}
