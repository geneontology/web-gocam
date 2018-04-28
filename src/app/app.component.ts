import { Component } from '@angular/core';
import { UserService, UsageType } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  usages: string[];
  

  constructor(private _userService: UserService) {
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

}
