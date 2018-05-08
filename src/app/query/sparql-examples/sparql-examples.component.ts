import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { GoSPARQLService } from '../../core/gosparql.service';
import { PreferencesService } from '../../core/preferences.service';
import { Observable } from 'rxjs/Observable';

import { MatTableDataSource, MatPaginator } from '@angular/material';
import { SparqlrService } from '../../core/sparqlr.service';
import { UtilsService } from '../../core/utils.service';

import * as YASQE from 'yasgui-yasqe';

var globalVar;
var globalVarHead;

@Component({
  selector: 'app-sparql-examples',
  templateUrl: './sparql-examples.component.html',
  styleUrls: ['./sparql-examples.component.css']
})
export class SparqlExamplesComponent implements OnInit, OnDestroy {

  dataSource: MatTableDataSource<{}>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  pageSizes = [10, 25, 100];

  query: string;
  jsResponse;
  jsHeader;


  queries = [

    {
      name: "Number of GO-CAMs",
      query: "\n\
      PREFIX metago: <http://model.geneontology.org/>\n\
      \n\
      SELECT  (COUNT(distinct ?cam) AS ?cams)\n\
      WHERE\n\
      {\n\
          GRAPH ?cam {\n\
              ?cam metago:graphType metago:noctuaCam .\n\
          }\n\
      }"
    },

    {
      name: "10 most recent GO-CAMs",
      query: "\n\
      PREFIX metago: <http://model.geneontology.org/>\n\
      PREFIX dc: <http://purl.org/dc/elements/1.1/>\n\
      PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#>\n\
      \n\
      SELECT  ?id ?date ?title    (GROUP_CONCAT(?orcid;separator=\",\") AS ?orcids)\n\
                                  (GROUP_CONCAT(?name;separator=\",\") AS ?names)\n\
      WHERE\n\
      {\n\
          GRAPH ?cam {\n\
            ?cam metago:graphType metago:noctuaCam .\n\
            ?cam dc:title ?title ;\n\
                 dc:date ?date ;\n\
                 dc:contributor ?orcid .\n\
            \n\
            BIND( IRI(?orcid) AS ?orcidIRI ) .\n\
            \n\
            optional { ?cam <http://www.geneontology.org/formats/oboInOwl#id> ?id }\n\
            \n\
            # Baby Proofing the query since oboInOwl#id is not always there\n\
            BIND(IF(bound(?id), ?id, concat(\"gomodel:\", substr(str(?cam), 31))) as ?id) .\n\
          }\n\
          \n\
          optional { ?orcidIRI rdfs:label ?name }\n\
          BIND(IF(bound(?name), ?name, ?orcid) as ?name) .\n\
      }\n\
      GROUP BY ?id ?date ?title ?cam\n\
      ORDER BY DESC(?date)\n\
      LIMIT 10"
    },

    {
      name: "GO-CAMs List",
      query: "\n\
      PREFIX metago: <http://model.geneontology.org/>\n\
      PREFIX dc: <http://purl.org/dc/elements/1.1/>\n\
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
      PREFIX obo: <http://www.geneontology.org/formats/oboInOwl#>\n\
      PREFIX providedBy: <http://purl.org/pav/providedBy>\n\
      \n\
      SELECT  ?gocam ?date ?title (GROUP_CONCAT(?orcid;separator=\",\") AS ?orcids)\n\
                                  (GROUP_CONCAT(?name;separator=\",\") AS ?names)\n\
                                  (GROUP_CONCAT(distinct ?providedBy;separator=\",\") AS ?groupIDs)\n\
                                  (GROUP_CONCAT(distinct ?providedByLabel;separator=\",\") AS ?groupNames)\n\
                                  \n\
      WHERE\n\
      {\n\
        {\n\
              GRAPH ?gocam {\n\
                ?gocam metago:graphType metago:noctuaCam .\n\
                \n\
                ?gocam  dc:title ?title ;\n\
                        dc:date ?date ;\n\
                        dc:contributor ?orcid ;\n\
                        providedBy: ?providedBy .\n\
                        \n\
                BIND( IRI(?orcid) AS ?orcidIRI ) .\n\
                BIND( IRI(?providedBy) AS ?providedByIRI ) .\n\
              }\n\
            \n\
            optional {\n\
              ?providedByIRI rdfs:label ?providedByLabel .\n\
            }\n\
            \n\
            optional { ?orcidIRI rdfs:label ?name }\n\
            BIND(IF(bound(?name), ?name, ?orcid) as ?name) .\n\
          }\n\
          \n\
      }\n\
      GROUP BY ?gocam ?date ?title\n\
      ORDER BY DESC(?date)"
    },

    {
      name: "User List",
      query: "\n\
      PREFIX metago: <http://model.geneontology.org/>\n\
      PREFIX dc: <http://purl.org/dc/elements/1.1/>\n\
      PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>\n\
      PREFIX has_affiliation: <http://purl.obolibrary.org/obo/ERO_0000066>\n\
      \n\
      SELECT  ?orcid ?name    (GROUP_CONCAT(distinct ?organization;separator=\",\") AS ?organizations)\n\
                              (GROUP_CONCAT(distinct ?affiliation;separator=\",\") AS ?affiliations)\n\
                              (COUNT(distinct ?cam) AS ?cams)\n\
      WHERE\n\
      {\n\
          ?cam metago:graphType metago:noctuaCam .\n\
          ?cam dc:contributor ?orcid .\n\
          \n\
          BIND( IRI(?orcid) AS ?orcidIRI ) .\n\
          \n\
          optional { ?orcidIRI rdfs:label ?name } .\n\
          optional { ?orcidIRI <http://www.w3.org/2006/vcard/ns#organization-name> ?organization } .\n\
          optional { ?orcidIRI has_affiliation: ?affiliation } .\n\
          \n\
          BIND(IF(bound(?name), ?name, ?orcid) as ?name) .\n\
      }\n\
      GROUP BY ?orcid ?name"
    }

  ]

  pos_left = "before";
  pos_right = "after";


  sub: any;

  yasqe;

  template;

  availableTemplates;

  constructor(private sparql: GoSPARQLService,
    private sparqlr: SparqlrService,
    private utils: UtilsService,
    public prefs: PreferencesService) { }

  ngOnInit() {
    window.scrollTo(0, 0);

    this.sparqlr.list().subscribe(resp => {
      var json = JSON.parse(JSON.stringify(resp));
      json = json._body;
      json = JSON.parse(json);
      this.availableTemplates = json;
    })
    /*
    YASQE.defaults.sparql.showQueryButton = true;
    YASQE.defaults.sparql.endpoint = "http://rdf.geneontology.org/blazegraph/sparql";
    YASQE.defaults.sparql.callbacks.success =  function(data){console.log("success", data);};
    */

    this.yasqe = YASQE(document.getElementById("yasqe"), {
      sparql: {
        showQueryButton: true,
        endpoint: "http://rdf.geneontology.org/blazegraph/sparql"
      }
    });

    //link both together
    this.yasqe.options.sparql.callbacks.complete = this.yasqeResult;
    this.yasqe.setSize(null, 300);

    this.sub = Observable.interval(1000)
      .subscribe((val) => {
        //        console.log("timer: ", globalVar);
        this.jsResponse = globalVar;
        this.jsHeader = globalVarHead;
        this.dataSource = new MatTableDataSource(this.jsResponse);
        this.dataSource.paginator = this.paginator;
      });

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
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
      var test = this.utils.parseYAML(json._body);
      this.template = this.utils.parseYAML(test);
      this.yasqe.setValue(this.template.query);
    })
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
      console.log(globalVar);
    } else {
      globalVar = undefined;
      globalVarHead = undefined;
    }
  }

}
