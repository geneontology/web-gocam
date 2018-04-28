import { Component } from '@angular/core';
import { UserService, UsageType } from './user.service';
import { PreferencesService } from './preferences.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

}
