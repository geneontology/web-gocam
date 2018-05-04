import { Component, HostListener, OnInit } from '@angular/core';
import { PreferencesService } from './shared/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';

  usages: string[];
  opened;
  secondaryNav;

  constructor(public prefs: PreferencesService) {
    this.autoSideNavState(window.innerWidth);
  }

  ngOnInit(): void {
  }

  isSideNavShown() {
    return this.prefs.isSideNavShown();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.autoSideNavState(event.target.innerWidth);
  }

  autoSideNavState(width: number) {
//    if(width < 1000)
//    this._prefs.setSideNavState(false);
    this.prefs.setSideNavState(width > 1000);
  }
    
}
