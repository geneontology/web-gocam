import { Component, OnInit, HostListener } from '@angular/core';
import { CytoscapeService } from '../../core/cytoscape-service';

@Component({
  selector: 'app-introduction',
  templateUrl: './introduction.component.html',
  styleUrls: ['./introduction.component.scss']
})
export class IntroductionComponent implements OnInit {

  cytoscape;

  zoomEnabled = true;

  constructor(private cytoService: CytoscapeService) {
    this.cytoscape = cytoService.getCytoscape();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.cytoscape.resize();
  }


  ngOnInit() {

  }



}

