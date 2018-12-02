/**
 * Created by govind on 10/29/17.
 */

var esclient = require('../elasticsearch/esclient');
var google = require("../cloud/google");

var HSSettings = {

  /**
   * This function returns the list of URLs for authenticating social network connections
   * from the browser side.
   * @param files
   */
  getNetworkConnectionURLs: function(){
    console.log("getNetworkConnectionURLs: ");

    var url1 = google.getAuthUrl();

    console.log("getNetworkConnectionURLs: url", url1);

    return [url1];


  },

  loadSettings: function(index, params, query, fields, callback) {
    console.log("settings: loadSettings: ", params, " query: ", query);

    var output = {
      "connectionUrls": {},
      "settings": {},
      "advancedsettings": []
    };

    // For settings the items are stored in ES with 'order' parameter set with the order the items should be displayed
    // so when querying make sure the items are ordered in the ascending order of 'order' field
    query.sort = [
      {"order": {"order": "asc"}}
    ];

    console.log("settings: loadSettings updated query", query);

    output.connectionUrls = this.getNetworkConnectionURLs();

    // Get all fields for now
    esclient.getItems(index, params, query, fields, function(err, result) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback({error: err}, {result: {items: []}});
      } else {
        console.log("server: /rest/index/items: ", JSON.stringify(result));
        output.settings = result;
        callback(err, output);
      }
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

module.exports = HSSettings;