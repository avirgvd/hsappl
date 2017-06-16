/**
 * Created by govind on 7/24/16.
 */

var fileHandler = require('./FileHandling/FileHandler');




var RESTLayer = {

  init: function(){

  },

  /**
   * Express middleware function
   * @param req
   * @param res
   * @param callback1
   */
  fileUploadHandler: function(req, res, callback1) {
    console.log("RESTLayer::fileUpLoadHandler: ", req.files);

    fileHandler.fileUploadHandler(req, res, callback1);

  }

};

module.exports = RESTLayer;