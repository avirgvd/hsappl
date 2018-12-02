/**
 * Created by govind on 9/16/18.
 */

var esclient = require('../elasticsearch/esclient');

var Documents = {

  init: function(){

  },

  /***
   *
   * @param params
   * @param query1 - this should be array of fields to match against like [{'category': 'cat1'}, {'directory': 'dir1'}]
   * @param fields
   * @param callback
   */
  getitems: function(params, query1, fields, callback) {

    console.log("Documents: query: ", query1);
    console.log("Documents: fields: ", fields);


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

      if(query1.hasOwnProperty('search') && query1.search.length > 0) {
        // let q = {"match": {"_all": query1.search}}
        let q = {"query_string": {"query": query1.search}}
        query_bool_must.must.push(q);
        query_bool.query.bool.must = query_bool_must.must;
        esQuery.query = query_bool.query;
      }

    }

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