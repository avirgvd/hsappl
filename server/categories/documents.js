/**
 * Created by govind on 9/16/18.
 */

var esclient = require('../elasticsearch/esclient');

var Documents = {

  init: function(){

  },

  getitems: function(params, query1, fields, callback) {

    console.log("Documents: getitems: ", query1);
    console.log("Documents: fields: ", fields);

    var esQuery = {'sort': [
      {"import_date" : "desc"},
      {"file_date" : "desc"}
    ]};

    if(query1.hasOwnProperty('query')) {
    }

    var tempQuery = {
      'query': {
        'bool': {

        }
      }
    };
    if((query1.hasOwnProperty('search'))
      && (query1.search)
      && (query1.search.length) ) {
      let q = {"match": {"_all": query1.search}}
      tempQuery.query.bool.must = q;
      esQuery.query = tempQuery;
    }


    // Fetch photos from index "sm_objectstoreindex_media1" for photos
    esclient.getItems('sm_objectstoreindex_docs', params, esQuery, fields, function(err, items) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData: []}});
      } else {

        let result = {itemsData: items};
        callback(undefined, result);

      }
    });

  }



};

module.exports = Documents;