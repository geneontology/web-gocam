import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../url-handler.service';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor(private urlHandler: UrlHandlerService) { }

  ngOnInit() {

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
