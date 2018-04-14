import { Injectable } from '@angular/core';

@Injectable()
export class UrlHandlerService {

  constructor() { }


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
    
    
    
      getPathwayView(goModelId: string) {
//        return "http://tomodachi.berkeleybop.org/amigo/model/" + goModelId;
//        return "http://noctua.berkeleybop.org/editor/graph/" + goModelId;
        return "http://noctua.berkeleybop.org/workbench/pathwayview/?model_id=" + goModelId;
      }

}
