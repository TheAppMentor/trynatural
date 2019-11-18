var inputData = require('./inputData.js')
var plog = require("./prash-logger.js")
var fuzzySearcher = require("./fuzzySearcher.js")
var exactMatchFinder = require("./exactMatchSearcher.js")
var _ = require('lodash')
var natural = require('natural');
var tokenizer = new natural.WordTokenizer();

var allLocations = require('./allLocations.js')

//Prashanth that trie fellow takes an obj and can search multiple fields. in th obj
//For the city search, you can create a obj with district state and city.. and then build the trie and search it.

var inquirer = require('inquirer');

console.log('\n================= Name Searcher =================');
var questions = [
  {
    type: 'input',
    name: 'inputString',
    message: 'Enter Search String : '
  }]

let askQuestion = () => {
    inquirer
        .prompt( questions )
        .then(answers => {
            processString(_.upperCase(answers.inputString)) 
            console.log('\n================= Name Searcher ================= \n\n');
        })
        .then(() => {
            askQuestion()
        })
}

askQuestion()

//console.log(tokenizer.tokenize("DEPOSIT INSURANCE AND CREDIT GUARANTEE CORPORATION"));
//console.log("Info : index.js : allBanks  => " + allBanksArr[0]) 

//console.log(natural.JaroWinklerDistance("ABHYUDASS","ABHYUDAYA"));
//console.log(natural.JaroWinklerDistance('not', 'same'));

let wordToSearch = "KANARA"
let tolerance = 0.85 
let levDistanceTolerance = 3 

let bankNameWords = []

function processString(inputString) {

    _.forEach(inputData.allBanksArr,(eachBank) => {
        bankNameWords.push(tokenizer.tokenize(eachBank))
    })

    let fuzzySearchResults = fuzzySearcher.search(inputData.allBanksArr, inputString)
    _.forEach(fuzzySearchResults, (eachResult) => {plog.blue( '\t' + eachResult)})

    //let allWords = new Set(_.flattenDeep(bankNameWords))

    //let tokenizedBankNamesArr = _.map(inputData.allBanksArr,(eachBank) => {
    let tokenizedBankNamesArr = _.map(allLocations.allLocations,(eachBank) => {
        let tokneizedString = tokenizer.tokenize(eachBank)
        return {name : eachBank, tokenizedString : tokneizedString}
    })

    // Exact Compare 
    exactMatchFinder.buildTrie(tokenizedBankNamesArr)

    let directCompare = exactMatchFinder.search(inputData.allBanksArr,inputString) 
    _.forEach(directCompare, (eachResult) => {plog.blue( '\t' + eachResult)})

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
// Fuzzy Search => The thing with Fuzzy search is.. it only searches. what is there.. no fault tolerance..
// Maybe we need a combination of both.. do a fuzzy search.. first.. if nothing is found.. then do this fault tolerant search
