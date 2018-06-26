import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GOCamSimple, GoRESTService } from '../../core/gorest.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
import { Subscription } from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit, OnDestroy {

  @Input()
  nbDisplayed = 3;

  @Input()
  nbMostRecents = 12;

  @Input()
  timeToSwitch: number = 3000;

  @Input()
  switchDuration: number = 1000;

  paused: boolean = false;

  models: GOCamSimple[];

  recentModels$: Subscription;
  cycleSub: Subscription;

  // of size nbDisplayed
  displayedSubjects: Subject<GOCamSimple>[];
  displayedObservables: Observable<GOCamSimple>[];

  constructor(private gorest: GoRESTService) {
//   this.itemsDisplayed = Array.from({ length: this.nbDisplayed }, (x, i) => i);
   this.displayedSubjects = new Array();
   this.displayedObservables = new Array();

    for(let i = 0; i < this.nbDisplayed; i++) {
      this.displayedSubjects.push(new Subject());
      this.displayedObservables.push(this.displayedSubjects[i].asObservable());
      this.displayedObservables[i].subscribe(data => {
//        console.log("observer[" + i + "] receives ", data);
      })
    }
  }

  ngOnInit() {
    this.recentModels$ = this.gorest.getMostRecents(this.nbMostRecents)
      .subscribe(data => {
        this.models = data;
        for(let i = 0; i < this.nbDisplayed; i++) {
          this.displayedSubjects[i].next(this.models[i]);
        }
      });

    this.cycleSub = Observable.interval(this.timeToSwitch)
      .subscribe((val) => {
        if (!this.paused) {
          this.cycleNews();
        }
      });
  }

  ngOnDestroy(): void {
    if (this.cycleSub) {
      this.cycleSub.unsubscribe();
      this.cycleSub = null;
    }
    if (this.recentModels$) {
      this.recentModels$.unsubscribe();
      this.recentModels$ = null;
    }

    this.displayedSubjects.forEach(elt => {
      elt.unsubscribe();
    })
  }

  newsPos = 0;
  cycleNews() {
    if (this.newsPos < this.nbMostRecents) {
      this.newsPos++;
    }
    else {
      this.newsPos = 0;
    }

    for(let i = 0; i < this.nbDisplayed; i++) {
      this.displayedSubjects[i].next(this.models[this.pos(i + this.newsPos)]);
    }
  }

  pos(index) {
    if (index < this.nbMostRecents)
      return index;
    return index % this.nbMostRecents;
  }

  mouseOver(event) {
    this.paused = true;
  }

  mouseLeft(event) {
    this.paused = false;
  }


}
