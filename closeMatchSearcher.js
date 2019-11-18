var _ = require('lodash')
var plog = require("./prash-logger.js")
var now = require('performance-now')

export let search = (dataSet, inputString) {
    plog.perfStart('StartCloseMatchesSearch');
    //let closeMatches = _.filter(allBanksArr,(eachBank) => {
    let closeMatches = _.filter(tokenizedBankNamesArr,(eachBank) => {
        //let bankNameTokens = tokenizer.tokenize(eachBank)

        let closeMatches =  _.filter(eachBank.tokenizedString, (eachToken) => {
            // this Seems to work the best.. alothough need to investigate this DamerauLevenshteinDistance also, coz it support transposition of characters and that might be a common form of errors.
            if (natural.JaroWinklerDistance(inputString,eachToken) > tolerance) {  //2.86 Seconds
                //if (natural.DamerauLevenshteinDistance(inputString,eachToken) < 3) { // 20.0
                //if (natural.LevenshteinDistance(inputString,eachToken) < levDistanceTolerance) { // 20.0
                //console.log("Found a close match : " + inputString + " : " + eachToken) 
                return eachBank.name 
            }
            return false 
        })

        if (!_.isEmpty(closeMatches)){
            //console.log("Close matches are : " + closeMatches) 
        } 

        return !_.isEmpty(closeMatches) 
    })

    plog.perfEnd('EndCloseMatchesSearch');
    plog.perfMeasure('CloseMatchesSearch', 'StartCloseMatchesSearch', 'EndCloseMatchesSearch');
    console.log("Close Matches Count : " + _.size(closeMatches))
    console.log("Close Matches : ")
    _.forEach(closeMatches, (eachResult) => {plog.blue( '\t' + JSON.stringify(eachResult))})
}
