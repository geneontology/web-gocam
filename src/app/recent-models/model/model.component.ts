import { Component, OnInit, Input } from '@angular/core';
import { GOCam } from '../../core/gorest.service';
import { Observable } from 'rxjs/Observable';
import { delay } from 'q';
import { UtilsService } from '../../core/utils.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  @Input()
  baseURL;

  opacity: number = 0;

  @Input()
  gocam: Observable<GOCam>;

  @Input()
  animate: boolean = false;

  displayed: GOCam;

  constructor(private utilsService : UtilsService) { 
  }

  ngOnInit() {
    if(!this.animate)
      this.opacity = 1;

    if(this.gocam) {
      this.gocam.subscribe(data => {
//        console.log(data);
        if(this.animate) {  
          this.opacity = 0;
          setTimeout(() => {
            this.opacity = 1;
            this.displayed = data;
          }, 200);
        } else {
          this.displayed = data;
        }
      })
    }
  }

  maxCharacters = 80;
  formattedTitle(fullTitle: string) : string {
    if(fullTitle.length < this.maxCharacters) {
      return fullTitle;
    }
    return fullTitle.substring(0, Math.min(fullTitle.length, this.maxCharacters) ) + "...";
  }


  getViewUrl(gocam: string) {
    return this.baseURL + this.utilsService.curieGOCam(gocam);
  }

}
