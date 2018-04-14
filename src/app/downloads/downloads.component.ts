import { Component, OnInit } from '@angular/core';
import { UrlHandlerService } from '../url-handler.service';
import { Router }                 from '@angular/router';

export enum DownloadType {
  ttl = "TTL",
  jnl = "JNL",
  ctab = "CTAB",
  sif = "SIF"
 }

@Component({
  selector: 'app-downloads',
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {

  dtype = DownloadType;

  constructor(private _urlHandler: UrlHandlerService,
              private _router: Router) { }

  ngOnInit() {
  }

  download(type: DownloadType): void {
    switch(type) {
      case DownloadType.ttl: 
      window.location.href=this._urlHandler.getDownloadURL_GOCAM_TTL();
      break;
      case DownloadType.jnl:
      window.location.href=this._urlHandler.getDownloadURL_GOCAM_JNL();
      break;
      case DownloadType.ctab:
      window.location.href=this._urlHandler.getDownloadURL_GOCAM_CTAB();
      break;
      case DownloadType.sif:
      window.location.href=this._urlHandler.getDownloadURL_GOCAM_SIF();
      break;
    }
  }

}
