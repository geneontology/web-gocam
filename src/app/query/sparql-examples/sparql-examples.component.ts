import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GoSPARQLService } from '../../core/gosparql.service';
import { PreferencesService } from '../../core/preferences.service';
import { Observable } from 'rxjs/Observable';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SparqlrService } from '../../core/sparqlr.service';
import { UtilsService } from '../../core/utils.service';

import * as YASQE from 'yasgui-yasqe';
import { UrlHandlerService } from '../../core/url-handler.service';

var globalVar;
var globalVarHead;

@Component({
  selector: 'app-sparql-examples',
  templateUrl: './sparql-examples.component.html',
  styleUrls: ['./sparql-examples.component.scss']
})
export class SparqlExamplesComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<{}>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizes = [10, 25, 100];

  query: string;
  jsResponse;
  jsHeader;

  sub: any;
  sparqlrSub: any;

  yasqe;

  template;
  showQuery: boolean;

  availableTemplates;

  defaultQuery = `
  PREFIX metago: <http://model.geneontology.org/>
  SELECT (COUNT(distinct ?cam) AS ?cams)
  WHERE 
  {
    GRAPH ?cam {
      ?cam metago:graphType metago:noctuaCam .
    }
  }`;


  constructor(private sparql: GoSPARQLService,
    private sparqlr: SparqlrService,
    private utils: UtilsService,
    public urlHandler : UrlHandlerService,
    public prefs: PreferencesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    /*
    this.sparqlrSub = this.sparqlr.list().subscribe(resp => {
      var json = JSON.parse(JSON.stringify(resp));
      json = json._body;
      json = JSON.parse(json);
      this.availableTemplates = json;
    })
    */
    this.availableTemplates = this.sparqlr.list();

    this.yasqe = YASQE(document.getElementById("yasqe"), {
      sparql: {
        showQueryButton: true,
        endpoint: this.urlHandler.getSPARQL()
      }
    });

    //link both together
    this.yasqe.options.sparql.callbacks.complete = this.yasqeResult;
    this.yasqe.setSize(null, 300);
    this.yasqe.setValue(this.defaultQuery);

    this.sub = Observable.interval(1000).subscribe((val) => {
        //        console.log("timer: ", globalVar);
        this.jsResponse = globalVar;
        this.jsHeader = globalVarHead;
        this.dataSource = new MatTableDataSource(this.jsResponse);
        this.dataSource.paginator = this.paginator;
      });

  }

  ngOnDestroy(): void {
    if(this.sub)
      this.sub.unsubscribe();
    if(this.sparqlrSub)
      this.sparqlrSub.unsubscribe();
    this.query = undefined;
    this.jsResponse = undefined;
    this.template = undefined;
    globalVar = undefined;
    globalVarHead = undefined;
  }


  example(template) {
    //    this.query = exampleObj.query;
    //    this.yasqe.setValue(exampleObj.query);

    this.sparqlr.get(template.id).subscribe(resp => {
      var json = JSON.parse(JSON.stringify(resp));
//      var test = this.utils.parseYAML(json._body);
      this.template = this.utils.parseYAML(json._body);
      this.yasqe.setValue(this.template.query);
      this.showQuery = true;
    /*
      if(!this.template.variables) {
        this.yasqe.setValue(this.template.query);
        this.showQuery = true;
      } else {
        this.yasqe.setValue("");
      }
      */
    })
  }

  create() {
    this.yasqe.setValue(this.template.query);
  }

  submitQuery() {
    this.sparql.submit(this.query)
      .subscribe(resp => {
        console.log(resp);
        console.log("response status: " + resp.status);
        this.jsResponse = resp._body;
        this.jsResponse = JSON.parse(this.jsResponse).results.bindings;
      });
  }

  yasqeResult(data, state) {
    if (state == "success") {
      //      console.log("jsResponse: ", data.responseJSON);
      globalVar = [];
      let tmp = "";
      data.responseJSON.results.bindings.map(elt => {
        tmp = "{";
        Object.keys(elt).forEach(function (key) {
          tmp += "\"" + key + "\":\"" + elt[key].value + "\",";
        });
        tmp = tmp.substring(0, tmp.length - 1);
        tmp += "}";
        globalVar.push(JSON.parse(tmp));
      });

      globalVarHead = data.responseJSON.head.vars;
//      console.log(globalVar);
    } else {
      globalVar = undefined;
      globalVarHead = undefined;
    }
  }

}
