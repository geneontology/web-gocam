import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../url-handler.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public urlHandler : UrlHandlerService) { }

  ngOnInit() {
  }

}
