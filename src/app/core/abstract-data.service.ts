import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../environments/environment';
import { GoRESTService } from './gorest.service';
import { GoSPARQLService } from './gosparql.service';

import { GOCam } from '../models/gocam';
import { GOCamGO } from '../models/gocam-go';
import { GOCamGP } from '../models/gocam-gp';
import { GOCamPMID } from '../models/gocam-pmid';

@Injectable()
export class AbstractDataService {

    useApi = environment.useApi;

    constructor(private gorest: GoRESTService,
        private gosparql: GoSPARQLService) {
    }



    //==================================================================================
    //
    //                              MODEL-RELATED DATA
    //
    //==================================================================================

    /**
     * Submit a query to the SPARQL endpoint
     * @param query SPARQL query
     */
    submit(query: string) {
        return this.gosparql.submit(query);
    }

    getModelList(): Observable<GOCam[]> {
        if (this.useApi) {
            return this.gorest.getModelList();
        }
        return this.gosparql.getModelList();
    }

    getModelListRange(start: number, size: number): Observable<GOCam[]> {
        if (this.useApi) {
            return this.gorest.getModelListRange(start, size);
        }
        return this.gosparql.getModelListRange(start, size);
    }

    getMostRecents(nb: number): Observable<GOCam[]> {
        if (this.useApi) {
            return this.gorest.getMostRecents(nb);
        }
        return this.gosparql.getMostRecents(nb);
    }

    /**
     * Return meta data on GO-Terms associated to a list of gocams
     * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
     */
    getModelsGOs(gocams: string[]): Observable<GOCamGO[]> {
        if (this.useApi) {
            return this.gorest.getModelsGOs(gocams);
        }
        return this.gosparql.getModelsGOs(gocams);
    }

    getAllModelsGOs(): Observable<GOCamGO[]> {
        if (this.useApi) {
            return this.gorest.getAllModelsGOs();
        }
        return this.gosparql.getAllModelsGOs();
    }

    /**
     * Return meta data on Gene Products associated to a list of gocams
     * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
     */
    getModelsGPs(gocams: string[]): Observable<GOCamGP[]> {
        if (this.useApi) {
            return this.gorest.getModelsGPs(gocams);
        }
        return this.gosparql.getModelsGPs(gocams);
    }

    getAllModelsGPs(): Observable<GOCamGP[]> {
        if (this.useApi) {
            return this.gorest.getAllModelsGPs();
        }
        return this.gosparql.getAllModelsGPs();
    }

    /**
     * Return meta data on PMIDs associated to a list of gocams
     * @param gocams a list of gocams . If null, send the GO-Terms to all GO-CAMs
     */
    getModelsPMIDs(gocams): Observable<GOCamPMID[]> {
        if (this.useApi) {
            return this.gorest.getModelsPMIDs(gocams);
        }
        return this.gosparql.getModelsPMIDs(gocams);
    }

    getAllModelsPMIDs(): Observable<GOCamPMID[]> {
        if (this.useApi) {
            return this.gorest.getAllModelsPMIDs();
        }
        return this.gosparql.getAllModelsPMIDs();
    }




    //==================================================================================
    //
    //                              USER-RELATED DATA
    //
    //==================================================================================

    getUserList(): Observable<object> {
        if (this.useApi) {
            return this.gorest.getUserList();
        }
        return this.gosparql.getUserList();
    }

    getUserMetaData(orcid: string): Observable<object> {
        if (this.useApi) {
            return this.gorest.getUserMetaData(orcid);
        }
        return this.gosparql.getUserMetaData(orcid);
    }

    getUserModels(orcid: string): Observable<object> {
        if (this.useApi) {
            return this.gorest.getUserModels(orcid);
        }
        return this.gosparql.getUserModels(orcid);
    }

    getUserGPs(orcid: string): Observable<object> {
        if (this.useApi) {
            return this.gorest.getUserGPs(orcid);
        }
        return this.gosparql.getUserGPs(orcid);
    }




    //==================================================================================
    //
    //                              GROUP-RELATED DATA
    //
    //==================================================================================

    getGroupMetaData(shorthand: string) {
        if (this.useApi) {
            return this.gorest.getGroupMetaData(shorthand);
        }
        return this.gosparql.getGroupMetaData(shorthand);
    }
    

}