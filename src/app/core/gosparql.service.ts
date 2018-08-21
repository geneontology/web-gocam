import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { GOCam } from '../models/gocam';
import { GOCamGO } from '../models/gocam-go';
import { GOCamGP } from '../models/gocam-gp';
import { GOCamPMID } from '../models/gocam-pmid';

import { SparqlModels } from '../queries/sparql-models';
import { SparqlGO } from '../queries/sparql-go';
import { SparqlGP } from '../queries/sparql-gp';
import { SparqlGroups } from '../queries/sparql-groups';
import { SparqlUsers } from '../queries/sparql-users';
import { SparqlPMIDs } from '../queries/sparql-pmids';
import { QueryUtils } from '../queries/query-utils';

import { UtilsService } from './utils.service';
import { UrlHandlerService } from './url-handler.service';


@Injectable()
export class GoSPARQLService {

  baseUrl = this.urlHandler.getSPARQL();

  queryUtils = new QueryUtils();

  sparqlModels = new SparqlModels();
  sparqlGO = new SparqlGO();
  sparqlGP = new SparqlGP();
  sparqlGroups = new SparqlGroups();
  sparqlUsers = new SparqlUsers();
  sparqlPMIDs = new SparqlPMIDs();


  // These keys are used to transform (denormalize) the SPARQL json response
  keysArrayModels = ["orcids", "names", "groupids", "groupnames"];
  keysArrayGOs = ["goclasses", "goids", "gonames", "definitions"]
  keysArrayGPs = ["gpnames", "gpids"]
  keysArrayPMIDs = ["sources"]
  keysArrayUsers = ["organizations", "affiliations"];
  keysArrayUser = ["organizations", "affiliations", "affiliationsIRI", "gocams", "gocamsDate", "gocamsTitle", "gpnames", "gpids", "bpnames", "bpids"];
  keysArrayUserModels = ["bpids", "bpnames", "gpids", "gpnames"];
  keysArrayUserGPs = ["gocams", "dates", "titles"];


  constructor(private httpClient: HttpClient,
              private utils : UtilsService,
              private urlHandler : UrlHandlerService) { }


  submit(query: string): Observable<any> {
    return this.httpClient.get(this.baseUrl + "?query=" + encodeURIComponent(query))
      .map(res => res);
  }




  //==================================================================================
  //
  //                              MODEL-RELATED DATA
  //
  //==================================================================================

  getModelList(): Observable<GOCam[]> {
    let query = this.sparqlModels.ModelList(null, null);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayModels));
  }

  getModelListRange(start: number, size: number): Observable<GOCam[]> {
    let query = this.sparqlModels.ModelList(start, size);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayModels));
  }

  getMostRecents(nb: number): Observable<GOCam[]> {
    let query = this.sparqlModels.ModelList(0, nb);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayModels));
  }



  /**
   * Return meta data on GO-Terms associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsGOs(gocams: string[]): Observable<GOCamGO[]> {
    if (!gocams) {
      return this.getAllModelsGOs();
    }
    let query = this.sparqlModels.ModelsGOs(gocams);
    return this.httpClient.get(this.baseUrl + query)
      .map(data =>
        this.queryUtils.mergeResults(
          this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayGOs)
          , "gocam"));
  }

  getAllModelsGOs(): Observable<GOCamGO[]> {
    let query = this.sparqlModels.AllModelsGOs();
    return this.httpClient.get(this.baseUrl + query)
      .map(data =>
        this.queryUtils.mergeResults(
          this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayGOs)
          , "gocam"));
  }



  /**
   * Return meta data on Gene Products associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsGPs(gocams: string[]): Observable<GOCamGP[]> {
    if (!gocams) {
      return this.getAllModelsGPs();
    }
    let query = this.sparqlModels.ModelsGPs(gocams);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayGPs));
  }

  getAllModelsGPs(): Observable<GOCamGP[]> {
    let query = this.sparqlModels.AllModelsGPs();
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayGPs));
  }


  /**
   * Return meta data on PMIDs associated to a list of gocams
   * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
   */
  getModelsPMIDs(gocams): Observable<GOCamPMID[]> {
    if (!gocams) {
      return this.getAllModelsPMIDs();
    }
    let query = this.sparqlModels.ModelsPMIDs(gocams);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayPMIDs));
  }

  getAllModelsPMIDs(): Observable<GOCamPMID[]> {
    let query = this.sparqlModels.AllModelsPMIDs();
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayPMIDs));
  }




  //==================================================================================
  //
  //                              USER-RELATED DATA
  //
  //==================================================================================

  getUserList() : Observable<object> {
    let query = this.sparqlUsers.UserList();
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayUsers));
  }

  getUserMetaData(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    let query = this.sparqlUsers.UserMeta(orcid);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayUser)[0]);
  }

  getUserModels(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    let query = this.sparqlUsers.UserModels(orcid);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayUserModels));
  }

  getUserGPs(orcid: string): Observable<object> {
    var checkedOrcid = this.utils.extractORCID(orcid);
    let query = this.sparqlUsers.UserGPs(orcid);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayUserGPs));
  }



  
  //==================================================================================
  //
  //                              GROUP-RELATED DATA
  //
  //==================================================================================

  getGroupMetaData(shorthand: string) {
    let query = this.sparqlGroups.GroupMeta(shorthand);
    return this.httpClient.get(this.baseUrl + query)
      .map(data => this.queryUtils.transformArray(data['results']['bindings'], this.keysArrayUserGPs));
  }
  

}
