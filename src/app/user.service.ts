import { Injectable } from '@angular/core';


export enum UsageType {
 research = "Research",
 curation = "Curation",
 development = "Development",
 unknown = "Unknown"
}

@Injectable()
export class UserService {

  uType: UsageType = UsageType.unknown;

  constructor() { }


  getUsage(): string {
    return this.uType;
  }

  setUsage(uType: UsageType) {
    this.uType = uType;
  }

  isUsageDefined(): boolean {
    return this.uType != UsageType.unknown;
  }


}
