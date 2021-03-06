/**
 * Created by govind on 9/16/18.
 */

var esclient = require('../elasticsearch/esclient');

var Contacts = {

  init: function(){

  },

  /***
   *
   * @param params
   * @param query1 - this should be array of fields to match against like [{'category': 'cat1'}, {'directory': 'dir1'}]
   * @param fields
   * @param callback
   */
  getContacts: function(params, query1, fields, callback) {

    console.log("Contacts: query: ", query1);
    console.log("Contacts: fields: ", fields);

    var esQuery = {'sort': [
      {"firstname" : "desc"},
      {"lastname" : "desc"}
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


    // Query can have fields and values like { directory: 'Esha', category: 'medical' }
    // Now construct the ES query string for this query input
    // Below is example query using multiple clauses
    // GET /_search
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

    // let q = [];
    // query1.map((item, index) => {
    //   if(item.hasOwnProperty('directory') && item.directory === "all") {
    //     //skip
    //     console.log("Contacts: item: ", item)
    //   }
    //   else {
    //     q.push({'match': item});
    //   }
    // });
    //
    // tempQuery.query.bool.must = q;
    // esQuery.query = tempQuery;


    // Fetch photos from index "sm_objectstoreindex_media1" for photos
    esclient.getItems('contacts', params, esQuery, fields, function(err, items) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData: []}});
      } else {

        let result = {itemsData: items};
        callback(undefined, result);

      }
    });

  },

  addContact(data, callback) {

    console.log("Contacts: addContact: data: ", data);
    let storage_container = '';

    esclient.addItem('contacts', data, undefined, function(err, result){

      console.log("Contacts: addItem: err: ", err);
      console.log("Contacts: addItem: result: ", result);
      callback(err, result);

    });
  }


};

module.exports = Contacts;