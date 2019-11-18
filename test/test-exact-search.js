var assert = require('assert');
var _ = require("lodash")
var inputData = require('../inputData.js')
var fullInputData = require('../allLocations.js')
var exactMatchFinder = require('../exactMatchSearcher.js')

/*
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
    });
  });
});
*/

describe('Test Input Data', function() {
  describe('Objects Arr should not be empty', function() {
    it('Objects Arr should not be empty', function() {
        assert(_.size(inputData.locationsObjArr) > 0);
    });
  });

  describe('Object has same count as input array', function() {
    it('should match count of elements in array', function() {
      assert.equal(_.size(inputData.locationListArr), _.size(inputData.locationsObjArr));
    });
  });

  describe('First objects name check', function() {
    it('First Element should be BANGLAORE (BENGALURU)', function() {
        assert.equal(inputData.locationsObjArr[0]['city'], "BANGALORE (BENGALURU)");
    });
  });

  describe('First objects name check', function() {
    it('First Element should be DISTRICT (CHENNAI)', function() {
        assert.equal(inputData.locationsObjArr[1].district, "CHENNAI");
    });
  });

  describe('Build Trie with all the Data', function() {
    it('TRIE should be build in 300 ms', function() {
        //exactMatchFinder.buildTrie(fullInputData.allLocations)        
        setTimeout(exactMatchFinder.buildTrie(fullInputData.allLocations), 300);
        //assert.equal(fullInputData.allLocations[1].district, "CHENNAI");
    });
  });

});
