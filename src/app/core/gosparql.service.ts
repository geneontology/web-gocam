import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

//import * as jsyaml from "js-yaml";


@Injectable()
export class GoSPARQLService {

  baseUrl = "http://rdf.geneontology.org/blazegraph/sparql";

  constructor(private http: Http) { }

  submit(query: string): Observable<any> {
    //    console.log("sending query: " + query);
    //    return this.http.get(this.baseUrl, query);
    return this.http.get(this.baseUrl + "?query=" + encodeURIComponent(query));
  }


  getQuery(path: string) {
    //    return this.http.get("https://raw.githubusercontent.com/lpalbou/temp-sparqlr/master/" + path)
    //                    .map((response: Response) => (response));
  }




  getModelGOs(id) {
    return this.http.get(this.baseUrl + this.ModelGOs(id));
  }

  getAllModelsGOs() {
    return this.http.get(this.baseUrl + this.AllModelsGOs());
  }


  ModelGOs(id) {
    var encoded = encodeURIComponent(`
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX metago: <http://model.geneontology.org/>
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>
    PREFIX BP: <http://purl.obolibrary.org/obo/GO_0008150>
    PREFIX MF: <http://purl.obolibrary.org/obo/GO_0003674>
    PREFIX CC: <http://purl.obolibrary.org/obo/GO_0005575>

    SELECT  ?GO ?GO_classes ?GO_class ?label ?definition
    WHERE 
    {
        VALUES ?GO_classes { BP: MF: CC:  } .
        {
            SELECT * WHERE { ?GO_classes rdfs:label ?GO_class . }
        }

        GRAPH metago:` + id + ` {
            ?GO rdf:type owl:Class .
        }
        ?GO rdfs:subClassOf+ ?GO_classes .
        ?GO rdfs:label ?label .
        ?GO definition: ?definition .

    }
    `);
    return "?query=" + encoded;
  }


  AllModelsGOs() {
    // Transform the array in string
    var encoded = encodeURIComponent(`
  PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
  PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
  PREFIX metago: <http://model.geneontology.org/>
  PREFIX owl: <http://www.w3.org/2002/07/owl#>
  PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>
  PREFIX BP: <http://purl.obolibrary.org/obo/GO_0008150>
  PREFIX MF: <http://purl.obolibrary.org/obo/GO_0003674>
  PREFIX CC: <http://purl.obolibrary.org/obo/GO_0005575>

  SELECT distinct ?models ?GO_class ?goid ?goname ?definition
  WHERE 
  {

    GRAPH ?models {
    ?models metago:graphType metago:noctuaCam  .
          ?entity rdf:type owl:NamedIndividual .
    ?entity rdf:type ?goid
      }

      VALUES ?GO_class { BP: MF: CC:  } . 
      # rdf:type faster then subClassOf+ but require filter 			
      # ?goid rdfs:subClassOf+ ?GO_class .
  ?entity rdf:type ?GO_class .
  
  # Filtering out the root BP, MF & CC terms
  filter(?goid != MF: )
  filter(?goid != BP: )
  filter(?goid != CC: )

  # then getting their definitions
  ?goid rdfs:label ?goname .
    ?goid definition: ?definition .
  }
  ORDER BY DESC(?models)
  `);
    return "?query=" + encoded;
  }


}

export interface SPARQLQuery {
  title: string;
  description: string;
  endpoint: string;
  query: string;
  variables: [{
    name: string;
    comment: string;
  }]
}