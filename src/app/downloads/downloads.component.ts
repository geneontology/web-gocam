import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PreferencesService } from '../core/preferences.service';
import { UrlHandlerService } from '../core/url-handler.service';

export enum DownloadType {
  ttl = "TTL",
  jnl = "JNL",
  ctab = "CTAB",
  sif = "SIF"
 }

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.scss']
})
export class DownloadsComponent implements OnInit {

  dtype = DownloadType;

  constructor(public urlHandler: UrlHandlerService,
              public prefs: PreferencesService,
              private router: Router) { }

  ngOnInit() {
  }

  download(type: DownloadType): void {
    switch(type) {
      case DownloadType.ttl: 
      window.location.href = this.urlHandler.downloadTTL();
      break;
      case DownloadType.jnl:
      window.location.href = this.urlHandler.downloadJNL();
      break;
      case DownloadType.sif:
      window.location.href = this.urlHandler.downloadSIF();
      break;
      case DownloadType.ctab:
      window.location.href = this.urlHandler.downloadCTAB();
      break;
    }
  }

}
