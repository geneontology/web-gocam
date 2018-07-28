import { environment } from '../../environments/environment';

export class SparqlGroups {

	separator = environment.separator;

    /* warning, because of the blazegraph hint, this query is likely not compatible with other triple store */
    GroupList() {
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX has_affiliation: <http://purl.obolibrary.org/obo/ERO_0000066> 
		PREFIX hint: <http://www.bigdata.com/queryHints#>
    
        SELECT  distinct ?name ?url         (COUNT(distinct ?orcidIRI) AS ?members)
                                            (COUNT(distinct ?cam) AS ?gocams)
        WHERE    
        {
          ?cam metago:graphType metago:noctuaCam .
          ?cam dc:contributor ?orcid .
          BIND( IRI(?orcid) AS ?orcidIRI ).  
          ?orcidIRI has_affiliation: ?url .
          ?url rdfs:label ?name .     
          hint:Prior hint:runLast true .
        }
        GROUP BY ?url ?name
        `);
        return "?query=" + encoded;
    }


    GroupListDetails() {
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX has_affiliation: <http://purl.obolibrary.org/obo/ERO_0000066> 
        PREFIX obo: <http://www.geneontology.org/formats/oboInOwl#>
    
        SELECT  distinct ?name ?url         (GROUP_CONCAT(distinct ?orcids; separator="` + this.separator + `") as ?membersOrcid) 
                                            (GROUP_CONCAT(distinct ?members; separator="` + this.separator + `") as ?membersName)
                                            (GROUP_CONCAT(distinct ?cam; separator="` + this.separator + `") as ?modelsList)
                                            (GROUP_CONCAT(distinct ?title; separator="` + this.separator + `") as ?titlesList)
        WHERE 
        {
            ?cam metago:graphType metago:noctuaCam .
            ?cam dc:contributor ?orcid .
            ?cam obo:id ?model .
            ?cam dc:title ?title .
      
            BIND( IRI(?orcid) AS ?orcidIRI ).
          
            { 
                SELECT * WHERE 
                {
                    ?orcidIRI has_affiliation: ?url .
                    ?url rdfs:label ?name .
                    ?orcids has_affiliation: ?url .
                    ?orcids rdfs:label ?members .
                } 
            }
        }
        GROUP BY ?url ?name
        `);
        return "?query=" + encoded;
    }


    GroupMeta(groupLabel) {
        var encoded = encodeURIComponent(`
        PREFIX metago: <http://model.geneontology.org/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#> 
        PREFIX vcard: <http://www.w3.org/2006/vcard/ns#>
        PREFIX has_affiliation: <http://purl.obolibrary.org/obo/ERO_0000066> 
        PREFIX enabled_by: <http://purl.obolibrary.org/obo/RO_0002333>
        PREFIX obo: <http://www.geneontology.org/formats/oboInOwl#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX BP: <http://purl.obolibrary.org/obo/GO_0008150>
        PREFIX MF: <http://purl.obolibrary.org/obo/GO_0003674>
        PREFIX CC: <http://purl.obolibrary.org/obo/GO_0005575>
            
		SELECT ?url ?orcid ?name   (COUNT(distinct ?gocam) AS ?gocams) 
									        (COUNT(distinct ?goid) AS ?bps)
		WHERE {
  
            BIND("` + decodeURI(groupLabel) + `" as ?groupName) .
            ?url rdfs:label ?groupName .  
        	?orcidIRI has_affiliation: ?url .
  			?orcidIRI rdfs:label ?name

  			GRAPH ?gocam {
    			?gocam metago:graphType metago:noctuaCam ;
    				   dc:contributor ?orcid .    
    			BIND(IRI(?orcid) as ?contribIRI) .    
                ?entity rdf:type owl:NamedIndividual .
    			?entity rdf:type ?goid
  			}
    
    		filter(?contribIRI = ?orcidIRI) .
  			?contribIRI rdfs:label ?name .
      
    		?entity rdf:type BP: .
  			
  			# Filtering out the root BP, MF & CC terms
  			filter(?goid != BP: )
	    }
	    GROUP BY ?url ?orcid ?name
        `);
        return "?query=" + encoded;
    }

}