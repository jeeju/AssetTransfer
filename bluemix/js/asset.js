/* asset class */

var uuid = require('node-uuid');

/* Construct a new asset */
var Asset = function (name, owner) {
  this.id = uuid.v1();
  this.assetName = typeof(name) === typeof(" ") ? name : "";
  this.assetOwner = typeof(owner) === typeof(" ") ? owner : "unowned"; //TODO: check that owner is a user
};

/* Set owner for asset */
Asset.prototype.setOwner = function(newOwner) {
  if (typeof(newOwner) === typeof("") && newOwner != "") {
    this.assetOwner = newOwner;
  };
};

/* Export the class */
module.exports = Asset;
