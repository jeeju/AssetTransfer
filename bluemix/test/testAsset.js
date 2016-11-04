/* test the asset class */

var assert = require('assert');
var Asset = require('../js/asset.js');
var uuid = require('node-uuid');

/* sample test*/
describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});

describe('Asset', function() {
  describe('Constructor', function() {
    var apple = new Asset();
    it('should create a new asset object', function() {
      assert.equal(typeof(apple), typeof(new Asset()));
    });
    it('should get a new guid', function() {
      assert.equal(typeof(apple.id), typeof(uuid.v1()));
    });
    it('should get assetName from parameters', function() {
      assert.equal("apple", (new Asset("apple")).assetName);
    });
    it('should get assetOwner from parameters', function() {
      assert.equal("ben", (new Asset("apple", "ben")).assetOwner);
    });
    it('should set an empty name if none provided', function() {
      assert.equal("", (new Asset()).assetName);
    });
    it('should set unowned if no owner provided', function() {
      assert.equal("unowned", (new Asset()).assetOwner);
    });
  });
  describe('setName()', function() {
    it('should change the assetName');
    it('should not change the assetName to empty string');
    it('should do nothing if given the wrong type input');
    it('should do nothing if given no input');
  });
  describe('setOwner()', function() {
    it('should change owner of an asset', function(){
      var apple = new Asset("apple", "ben");
      apple.setOwner("eric");
      assert.equal("eric", apple.assetOwner);
    });
    it('should not change owner of an asset to empty string', function() {
      var apple = new Asset("apple", "ben");
      apple.setOwner("");
      assert.notEqual("", apple.assetOwner);
    });
    it('should do nothing if given wrong type input', function() {
      var apple = new Asset("apple", "ben");
      apple.setOwner(12345);
      assert.equal("ben", apple.assetOwner);
    });
    it('should do nothing if given no input', function() {
      var apple = new Asset("apple", "ben");
      apple.setOwner();
      assert.equal("ben", apple.assetOwner);
    });
    it('should not fail to create');
  });
});
