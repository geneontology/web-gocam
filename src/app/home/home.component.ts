import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private meta: Meta) { 
    this.meta.addTag({ name: 'description', content: 'GO-Causal Activity Models (GO-CAMs) use a defined “grammar” for linking multiple standard GO annotations into larger models of biological function (such as “pathways”) in a semantically structured manner.' });
  }

  ngOnInit() {
  }

}
