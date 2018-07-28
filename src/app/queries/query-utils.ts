import { environment } from '../../environments/environment';

export class QueryUtils {

    separator = environment.separator;
    

        

    /**
     * @param {json}   data         json retrieved from triples
     * @param {Array}  keysArray    the keys that must be taken as [string] and not string
     */
    transform(data, keysArray) {
        var transformed = {};
        Object.keys(data).forEach(key => {
            if (keysArray && keysArray.includes(key)) {
                transformed[key] = this.splitTrim(data[key].value, this.separator, '', '');
            } else {
                transformed[key] = data[key].value.trim();
            }
        });
        return transformed;
    }

    /**
     * @param {json}   data         json retrieved from triples
     * @param {Array}  keysArray    the keys that must be taken as [string] and not string
     */
    transformArray(data, keysArray) {
        return data.map(elt => {
            return this.transform(elt, keysArray);
        });
    }



    getOrcid(orcid) {
        var re = /[\d]+[-][\d]+/;

        var modOrcid = orcid;
        if (re.test(orcid)) {
            modOrcid = "http://orcid.org/" + orcid;
        }
        modOrcid = "\"" + modOrcid + "\"^^xsd:string";
        return modOrcid;
    }

    /* Split the string argument, and if defined, add a prefix & suffix to each splitted string */
    splitTrim(stringContent, split, prefix, suffix) {
        if (!prefix)
            prefix = "";
        if (!suffix)
            suffix = "";

        var array = stringContent.split(split);
        return array.map(item => {
            return prefix + item.trim() + suffix;
        });
    }



    concat(a, b) {
        return a + " " + b;
    }





    // fetchAndSend(expressResponse, sparqlURLQuery, sendOnlyFirst = false, keysArray) {
    //     var options = {
    //         uri: config.rdfStore + sparqlURLQuery,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/sparql-results+json',
    //             'Accept': 'application/json',
    //         }
    //     };


    //     ut = this;
    //     ut.addCORS(expressResponse);
    //     request(options, function (error, response, body) {
    //         if (error || response.statusCode != 200) {
    //             expressResponse.send({ "error" : error });
    //         } else {

    //             let data = JSON.parse(body).results.bindings;

    //             if (Array.isArray(data)) {
    //                 data = ut.transformArray(data, keysArray);
    //                 if (sendOnlyFirst)
    //                     data = data[0];
    //             } else {
    //                 data = ut.transform(data, keysArray)
    //             }

    //             expressResponse.json(data);
    //         }
    //     });
    // },




    // /**
    //  * 
    //  * @param {*} sparqlURLQuery the URL formatted sparql Query
    //  * @param {*} keysArray 
    //  * @param {*} callback 
    //  */
    // fetchData(sparqlURLQuery, keysArray, callback) {
    //     var options = {
    //         uri: config.rdfStore + sparqlURLQuery,
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/sparql-results+json',
    //             'Accept': 'application/json',
    //         }
    //     };

    //     ut = this;
    //     request(options, function (error, response, body) {
    //         if (error || response.statusCode != 200) {
    //             callback({ "error" : error });
    //         } else {

    //             let data = JSON.parse(body).results.bindings;

    //             if (Array.isArray(data)) {
    //                 data = ut.transformArray(data, keysArray);
    //             } else {
    //                 data = ut.transform(data, keysArray)
    //             }

    //             callback(null, data);
    //         }
    //     });
    // },    


    /**
     * 
     * @param {*} jsonArray should have the exact same fields for each element of the array
     * @param {*} field json field on which the json objects will be merged
     */
    mergeResults(jsonArray, field) {
        let mapping = new Map();
        let array;

        jsonArray.forEach(elt => {
            if (mapping.has(elt[field])) {
                array = mapping.get(elt[field]);
            } else {
                array = [];
                mapping.set(elt[field], array);
            }
            delete elt[field];
            array.push(elt);
        });

        var newJson = [];
        let obj = {};

        mapping.forEach((value, key) => {
            obj = {};
            obj[field] = key;

            let keys = Object.keys(array[0]);
            keys.forEach(key => {
                let sub = [];
                value.forEach(elt => {
                    // by definition, each array contains only 1 element, hence this merging
                    sub.push(elt[key][0]);
                });
                obj[key] = sub;
            });
            newJson.push(obj);
        });

        return newJson;
    }

}