import { Component, OnInit, HostListener } from '@angular/core';
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
        if (!this.pause && this.isScrolledIntoView()) {
          this.cycle();
        }
      });
  }

  cycle() {
    if (this.selectedIndex < 2) {
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


  isScrolledIntoView() {
    var el = document.getElementById("carousel");
    if(!el)
    return false;
    
    var rect = el.getBoundingClientRect();
    var elemTop = rect.top;
    var elemBottom = rect.bottom;

    // Only completely visible elements return true:
    var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
  }


  /*
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e) {
//    console.log(e);
    this.pause = this.isScrolledIntoView();
  }
  */

}
