import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-social-sharing',
  templateUrl: './social-sharing.component.html',
  styleUrls: ['./social-sharing.component.css']
})
export class SocialSharingComponent implements OnInit {

  @Input()
  pageURL: string;

  constructor() { }

  ngOnInit() {
  }

}