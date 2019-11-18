var _ = require('lodash')
var plog = require("./prash-logger.js")
var FuzzySearch = require('fuzzy-search');

export let search = (dataSet, inputString) => {
    plog.perfStart("startFuzz")
    
    const searcher = new FuzzySearch(dataSet, {
        caseSensitive: false,
    });

    plog.perfEnd("endFuzz")
    plog.perfMeasure("Fuzzy Search Time","startFuzz","endFuzz") 

    let fuzzySearchResults = searcher.search(inputString); 
    console.log("Fuzzy Search Count : " + _.size(fuzzySearchResults))
    console.log("Fuzzy Search Results : ")
    
    // This will print the results to the console.. 
    //_.forEach(fuzzySearchResults, (eachResult) => {plog.blue( '\t' + eachResult)})

    return fuzzySearchResults
}
