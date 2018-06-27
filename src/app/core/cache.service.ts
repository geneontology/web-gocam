import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  constructor() { }

  modelList: object = undefined;
  modelsGOs: object = undefined;
  pmids: object = undefined;

  detailedModels: object = undefined;

  

  setDetailedModels(list: object) {
    this.detailedModels = list;
  }

  getDetailedModels(): any {
    return this.detailedModels;
  }

  hasDetailedModels() {
    return this.detailedModels != undefined;
  }


  setModelList(list: object) {
    this.modelList = list;
  }

  getModelList(): any {
    return this.modelList;
  }

  hasModelList() {
    return this.modelList != undefined;
  }



  setModelsGOs(list: object) {
    this.modelsGOs = list;
  }

  getModelsGOs(): any {
    return this.modelsGOs;
  }
  
  hasModelsGOs() {
    return this.modelsGOs != undefined;
  }


  setPMIDs(list: object) {
    this.pmids = list;
  }

  getPMIDs(list: object) {
    return this.pmids;
  }

  hasModelsPMIDs() {
    return this.pmids != undefined;;
  }

}
