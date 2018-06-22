import { Injectable } from '@angular/core';

@Injectable()
export class PreferencesService {

  sideNavShown: boolean = true;

  toolTipDelay = 800;

  mainStyle: string;
  sideStyle: string = 'inherit';
  minHeight: string = "0rem";

  constructor() { }

  isSideNavShown(): boolean {
    return this.sideNavShown;
  }

  setSideNavState(newState: boolean) {
    this.sideNavShown = newState;
  }

  isSmallScreen(): boolean {
    return window.screen.width < 450;
  }

  toggleSideNav() {
    this.sideNavShown = !this.sideNavShown;
    let value: number = this.getValue();

    // if the sidenav is shown
    if (this.sideNavShown) {
      this.sideStyle = "block";

      if (this.isSmallScreen()) {
        this.mainStyle = "none";
        this.minHeight = value + "rem";
        console.log("sidenav shown, small screen");
      } else {
        this.mainStyle = "block";
        this.minHeight = value + "rem";
        console.log("sidenav shown, large screen");
      }

      // if sidenav not shown
    } else {
      this.mainStyle = "block";
      this.sideStyle = "none";
      this.minHeight = "0px";
      console.log("sidenav not shown");
    }

    this.minHeight = "calc(300px + 70vw)";
    console.log("=> new height: " + this.minHeight);
  }

  getValue(): number {
    return 60;

//    return 300 + Math.round(0.7 * window.screen.availWidth);
    
//    return this.getHeight(document.getElementById("sidenav"));
  }

  getHeight(element) {
    var e = element.cloneNode(true);
    e.style.visibility = "hidden";
    document.body.appendChild(e);
    var height = e.offsetHeight + 0;
    document.body.removeChild(e);
    e.style.visibility = "visible";
    return height;
  }

  getMainStyle() {
    return this.mainStyle;
  }

  getSideStyle() {
    return this.sideStyle;
  }

  getMainMinHeight() {
    return this.minHeight;
  }

}
