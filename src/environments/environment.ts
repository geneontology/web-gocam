// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
 
  // Use the SPARQL endpoint or the API endpoint to fetch the data
  useApi : true,

  // Change these two lines if you want to point to another Triple Store & API
  sparqlUrl : "http://rdf.geneontology.org/blazegraph/",
  // sparqlUrl : "http://localhost:8080/blazegraph/",
  apiUrl : "https://api.geneontology.cloud/",
  separator : "@@",

  // API Documentation
  swaggerUrl : "https://app.swaggerhub.com/apis-docs/geneontology/gosparql",

  // External URL to explore a GO-Term or GO-CAM
  noctuaUrl :  "http://noctua.geneontology.org/",
  noctuaGraphViewUrl : "http://noctua.geneontology.org/editor/graph/",
  noctuaAlliancePathwayViewUrl: 'http://noctua.geneontology.org/workbench/noctua-alliance-pathway-preview/?model_id=',
  noctuaPathwayViewUrl : "http://noctua.geneontology.org/workbench/pathwayview/?model_id=",
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
  gocamTTL : "https://s3.amazonaws.com/geneontology-public/gocam/GO-CAMs.ttl.zip",
  gocamJNL : "https://s3.amazonaws.com/geneontology-public/gocam/blazegraph-production.jnl.gz",
  gocamSIF : "https://s3.amazonaws.com/geneontology-public/gocam/GO-CAMs.sif.zip",
  gocamsCytoscapeStyles : "https://s3.amazonaws.com/geneontology-public/gocam/gocam-styles.xml",
  gocamCTAB : "#",

  // Pages of Interest
  goAnnotations : "http://geneontology.org/page/go-annotations",
  goAnnotationsDL : "http://geneontology.org/page/download-go-annotations",
  goContributors : "http://geneontology.org/page/go-consortium-contributors-list",
  contactUs : "http://geneontology.org/form/contact-go",
  licence : "http://geneontology.org/page/use-and-license",
  citeUs : "http://geneontology.org/page/go-citation-policy",
  termsOfUse : "http://geneontology.org/page/use-and-license",

  // Documentation Pages
  docGOCAM : "http://wiki.geneontology.org/index.php/GO-CAM",
  docResearch : "http://wiki.geneontology.org/index.php/cam/docs/research",
  docCuration : "http://wiki.geneontology.org/index.php/cam/docs/curation",
  docDevelopment : "http://wiki.geneontology.org/index.php/cam/docs/development",

  zenodoRelease: "https://zenodo.org/api/records/1205166"

};