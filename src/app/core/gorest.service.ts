import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as xml2js from 'xml2js';
import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

import { environment } from '../../environments/environment';



export class GOCam {
  gocam: string;
  date: string;
  title: string;
  orcids: [string];
  names: [string];
  groupids: [string];
  groupnames: [string];
}

export class GOCamGO {
  gocam: string;
  goclasses: [string];
  goids: [string];
  gonames: [string];
  definitions: [string]
}

export class GOCamGP {
  gocam: string;
  gpnames: [string];
  gpids: [string];
}


export class GOCamPMID {
  gocam: string;
  sources: [string];
}

@Injectable()
export class GoRESTService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private utils: UtilsService) {
  }


  getModelList(): Observable<GOCam[]> {
    return this.httpClient.get<[GOCam]>(this.baseUrl + 'models')
    .map(res => res);
  }

  getModelListRange(start: number, size: number): Observable<GOCam[]> {
    return this.httpClient.get<[GOCam]>(this.baseUrl + "models?start=" + start + "&size=" + size)
    .map(res => res);
  }

  getMostRecents(nb: number): Observable<GOCam[]> {
    return this.httpClient.get<[GOCam]>(this.baseUrl + 'models?last=' + nb)
    .map(res => res);
  }


 
  models = [];
  getStaticModelList() {
    this.getModelList().subscribe(data => {
            var json = JSON.parse(JSON.stringify(data));
            json = json._body;
            json = JSON.parse(json);
            json.map(res => {
              this.models.push(res);
            });
            return this.models;
          });        
  }



  /**
   * Return meta data on GO-Terms associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsGOs(gocams: string[]): Observable<GOCamGO[]> {
    if(!gocams) {
      return this.getAllModelsGOs();
    }
    console.log("asking to retrieve some GOs (" + gocams + ")");
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<GOCamGO[]>(this.baseUrl + "models/go?gocams=" + gocamString)
    .map(res => res);
}
  
  getAllModelsGOs(): Observable<GOCamGO[]> {
    console.log("asking to retrieve ALL GOs");
    return this.httpClient.get<GOCamGO[]>(this.baseUrl + 'models/go/')
    .map(res => res);
  }


  /**
   * Return meta data on Gene Products associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsGPs(gocams: string[]): Observable<GOCamGP[]> {
    if(!gocams) {
      return this.getAllModelsGPs();
    }
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<GOCamGP[]>(this.baseUrl + "models/gp?gocams=" + gocamString)
    .map(res => res);
  }
 
  getAllModelsGPs(): Observable<GOCamGP[]> {
    return this.httpClient.get<[GOCamGP]>(this.baseUrl + 'models/gp')
    .map(res => res);
  }


  /**
   * Return meta data on PMIDs associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsPMIDs(gocams): Observable<GOCamPMID[]> {
    if(!gocams) {
      return this.getAllModelsPMIDs();
    }
    var gocamString = gocams.reduce(this.utils.concat);
    return this.httpClient.get<[GOCamPMID]>(this.baseUrl + 'models/pmid?gocams=' + gocamString)
    .map(res => res);
  }
  
  getAllModelsPMIDs(): Observable<GOCamPMID[]> {
    return this.httpClient.get<[GOCamPMID]>(this.baseUrl + 'models/pmid')
    .map(res => res);
  }
  

}

