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

    var query_bool = {
                        "query": {
                          "bool": {}
                        }
                     };

    var query_match = {};
    var directory = "";

    var query_bool_must = {"must": []};
    var query_bool_filter = {"filter": []};


    // If the directory specified is unprocessed then need to query from staging index.
    if(query1.hasOwnProperty('directory') && query1.directory == "unprocessed") {

      directory = query1.directory;

      // Directory should be exact match so use match_phrase
      let q = {"match": {"status": "staging"}};
      query_bool_must.must.push(q);
      q = {"match": {"mimetype": "image/"}};
      query_bool_must.must.push(q);
      query_bool.query.bool.must = query_bool_must.must;
      esQuery.query = query_bool.query;
    }
    else {

      if(query1.hasOwnProperty('directory') && query1.directory != "all") {

        directory = query1.directory;

        // Directory should be exact match so use match_phrase
        let q = {"match_phrase": {"directory": query1.directory}};
        query_bool_must.must.push(q);
        query_bool.query.bool.must = query_bool_must.must;
        esQuery.query = query_bool.query;
      }

      // If user selects camera model to filter-by
      if(query1.hasOwnProperty('query') && query1.query.hasOwnProperty('camerafilter')) {
        console.log("$%$%$$%$%$%$%$%$%$%$");
        let q = {term: {['metadata.camera'] : query1.query.camerafilter}};
        // esQuery = {'query': {'match': q}};

        query_bool_filter.filter.push(q);
        query_bool.query.bool.filter = query_bool_filter.filter;
        esQuery.query = query_bool.query;
      }

      if(query1.hasOwnProperty('search') && query1.search.length > 0) {
        // let q = {"match": {"_all": query1.search}}
        let q = {"query_string": {"query": query1.search}}
        query_bool_must.must.push(q);
        query_bool.query.bool.must = query_bool_must.must;
        esQuery.query = query_bool.query;
      }

    }


    let esIndex = esclient.getIndexForCategory("photos", directory);



    console.log("esQuery: ", JSON.stringify(esQuery));

    // Fetch photos from index "sm_objectstoreindex_media1" for photos
    esclient.getItems(esIndex, params, esQuery, fields, function(err, items) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData: {}, filters: {}}});
      } else {

        esclient.getFilterItems('sm_objectstoreindex_media1', "metadata.camera", function(filters) {
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