export const environment = {
  production: true,
  
  // Change these two lines if you want to point to another Triple Store & API
  sparqlUrl : "http://rdf.geneontology.org/blazegraph/sparql",
  apiUrl : "https://api.geneontology.cloud/",

  // API Documentation
  swaggerUrl : "https://app.swaggerhub.com/apis/geneontology/gosparql",

  // External URL to explore a GO-Term or GO-CAM
  noctuaUrl :  "http://noctua.berkeleybop.org/",
  noctuaGraphViewUrl : "http://noctua.berkeleybop.org/editor/graph/",
  noctuaPathwayViewUrl : "http://noctua.berkeleybop.org/workbench/pathwayview/?model_id=",
  amigoUrl : "http://amigo.geneontology.org/",
  amigoTermUrl : "http://amigo.geneontology.org/amigo/term/",
  pubmedUrl : "https://www.ncbi.nlm.nih.gov/pubmed/",
  goUrl : "http://geneontology.org/",
  oboFoundryUrl : "http://www.obofoundry.org/",
  orcidUrl : "http://orcid.org/",

  // Some Meta Data on Users & Groups
  groupContacts : "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/group-contacts.csv",
  groupMeta : "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/groups.yaml",
  userMeta : "https://raw.githubusercontent.com/geneontology/go-site/master/metadata/users.yaml",

  // Use for CURIE <-> IRI
  goContext : "https://github.com/prefixcommons/biocontext/blob/master/registry/go_context.jsonld",

  // Download URL
  gocamTTL : "https://s3.us-east-2.amazonaws.com/noctua.dev/GO-CAMs.ttl.gz",
  gocamJNL : "https://s3.us-east-2.amazonaws.com/noctua.dev/GO-CAMs-blazegraph.jnl.gz",
  gocamSIF : "#",
  gocamCTAB : "#",

  // Pages of Interest
  goAnnotations : "http://geneontology.org/page/download-go-annotations",
  goContributors : "http://geneontology.org/page/go-consortium-contributors-list",
  contactUs : "http://geneontology.org/form/contact-go",
  licence : "http://geneontology.org/page/use-and-license",
  citeUs : "http://geneontology.org/page/go-citation-policy",
  termsOfUse : "http://geneontology.org/page/use-and-license",

  // Documentation Pages
  docGOCAM : "http://wiki.geneontology.org/index.php/GO-CAM",
  docResearch : "http://wiki.geneontology.org/index.php/cam/docs/research",
  docCuration : "http://wiki.geneontology.org/index.php/cam/docs/curation",
  docDevelopment : "http://wiki.geneontology.org/index.php/cam/docs/development"

};