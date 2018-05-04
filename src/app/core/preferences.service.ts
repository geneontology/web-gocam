import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  sideNavShown: boolean = true;

  toolTipDelay = 500;

  constructor() { }

  isSideNavShown(): boolean {
    return this.sideNavShown;
  }

  setSideNavState(newState: boolean) {
    this.sideNavShown = newState;
  }

  toggleSideNav() {
    this.sideNavShown = !this.sideNavShown;
  }

}
