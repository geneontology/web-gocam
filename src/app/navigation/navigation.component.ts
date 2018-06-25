import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../core/preferences.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  pageDimmed = false;


  fbs = [
    {
      value: "site",
      viewValue: "Web Site"
    },
    {
      value: "sparql",
      viewValue: "SPARQL endpoint"
    },
    {
      value: "annotation",
      viewValue: "GO-CAM: in general"
    },
    {
      value: "annotation",
      viewValue: "GO-CAM: a precise model"
    }
  ];
  constructor(public prefs: PreferencesService) { }

  ngOnInit() {
  }

  deactivateToolTip() {
    console.log("ask to deactivate tooltip");
    
  }

  menuClicked(tooltip) {
    console.log(tooltip);
    this.prefs.toggleSideNav();
    tooltip.hide(); 
  }
}
