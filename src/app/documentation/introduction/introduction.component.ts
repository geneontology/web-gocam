import { Component, OnInit, HostListener } from '@angular/core';
import { CytoscapeService } from '../../core/cytoscape-service';
import { UrlHandlerService } from '../../core/url-handler.service';
import { DownloadType } from '../../downloads/downloads.component';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  cytoscape;

  zoomEnabled = true;

  constructor(public urlHandler: UrlHandlerService,
              private cytoService: CytoscapeService) {
    this.cytoscape = cytoService.getCytoscape();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cytoscape.resize();
  }


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

