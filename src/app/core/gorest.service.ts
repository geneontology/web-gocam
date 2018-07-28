import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

import { GOCam } from '../models/gocam';
import { GOCamGO } from '../models/gocam-go';
import { GOCamGP } from '../models/gocam-gp';
import { GOCamPMID } from '../models/gocam-pmid';

import { environment } from '../../environments/environment';

import * as xml2js from 'xml2js';

@Injectable()
export class GoRESTService {

  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient,
              private utils: UtilsService) {
  }



  //==================================================================================
  //
  //                              MODEL-RELATED DATA
  //
  //==================================================================================

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
    if (!gocams) {
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
    if (!gocams) {
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
    if (!gocams) {
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




  //==================================================================================
  //
  //                              USER-RELATED DATA
  //
  //==================================================================================

  getUserList(): Observable<object> {
    return this.httpClient.get(this.baseUrl + "users")
      .map(res => res);
  }

  getUserMetaData(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.httpClient.get(this.baseUrl + "users/" + orcid)
      .map(res => res);
  }

  getUserModels(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.httpClient.get(this.baseUrl + "users/" + orcid + "/models")
      .map(res => res);
  }

  getUserGPs(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    return this.httpClient.get(this.baseUrl + "users/" + orcid + "/gp")
      .map(res => res);
  }



  //==================================================================================
  //
  //                              GROUP-RELATED DATA
  //
  //==================================================================================

  getGroupMetaData(shorthand: string) {
    return this.httpClient.get(this.baseUrl + "groups/" + shorthand)
      .map(res => res);
  }








  //  import * as jsyaml from "js-yaml";
  // users;
  // loadUserMetaData() {
  //   if (!this.users) {
  //     var observer = this.httpClient.get(this.urlHandler.getURLUserMetaData()).map(res => res);
  //     observer.subscribe(json => {
  //       this.users = jsyaml.load(json);
  //     });
  //     return observer;
  //   }
  // }

  // /* automatically format orcid with http://orcid.org/ if missing */
  // getUserMetaDataByORCID(orcid: string) {
  //   if (!orcid.startsWith(this.urlHandler.getORCID(''))) {
  //     orcid = this.urlHandler.getORCID(orcid);
  //   }
  //   return this.users.filter(user => user.uri === orcid)[0];
  // }


  // import * as jsyaml from "js-yaml";
  //   groups;
  //   loadGroupMetaData() {
  //     if (!this.groups) {
  //       var observer = this.httpClient.get(this.urlHandler.getURLGroupMetaData());
  //       observer.subscribe(json => {
  //         this.groups = jsyaml.load(json);
  //       });
  //       return observer;
  //     }
  //   }

  //   getGroupMetaDataByShorthand(shorthand: string) {
  // //    console.log("result: ", this.groups.filter(group => group.shorthand === shorthand));
  //     return this.groups.filter(group => group.shorthand === shorthand)[0];
  //   }

}

