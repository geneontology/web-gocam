import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../core/url-handler.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.scss']
})
export class ApiComponent implements OnInit {

  constructor(public urlHandler: UrlHandlerService) { }

  ngOnInit() {
  }

}
