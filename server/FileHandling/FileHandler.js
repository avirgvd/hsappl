/**
 * Created by govind on 7/24/16.
 */
var request = require('request');
var esclient = require('../elasticsearch/esclient');
var multer  = require('multer');
var childprocess = require('../childprocess/childprocess');

var {ExifImage} = require('exif');

//var upload = multer({ dest: '/home/govind/HomeServer/storage' });
var upload = multer({ dest: '/home/govind/HomeServer/storage/staging' }).array('file');


var FileHandler = {

  ingestNewFiles: function(files){
    console.log("FileHandler::ingestNewFiles files: ", files);

    files.map((file1) => {

      console.log("Each file: ", file1);

      let uniqueFileName = file1.filename;

      // Leave the file in the staging area
      // File digester will be processing the files placed in the staged area
      esclient.stageNewFiles(uniqueFileName, file1, function(err, resp) {

        console.log("FileHandler::ingestNewFiles stageNewFiles callback resp: ", resp);
        console.log("FileHandler::ingestNewFiles stageNewFiles callback err: ", err);
        childprocess.triggerFileDigest();

      });
    });

  },

  /**
   * Express middleware function
   * @param req
   * @param res
   * @param callback1
   */
  fileUploadHandler: function(req, res, callback1) {
    console.log("RESTLayer::fileUpLoadHandler: ", req.files);

    request.post();

    upload(req, res, function (err) {
      console.log("RESTLayer::fileUpLoadHandler callback: ", req.files);

      FileHandler.ingestNewFiles(req.files);

      callback1(err, req, res);

    });
  }

};

module.exports = FileHandler;