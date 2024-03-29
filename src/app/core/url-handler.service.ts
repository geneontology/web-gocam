import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';
import { CurieUtilService } from './curie-util.service';

@Injectable()
export class UrlHandlerService {

  constructor(private curieService : CurieUtilService) { }

  
  getAPIDoc() : string {
    return environment.swaggerUrl;
  }

  getAPI() : string {
    return environment.apiUrl;
  }


  getSPARQLDoc() : string {
//    return "query/sparql-examples";
    return environment.sparqlUrl + "#query";
  }

  getSPARQL() : string {
    return environment.sparqlUrl + "sparql";
  }


  getNoctuaPlatform() : string {
    return environment.noctuaUrl;
  }

  getAmigoTerm(goterm: string) : string {
    let curieGOTerm = this.curieService.getCurie(goterm);
    return environment.amigoTermUrl + curieGOTerm;
  }



  getGOContext() : string {
    return environment.goContext;
  }

  getURLGroupContacts(): string {
    return environment.groupContacts;
  }

  getURLGroupMetaData(): string {
    return environment.groupMeta;
  }

  getURLUserMetaData(): string {
    return environment.userMeta;
  }



  getDefaultView(goModelId?: string) : string {
    if(!goModelId)
      return environment.noctuaGraphViewUrl;
    return this.getGraphView(goModelId);
  }

  getGraphView(goModelId: string) : string {
    let model = goModelId;
    if(model.includes("http"))
      model = this.curieService.getCurie(goModelId);
    return environment.noctuaGraphViewUrl + model;
  }

  getPathwayView(goModelId: string) : string {
    let model = this.curieService.getCurie(goModelId);
    return environment.noctuaPathwayViewUrl + model;
  }

  getAlliancePathwayView(goModelId: string): string {
    let model = goModelId;
    if (model.includes("http")) {
      model = this.curieService.getCurie(goModelId);
    }
    return environment.noctuaAlliancePathwayViewUrl + model;
  }

  getPubMedAbstract(pmid: string) : string {
    let modpmid = pmid.replace("PMID:", "");
    return environment.pubmedUrl + modpmid;
  }


  getDocGOCAM() : string {
    return environment.docGOCAM;
  }

  getDocResearch() : string {
    return environment.docResearch;
  }

  getDocCuration() : string {
    return environment.docCuration;
  }

  getDocDevelopment() : string {
    return environment.docDevelopment;
  }

  getDocGOAnnotation() : string {
    return environment.goAnnotations;    
  }

  getGOContributors() : string {
    return environment.goContributors;
  }


  downloadTTL() : string {
    return environment.gocamTTL;
  }

  downloadJNL() : string {
    return environment.gocamJNL;
  }

  downloadSIF() : string {
    return environment.gocamSIF;
  }

  downloadCTAB() : string {
    return environment.gocamCTAB;
  }

  downloadGOAnnotations() : string {
    return environment.goAnnotationsDL;
  }


  getGO() : string {
    return environment.goUrl;
  }

  getOBOFoundry() : string {
    return environment.oboFoundryUrl;
  }


  getLicence() : string {
    return environment.licence;
  }

  getTermsOfUse() : string {
    return environment.termsOfUse;
  }

  getCiteUs() : string {
    return environment.citeUs;
  }

  getContactUs() : string {
    return environment.contactUs;
  }


  getORCID(orcid: string) : string {
    return environment.orcidUrl + orcid;
  }

}
