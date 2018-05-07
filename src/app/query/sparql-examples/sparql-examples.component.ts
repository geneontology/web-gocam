import { Component, OnInit } from '@angular/core';
import { GoSPARQLService } from '../../core/gosparql.service';
import { PreferencesService } from '../../core/preferences.service';

@Component({
  selector: 'app-sparql-examples',
  templateUrl: './sparql-examples.component.html',
  styleUrls: ['./sparql-examples.component.css']
})
export class SparqlExamplesComponent implements OnInit {

  query: string;
  jsResponse;  


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
      name: "10 most recent models",
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

  constructor(private sparql:GoSPARQLService,
  public prefs: PreferencesService) { }

  ngOnInit() {
  }

  example(exampleObj) {
    this.query = exampleObj.query;
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
}
