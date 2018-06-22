import { Component, OnInit, OnDestroy } from '@angular/core';

import { TransitionController, Transition, TransitionDirection } from "ng2-semantic-ui";
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/interval';
import { map } from 'rxjs/operators';

import { UrlHandlerService } from '../core/url-handler.service';
import { GoRESTService } from '../core/gorest.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit, OnDestroy {

  nbMostRecents: number = 9;
  timeToSwitch: number = 3500;
  switchDuration: number = 1000;

  sub: any;
  gorestSub: any;

  public transitionController = new TransitionController();

  newsPos = 0;
  news = [];

  pause: boolean = false;

  constructor(private goREST: GoRESTService,
              private urlHandler: UrlHandlerService) { }


  ngOnInit() {
    this.gorestSub = this.goREST.getMostRecents(this.nbMostRecents + 3).subscribe(data => {
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
        if(!this.pause) {
        this.animate("vertical flip");
        this.cycleNews();
        }
      });
  }


  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.gorestSub.unsubscribe();
    this.pause = true;
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
//    console.log(event);
    var elt = event.srcElement;
    var parent = elt.parentElement.parentElement;
    elt.style['font-size'] = '20px';
    parent.style['background-color'] = 'lightblue';
    this.pause = true;
  }


  eyeLeft(event) {
    var elt = event.srcElement;
    var parent = elt.parentElement.parentElement;
    elt.style['font-size'] = '16px';
    parent.style['background-color'] = 'white';
  }


  newsOver() {
    this.pause = true;    
  }

  newsLeft() {
    this.pause = false;
  }

  maxChars = 80;
  shorten(text: string) {
    if(text.length < this.maxChars)
      return text;
    return text.substring(0, this.maxChars) + " (...)";
  }

}
