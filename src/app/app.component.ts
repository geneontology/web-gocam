import { Component, HostListener, OnInit } from '@angular/core';
import { UserService, UsageType } from './user.service';
import { PreferencesService } from './preferences.service';

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

  constructor(private _userService: UserService,
              public _prefs: PreferencesService) {

    this.usages =  [
      UsageType.research,
      UsageType.curation,
      UsageType.development
    ];
    this.autoSideNavState(window.innerWidth);
  }

  ngOnInit(): void {
  }

  isUsageDefined(): boolean {
    return true;
//    return this._userService.isUsageDefined();
  }

  usage(): string {
    return this._userService.getUsage();
  }

  isSideNavShown() {
    return this._prefs.isSideNavShown();
  }


  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.autoSideNavState(event.target.innerWidth);
  }

  autoSideNavState(width: number) {
//    if(width < 1000)
//    this._prefs.setSideNavState(false);
    this._prefs.setSideNavState(width > 1000);
  }
    
}
