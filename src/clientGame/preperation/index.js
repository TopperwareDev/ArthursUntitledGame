/*
    this is the preperation manager, ensures all preperation is complete before
    express assings routes
*/

const jsondependencies = require("./scriptsToJSON");

function init(callback){
    /*
        Checks all server side preperation is done before returning callback
    */

    jsondependencies.init(() => {
        callback();
    });    
}

module.exports = {init};