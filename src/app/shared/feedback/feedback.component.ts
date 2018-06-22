import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }

}
