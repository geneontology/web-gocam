export class SPARQLQuery {
    title: string;
    description: string;
    endpoint: string;
    query: string;
    variables: [{
        name: string;
        comment: string;
    }]
}
