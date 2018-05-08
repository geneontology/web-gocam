import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-profile',
  templateUrl: './process-profile.component.html',
  styleUrls: ['./process-profile.component.css']
})
export class ProcessProfileComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    window.scrollTo(0, 0);
  }

  ngOnDestroy() {
  }

}
