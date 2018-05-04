import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-process-profile',
  templateUrl: './process-profile.component.html',
  styleUrls: ['./process-profile.component.css']
})
export class ProcessProfileComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
