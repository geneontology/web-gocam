import { Component, OnInit } from '@angular/core';
import { UserService, UsageType } from '../user.service';

@Component({
  selector: 'app-usage-type',
  templateUrl: './usage-type.component.html',
  styleUrls: ['./usage-type.component.css']
})
export class UsageTypeComponent implements OnInit {

  constructor(private _userService: UserService) { }

  ngOnInit() {
  }

  usage(uType: string) {
    switch(uType) {
      case UsageType.research:
        this._userService.setUsage(UsageType.research);
      break;
      case UsageType.curation:
      this._userService.setUsage(UsageType.curation);
      break;
      case UsageType.development:
      this._userService.setUsage(UsageType.development);
      break;
      default:
      this._userService.setUsage(UsageType.unknown);
    }
  }

}
