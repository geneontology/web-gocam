import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {

  constructor() { }

  modelList: object = undefined;
  modelsGOs: object = undefined;

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

}
