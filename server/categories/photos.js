/**
 * Created by govind on 8/6/17.
 */


var esclient = require('../elasticsearch/esclient');

var Photos = {

  init: function(){

  },

  getitems: function(params, query1, fields, callback) {

    console.log("Photos: getitems: ", query1);

    var esQuery = {'sort': [
                    {"import_date" : "desc"},
                    {"file_date" : "desc"}
                  ]};

    // body.sort = [
    //               {"import_date" : "desc"},
    //               {"file_date" : "desc"}
    //             ];

    if(query1.hasOwnProperty('query') && query1.query.hasOwnProperty('camerafilter')) {
      console.log("$%$%$$%$%$%$%$%$%$%$");
      let q = {match: {['exif.Exif IFD0.Model'] : query1.query.camerafilter}};
      // esQuery = {'query': {'match': q}};
      esQuery = {'query': q};
    }


    // Fetch photos from index "sm_objectstoreindex_media1" for photos
    esclient.getItems('sm_objectstoreindex_media1', params, esQuery, fields, function(err, items) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {items: []}});
      } else {

        esclient.getFilterItems('sm_objectstoreindex_media1', "exif.Exif IFD0.Model", function(filters) {
          // Insert filters into the getItems result
          let result = {itemsData: items, filters: {"camera": filters}};
          console.log("categories/photos: result: ", result);
          callback(undefined, result);
        });

      }
    });

  }



};

module.exports = Photos;