import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../core/url-handler.service';

@Component({
  selector: 'app-documentations',
  templateUrl: './documentations.component.html',
  styleUrls: ['./documentations.component.scss']
})
export class DocumentationsComponent implements OnInit {

  constructor(public urlHandler : UrlHandlerService) { }

  ngOnInit() {
  }

}
