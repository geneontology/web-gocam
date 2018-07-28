import { Injectable } from '@angular/core';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';

@Injectable()
export class UrlHandlerService {

  constructor(private utilsService: UtilsService) { }

  
  getAPIDoc() : string {
    return environment.swaggerUrl;
  }

  getAPI() : string {
    return environment.apiUrl;
  }


  getSPARQLDoc() : string {
    return "query/sparql-examples";
  }

  getSPARQL() : string {
    return environment.sparqlUrl;
  }



  getNoctuaPlatform() : string {
    return environment.noctuaUrl;
  }

  getAmigoTerm(goterm: string) : string {
    goterm = this.utilsService.curieGOTerm(goterm);
    return environment.amigoTermUrl + goterm;
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
    var model = this.utilsService.curieGOCam(goModelId);
    return environment.noctuaGraphViewUrl + model;
  }

  getPathwayView(goModelId: string) : string {
    var model = this.utilsService.curieGOCam(goModelId);
    return environment.noctuaPathwayViewUrl + model;
  }


  getPubMedAbstract(pmid: string) : string {
    pmid = pmid.replace("PMID:", "");
    return environment.pubmedUrl + pmid;
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
