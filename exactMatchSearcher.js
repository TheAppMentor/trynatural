var _ = require('lodash')
var plog = require("./prash-logger.js")
var now = require('performance-now')
var TrieSearch = require('trie-search');

var inputData = require('./inputData.js')
var ts 

export let buildTrie = (dataSet) => {
    plog.magenta("Start Building Trie : Object count " + _.size(dataSet)) 
    var start = now()
    ts = new TrieSearch('city');
    ts.addAll(dataSet)
    
    plog.green("Trie Search REsult : " + ts.get('JANATA')) 
    var end = now()
    plog.magenta("Time to build Trie : " + (end-start).toFixed(5)) 
}

buildTrie(inputData.locationsObjArr)

var start = now()
console.log(ts.get("BEN"))
var end = now()
plog.magenta("Time to Fetch : " + (end-start).toFixed(5)) 

export let search = (dataSet, inputString) => {

    plog.perfStart('StartDirectSearch');
    var start = now()
    let directCompare = _.filter(dataSet,(eachBank) => {
        if (_.includes(eachBank,inputString)){
            return true
        }
    })
    plog.perfEnd('EndDirectSearch');
    var end = now()
    plog.perfMeasure('DirectSearch', 'StartDirectSearch', 'EndDirectSearch');
    console.log("DirectCompare :" )
    plog.magenta("Direct Compare Count " + _.size(directCompare))
    plog.magenta("Direct Compare Time : " + (end-start).toFixed(5)) 
    //_.forEach(directCompare, (eachResult) => {plog.blue( '\t' + eachResult)})
}
