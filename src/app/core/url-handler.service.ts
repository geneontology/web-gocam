import { Injectable } from '@angular/core';

@Injectable()
export class UrlHandlerService {

  constructor() { }

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
    var model = this.extractModel(goModelId);
    //        return "http://tomodachi.berkeleybop.org/amigo/model/" + goModelId;
    return "http://noctua.berkeleybop.org/editor/graph/" + model;
  }

  getPathwayView(goModelId: string) {
    var model = this.extractModel(goModelId);
    //        return "http://tomodachi.berkeleybop.org/amigo/model/" + goModelId;
    //return "http://noctua.berkeleybop.org/workbench/pathwayview/?model_id=" + goModelId;
    return this.getGraphView(model);
  }


  getPubMedAbstract(pmid: string) {
    pmid = pmid.replace("PMID:", "");
    return "https://www.ncbi.nlm.nih.gov/pubmed/" + pmid;    
  }

  extractModel(model) {
    if(!model)
    return;
    if(model.indexOf("gomodel:") != -1) {
      return model;
    } else {
      return model.indexOf("/") != -1 ? "gomodel:" + model.substring(model.lastIndexOf("/") +1) : "gomodel:" + model
    }
  }

}
