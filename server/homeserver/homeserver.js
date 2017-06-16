/**
 * Created by govind on 7/24/16.
 */

var _ = require('lodash');

var fileHandler = require('../FileHandling/FileHandler');
var esIndicesConfig = require('../elasticsearch/esIndicesConfig');
var esclient = require('../elasticsearch/esclient');

var HomeServer = {

  init: function(){
    let allIndices = _.assign({}, esIndicesConfig.hsIndices);
    esclient.initIndices(allIndices, function(){

    });


  },



};

module.exports = HomeServer;
