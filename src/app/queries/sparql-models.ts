import { environment } from '../../environments/environment';
import { QueryUtils } from './query-utils';

export enum ModelState {
    production = "production",
    development = "development",
    review = "review",
    deprecated = "delete"
}


export class SparqlModels {

    utils = new QueryUtils();

    separator = environment.separator;

    /**
     * Return a URI encoded SPARQL Query to fetch the list of models
     * @param start 
     * @param size 
     * @param modelState (optional) precise the type of states you want
     */
    ModelList(start : number, size : number, modelStates? : [ModelState]) {
//        modelStates = [ModelState.review, ModelState.development];
        let states : string = "";
        if(!modelStates) {
            states =    "\"" + ModelState.production + "\"^^xsd:string " +
                        "\"" + ModelState.development + "\"^^xsd:string " +
                        "\"" + ModelState.review + "\"^^xsd:string " +
                        "\"" + ModelState.deprecated + "\"^^xsd:string ";
//            states = "\"" + ModelState.production + "\"^^xsd:string";
        } else {
            modelStates.forEach(elt => {
                states += "\"" + elt + "\"^^xsd:string ";
            })
        }
        var query = `
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
    	PREFIX obo: <http://www.geneontology.org/formats/oboInOwl#>
        PREFIX providedBy: <http://purl.org/pav/providedBy>
  
        SELECT  ?gocam ?date ?state ?title (GROUP_CONCAT(?orcid;separator="` + this.separator + `") AS ?orcids) 
                                    (GROUP_CONCAT(?name;separator="` + this.separator + `") AS ?names)
							        (GROUP_CONCAT(distinct ?providedBy;separator="` + this.separator + `") AS ?groupids) 
							        (GROUP_CONCAT(distinct ?providedByLabel;separator="` + this.separator + `") AS ?groupnames) 
        
        WHERE 
        {
  	    	{
                VALUES ?state { ` + states + ` }
              	GRAPH ?gocam {            
	                ?gocam metago:graphType metago:noctuaCam .
                    ?gocam <http://geneontology.org/lego/modelstate> ?state .
            	    ?gocam dc:title ?title ;
        	             dc:date ?date ;
            	         dc:contributor ?orcid .
    		        BIND( IRI(?orcid) AS ?orcidIRI ).
                }
         
                optional { ?orcidIRI rdfs:label ?name }
        	  	BIND(IF(bound(?name), ?name, ?orcid) as ?name) .

            }
          
            optional {
    	    	GRAPH ?gocam {
					?gocam providedBy: ?providedBy .
		            BIND( IRI(?providedBy) AS ?providedByIRI ).
  			    }
        		?providedByIRI rdfs:label ?providedByLabel .
            }   
          
        }
        GROUP BY ?gocam ?date ?title ?state
        ORDER BY DESC(?date)
        `;
        if(size) {
            query += "\nLIMIT " + size
        }
        if(start) {
            query += "\nOFFSET " + start
        }
        return "?query=" + encodeURIComponent(query);
    }

    Model(id) {
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
    
        SELECT ?subject ?predicate ?object
        WHERE 
        {     
            GRAPH metago:` + id + ` {
                ?subject ?predicate ?object
            }      
        }
        `);
        return "?query=" + encoded;
    }


    ModelsGOs(gocams) {
        // Transform the array in string
        var models = gocams.reduce(this.utils.concat);
        models = this.utils.splitTrim(models, " ", "<http://model.geneontology.org/", ">");
        models = models.reduce(this.utils.concat);
        var encoded = encodeURIComponent(`
    	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX metago: <http://model.geneontology.org/>
    	PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>
        PREFIX BP: <http://purl.obolibrary.org/obo/GO_0008150>
        PREFIX MF: <http://purl.obolibrary.org/obo/GO_0003674>
        PREFIX CC: <http://purl.obolibrary.org/obo/GO_0005575>

		SELECT distinct ?gocam ?goclasses ?goids ?gonames ?definitions
        WHERE 
        {
		    VALUES ?gocam { ` + models + `}
#		    VALUES ?gocam { <http://model.geneontology.org/5a7e68a100001298> <http://model.geneontology.org/5a7e68a100001201> <http://model.geneontology.org/5a7e68a100001125> <http://model.geneontology.org/5a7e68a100000655>}
  
  		    GRAPH ?gocam {
                ?entity rdf:type owl:NamedIndividual .
    			?entity rdf:type ?goids
            }
  
            VALUES ?goclasses { BP: MF: CC:  } . 
  			?goids rdfs:subClassOf+ ?goclasses .
    		?goids rdfs:label ?gonames .
  		    ?goids definition: ?definitions .
        }
		ORDER BY DESC(?gocam)
        `);
        return "?query=" + encoded;
    }


    ModelsBPs(gocams) {
        // Transform the array in string
        var models = gocams.reduce(this.utils.concat);
        models = this.utils.splitTrim(models, " ", "<http://model.geneontology.org/", ">");
        models = models.reduce(this.utils.concat);
        var encoded = encodeURIComponent(`
    	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX metago: <http://model.geneontology.org/>
	    PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>
        PREFIX BP: <http://purl.obolibrary.org/obo/GO_0008150>
        PREFIX MF: <http://purl.obolibrary.org/obo/GO_0003674>
        PREFIX CC: <http://purl.obolibrary.org/obo/GO_0005575>

        SELECT  ?gocam  (GROUP_CONCAT(?GO;separator="` + this.separator + `") as ?bpIDs) 
		        		(GROUP_CONCAT(?label;separator="` + this.separator + `") as ?bpNames)
				        (GROUP_CONCAT(?definition;separator="` + this.separator + `") as ?definitions)
        WHERE 
        {
  		    VALUES ?gocam { ` + models + ` }
  
            VALUES ?GO_classes { BP: MF: CC:  } .
   		    {
     		    SELECT * WHERE { ?GO_classes rdfs:label ?GO_class . }
 		    }

  		    GRAPH ?gocam {
                ?GO rdf:type owl:Class .
            }
            ?GO rdfs:subClassOf+ ?GO_classes .
  		    ?GO rdfs:label ?label .
  		    ?GO definition: ?definition
  
		    {
    		    SELECT * where {
    	  	  		filter(?GO_classes = BP:) .
	    	    }
  		    }
        }
        GROUP BY ?gocam
        `);
        return "?query=" + encoded;
    }

    ModelsGPs(gocams) {
        // Transform the array in string
        var models = gocams.reduce(this.utils.concat);
        models = this.utils.splitTrim(models, " ", "<http://model.geneontology.org/", ">");
        models = models.reduce(this.utils.concat);
        var encoded = encodeURIComponent(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX metago: <http://model.geneontology.org/>

        PREFIX enabled_by: <http://purl.obolibrary.org/obo/RO_0002333>
        PREFIX in_taxon: <http://purl.obolibrary.org/obo/RO_0002162>

        SELECT ?gocam   (GROUP_CONCAT(distinct ?identifier;separator="` + this.separator + `") as ?gpids)
        				(GROUP_CONCAT(distinct ?name;separator="` + this.separator + `") as ?gpnames)

        WHERE 
        {
        #   VALUES ?gocam { <http://model.geneontology.org/5a7e68a100001298> <http://model.geneontology.org/5a7e68a100001201> <http://model.geneontology.org/5a7e68a100001125> <http://model.geneontology.org/5a7e68a100000655> <http://model.geneontology.org/586fc17a00000705> }
            VALUES ?gocam { ` + models + ` }
  
            GRAPH ?gocam {
                ?s enabled_by: ?gpnode .    
                ?gpnode rdf:type ?identifier .
                FILTER(?identifier != owl:NamedIndividual) .         
            }
            optional {
        	    ?identifier rdfs:label ?name
            }
        }
        GROUP BY ?gocam
        `);
        return "?query=" + encoded;
    }


    ModelsPMIDs(gocams) {
        var models = gocams.reduce(this.utils.concat);
        models = this.utils.splitTrim(models, " ", "<http://model.geneontology.org/", ">");
        models = models.reduce(this.utils.concat);
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
  
        SELECT  distinct ?gocam (GROUP_CONCAT(distinct ?source; separator="` + this.separator + `") as ?sources)              
        WHERE 
        {    
            values ?gocam { ` + models + ` }

            GRAPH ?gocam {
                ?s dc:source ?source .
                BIND(REPLACE(?source, " ", "") AS ?source) .
                FILTER((CONTAINS(?source, "PMID")))
            }           
        }
        GROUP BY ?gocam
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

		SELECT distinct ?gocam ?goclasses ?goids ?gonames ?definitions
        WHERE 
        {
  
  		    GRAPH ?gocam {
    			?gocam metago:graphType metago:noctuaCam  .
                ?entity rdf:type owl:NamedIndividual .
    			?entity rdf:type ?goids
            }
  
            VALUES ?goclasses { BP: MF: CC:  } . 
            # rdf:type faster then subClassOf+ but require filter 			
            # ?goids rdfs:subClassOf+ ?goclasses .
    		?entity rdf:type ?goclasses .
  			
  			# Filtering out the root BP, MF & CC terms
			filter(?goids != MF: )
  			filter(?goids != BP: )
		  	filter(?goids != CC: )
  
  			# then getting their definitions
    		?goids rdfs:label ?gonames .
  		    ?goids definition: ?definitions .
        }
		ORDER BY DESC(?gocam)
        `);
        return "?query=" + encoded;
    }


    AllModelsGPs() {
        // Transform the array in string
        var encoded = encodeURIComponent(`
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs:<http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX metago: <http://model.geneontology.org/>

        PREFIX enabled_by: <http://purl.obolibrary.org/obo/RO_0002333>
        PREFIX in_taxon: <http://purl.obolibrary.org/obo/RO_0002162>

        SELECT ?gocam   (GROUP_CONCAT(distinct ?identifier;separator="` + this.separator + `") as ?gpids)
			        	(GROUP_CONCAT(distinct ?name;separator="` + this.separator + `") as ?gpnames)

        WHERE 
        {
            GRAPH ?gocam {
                ?gocam metago:graphType metago:noctuaCam .
                ?s enabled_by: ?gpnode .    
                ?gpnode rdf:type ?identifier .
                FILTER(?identifier != owl:NamedIndividual) .
                FILTER(!contains(str(?gocam), "_inferred"))
            }
            optional {
        	    ?identifier rdfs:label ?name
            }
  
            BIND(IF(bound(?name), ?name, ?identifier) as ?name)
        }
        GROUP BY ?gocam
        `);
        return "?query=" + encoded;
    }


    AllModelsPMIDs() {
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
  
        SELECT  distinct ?gocam (GROUP_CONCAT(distinct ?source; separator="` + this.separator + `") as ?sources)              
        WHERE 
        {    
            GRAPH ?gocam {
                ?gocam metago:graphType metago:noctuaCam .    	
                ?s dc:source ?source .
                BIND(REPLACE(?source, " ", "") AS ?source) .
                FILTER((CONTAINS(?source, "PMID")))
            }           
        }
        GROUP BY ?gocam
        `);
        return "?query=" + encoded;
    }


}