import { Component, HostListener, OnInit } from '@angular/core';
import { PreferencesService } from './core/preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  
  usages: string[];
  opened;
  secondaryNav;

  showMain: boolean = true;

  constructor(public prefs: PreferencesService) {
   
  }

  ngOnInit(): void {
    this.autoSideNavState(window.innerWidth);
  }


  isSideNavShown() {
    return this.prefs.isSideNavShown();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.autoSideNavState(event.target.innerWidth);
  }

  autoSideNavState(width: number) {
    let showSide = width > 1000; 
    this.prefs.setSideNavState(showSide);
  }
    
}
