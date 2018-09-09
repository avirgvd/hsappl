/**
 * Created by govind on 8/6/17.
 */


var esclient = require('../elasticsearch/esclient');

var Photos = {

  init: function(){

  },

  getitems: function(params, query1, fields, callback) {

    console.log("Photos: getitems: ", query1);

    // IMP: This funtion has reference code for Query+Filter
    // Need query string that does the following:
    // 1. Sort on one or more fields
    // 2. Filter on one field
    // 3. search based on text input
    // In the following esQuery, the item 'sort' is used for one or more fields to sort
    // 'query.filtered.filter' is for filter on a field
    // 'query.filtered.query' is for search whole indedx using input text

    // The query string should follow the below code
    // GET _search
    // {
    //   "query": {
    //   "bool": {
    //     "must": [
    //       { "match": { "title":   "Search"        }},
    //       { "match": { "content": "Elasticsearch" }}
    //     ],
    //       "filter": [
    //       { "term":  { "status": "published" }},
    //       { "range": { "publish_date": { "gte": "2015-01-01" }}}
    //     ]
    //   }
    // }
    // }


    var esQuery = {'sort':
                          [
                            {"import_date" : "desc"},
                            {"file_date" : "desc"}
                          ]

                  };

    // body.sort = [
    //               {"import_date" : "desc"},
    //               {"file_date" : "desc"}
    //             ];

    var tempQuery = {
                      'query': {
                        'bool': {

                        }
                      }
    };

    if(query1.hasOwnProperty('query') && query1.query.hasOwnProperty('camerafilter')) {
      console.log("$%$%$$%$%$%$%$%$%$%$");
      // let q = {match: {['exif.Exif IFD0.Model'] : query1.query.camerafilter}};
      let q = {term: {['exif.Exif IFD0.Model'] : query1.query.camerafilter}};
      // esQuery = {'query': {'match': q}};

      tempQuery.query.bool.filter = q;
      esQuery.query = tempQuery;
    }

    if(query1.hasOwnProperty('search')) {
      let q = {"match": {"_all": query1.search}}
      tempQuery.query.bool.must = q;
      esQuery.query = tempQuery;
    }

    console.log("esQuery: ", esQuery);
    console.log("tempQuery: ", JSON.stringify(tempQuery));






    // Fetch photos from index "sm_objectstoreindex_media1" for photos
    esclient.getItems('sm_objectstoreindex_media1', params, esQuery, fields, function(err, items) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData: {}, filters: {}}});
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