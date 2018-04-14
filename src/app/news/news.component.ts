import { Component, OnInit } from '@angular/core';

import { TransitionController, Transition, TransitionDirection } from "ng2-semantic-ui";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import { map } from 'rxjs/operators';

import { CamSparqlService } from '../cam-sparql.service';
import { UrlHandlerService } from '../url-handler.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  nbMostRecents: number = 9;
  timeToSwitch: number = 3500;
  switchDuration: number = 1000;

  sub: any;

  public transitionController = new TransitionController();

  newsPos = 0;
  news = [];


  constructor(private camSparql: CamSparqlService,
    private urlHandler: UrlHandlerService) { }


  ngOnInit() {
    this.camSparql.getMostRecents(this.nbMostRecents + 3).subscribe(data => {
      var json = JSON.parse(JSON.stringify(data));
      json = json._body;
      json = JSON.parse(json);
//      console.log("json:",json);
      json.map(res => {
        this.news.push(res);
      });
    });

    this.sub = Observable.interval(this.timeToSwitch)
      .subscribe((val) => {
        this.animate("vertical flip");
        this.cycleNews();
      });
  }

  public animate(transitionName: string = "scale") {
    this.transitionController.animate(
      new Transition(transitionName, this.switchDuration, TransitionDirection.In, () => { }));
  }

  cycleNews() {
    if (this.newsPos + 3 < this.nbMostRecents) {
      this.newsPos++;
    }
    else {
      this.newsPos = 0;
    }
  }


  eyeOver(event) {
    console.log(event);
    var elt = event.srcElement;
    var parent = elt.parentElement.parentElement;
    elt.style['font-size'] = '20px';
    parent.style['background-color'] = 'lightblue';
  }


  eyeLeft(event) {
    var elt = event.srcElement;
    var parent = elt.parentElement.parentElement;
    elt.style['font-size'] = '16px';
    parent.style['background-color'] = 'white';
  }




}
