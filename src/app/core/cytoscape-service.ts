import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { UtilsService } from './utils.service';

import { GOCam } from '../models/gocam';
import { GOCamGO } from '../models/gocam-go';
import { GOCamGP } from '../models/gocam-gp';
import { GOCamPMID } from '../models/gocam-pmid';

import { environment } from '../../environments/environment';

import * as cytoScape from "cytoscape";

@Injectable()
export class CytoscapeService {

    constructor() {

    }

    getCytoscape() {
        return cytoScape;
    }

}