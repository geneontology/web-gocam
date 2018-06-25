import { Component, OnInit, Input } from '@angular/core';
import { GOCamSimple } from '../../core/gorest.service';
import { Observable } from 'rxjs/Observable';
import { delay } from 'q';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {

  baseURL = "http://noctua.berkeleybop.org/editor/graph/"

  opacity: number = 0;

  @Input()
  gocam: Observable<GOCamSimple>;

  @Input()
  animate: boolean = false;

  displayed: GOCamSimple;

  constructor() { 
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

}
