import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../url-handler.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  sub: any;
  timeToSwitch: number = 6000;
  pause: boolean = false;

  selectedIndex = 0;

  constructor(private urlHandler: UrlHandlerService) { }

  ngOnInit() {
    this.sub = Observable.interval(this.timeToSwitch)
      .subscribe((val) => {
        if(!this.pause) {
          this.cycle();
        }
      });
  }

  cycle() {
    if(this.selectedIndex < 2) {
      this.selectedIndex++;
    } else {
      this.selectedIndex = 0;
    }
  }


  learnMore(name: string) {
    console.log("receiving call to learnMore on " + name);
    switch (name) {
      case 'NM':
        window.open(this.urlHandler.getURLNoctuaModelDescription(), "_blank");
      default:
        break;
    }
  }




}
