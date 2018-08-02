import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

import { GOCam } from '../models/gocam';
import { GOCamGO } from '../models/gocam-go';
import { GOCamGP } from '../models/gocam-gp';
import { GOCamPMID } from '../models/gocam-pmid';

import { environment } from '../../environments/environment';

import * as CurieUtil from "curie-util-es5";

@Injectable()
export class CurieUtilService {

    curie;
    goContext;

    constructor(private httpClient : HttpClient) { 
        this.httpClient.get("https://raw.githubusercontent.com/prefixcommons/biocontext/master/registry/go_context.jsonld")
        .map(data => data)
        .subscribe(data => {
            this.goContext = data;
            let map = CurieUtil.parseContext(this.goContext);
            this.curie = new CurieUtil.CurieUtil(map);
            console.log("curie: " + this.curie.getIri("ZFIN:ZDB-GENE-031112-7"));
        })
    }

    /**
     * 
     * @param Iri an IRI (e.g. http://identifiers.org/zfin/ZDB-GENE-031112-7, http://identifiers.org/mgi/MGI:34340, etc)
     */
    getCurie(Iri: string) : string {
        return this.curie.getCURIE(Iri);
    }

    /**
     * Return the IRI of the given CURIE
     * @param Curie a CURIE (e.g. ZFIN:ZDB-GENE-031112-7, MGI:MGI:34340, etc)
     */
    getIri(Curie: string) : string {
        return this.curie.getIri(Curie);
    }


}