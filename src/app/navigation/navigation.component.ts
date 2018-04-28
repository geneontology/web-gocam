import { Component, OnInit } from '@angular/core';
import { PreferencesService } from '../preferences.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
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

  constructor(public _prefs: PreferencesService) { }

  ngOnInit() {
  }

}
