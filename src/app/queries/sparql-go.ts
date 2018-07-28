import { environment } from '../../environments/environment';

export class SparqlGO {

	separator = environment.separator;

    getHierarchy(go) {
        go = go.replace(":", "_");
        var encoded = encodeURIComponent(`
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>

        SELECT ?hierarchy ?GO ?label WHERE {
    		BIND(<http://purl.obolibrary.org/obo/` + go + `> as ?goquery)
  	    	{
  		        {
                  ?goquery rdfs:subClassOf+ ?GO .
  	        	  ?GO rdfs:label ?label .
	              FILTER (LANG(?label) != "en")    
        	      BIND("parent" as ?hierarchy)
            	}
	        	UNION
        		{
                  ?GO rdfs:subClassOf* ?goquery .
  		          ?GO rdfs:label ?label .    		
        	      FILTER (LANG(?label) != "en")    
 	              BIND(IF(?goquery = ?GO, "query", "child") as ?hierarchy) .
        		}
  	        }
    	}
        `);
        return "?query=" + encoded;
	}
	
	getSummary(go) {
		go = go.replace(":", "_");
        var encoded = encodeURIComponent(`
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX definition: <http://purl.obolibrary.org/obo/IAO_0000115>
		PREFIX obo: <http://www.geneontology.org/formats/oboInOwl#>

        SELECT ?goid ?label ?definition ?comment ?creation_date		(GROUP_CONCAT(distinct ?synonym;separator="` + this.separator + `") as ?synonyms)
																	(GROUP_CONCAT(distinct ?relatedSynonym;separator="` + this.separator + `") as ?relatedSynonyms)
																	(GROUP_CONCAT(distinct ?alternativeId;separator="` + this.separator + `") as ?alternativeIds)
																	(GROUP_CONCAT(distinct ?xref;separator="` + this.separator + `") as ?xrefs)
																	(GROUP_CONCAT(distinct ?subset;separator="` + this.separator + `") as ?subsets)

		WHERE {
			BIND(<http://purl.obolibrary.org/obo/` + go + `> as ?goid) .
			optional { ?goid rdfs:label ?label } .
			optional { ?goid definition: ?definition } .
			optional { ?goid rdfs:comment ?comment } .
			optional { ?goid obo:creation_date ?creation_date } .
			optional { ?goid obo:hasAlternativeId ?alternativeId } .
			optional { ?goid obo:hasRelatedSynonym ?relatedSynonym } .
			optional { ?goid obo:hasExactSynonym ?synonym } .
			optional { ?goid obo:hasDbXref ?xref } .
			optional { ?goid obo:inSubset ?subset } .
    	}
		GROUP BY ?goid ?label ?definition ?comment ?creation_date
        `);
		return "?query=" + encoded;
	}


	getGOModels(go) {
		go = go.replace(":", "_");
		var encoded = encodeURIComponent(`
    	PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX metago: <http://model.geneontology.org/>
    	PREFIX owl: <http://www.w3.org/2002/07/owl#>

		SELECT distinct ?gocam
        WHERE 
        {
	        GRAPH ?gocam {
    	        ?gocam metago:graphType metago:noctuaCam .    
                ?entity rdf:type owl:NamedIndividual .
    			?entity rdf:type ?goid .
                FILTER(?goid = <http://purl.obolibrary.org/obo/` + go + `>)
            }

        }
		`);
		return "?query=" + encoded;
	}

}