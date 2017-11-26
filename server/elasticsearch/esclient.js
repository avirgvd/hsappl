/**
 * Created by govind on 7/24/16.
 */

'use strict';
// This module provides the interface to the DB.

var elasticsearch = require('elasticsearch');
var esIndicesConfig = require('./esIndicesConfig');
//var deleteByQuery = require('elasticsearch-deletebyquery');
var Const = require('../common/const');
var errors = require('../common/error');
var _ = require( 'lodash' );

var esPort = process.env.ES_PORT ? process.env.ES_PORT : '9200';
const MAX_RESULT_WINDOW = 10000;

var _client = elasticsearch.Client({
  host: 'localhost:' + esPort,
  log: 'info'
});


exports.getFilterItems = getFilterItems;
exports.getItems = getItems;
exports.deleteItem = deleteItem;
exports.createIndex = createIndex;
exports.initIndices = initIndices;
exports.stageNewFiles = stageNewFiles;
exports.addItem = addItem;
exports.getIndexForCategory = getIndexForCategory;

function createIndex(indexDef) {
  _client.create(indexDef, function(error, response) {
    // ...
  });
}

function initIndices (allIndices, callback) {

  let promises = _.map(allIndices, (indexSetting) => {

    return _client.indices.exists({
      index: indexSetting.index
    }).then((exists) => {
      if (!exists) {
        console.log("initIndices creating the index: ", indexSetting);
        return _client.indices.create(indexSetting);
      }
      return undefined;
    });
  });


  Promise.all(promises).then((result) => {
    console.log("initIndices promise all: ", result);
  }).catch((err) => {
    log.error('failed to create inices', err);
    callback(err);
  });
}

function stageNewFiles( id, filedata, callback1) {

  console.log("esclient::stageNewFiles filedata: ", filedata);

  let data = esIndicesConfig.hsIndices.stagedFiles;
  data.id = id;
  data.body = filedata;
  data.body.status = "unstaged";

  console.log("esclient::stageNewFiles data: ", data);

  _client.index(data, callback1);
}



function getItems( index, params, body, callback1) {
  console.log("getItems: index: ", index);
  console.log("getItems: params: ", params);
  console.log("getItems: body: ", body);

  var indexName = index;

  if(index === "digitallibrary")
    indexName = "documents";

  // if(query.hasOwnProperty('query') && query.query.hasOwnProperty('camerafilter')) {
  //   console.log("$%$%$$%$%$%$%$%$%$%$");
  //   let q = {match: {['exif.Exif IFD0.Model'] : query.query.camerafilter}};
  //   body.query = q;
  // }

  // body.sort = [
  //               {"import_date" : "desc"},
  //               {"file_date" : "desc"}
  //             ];

  // the search can take fields and their values for filtering the resultset
  // The body section of the query statement 'param' will have filter conditons specified
  let param = {
    index: indexName,
    from: params.from,
    size: params.size,
    body: body
  };

  console.log("getItems param: ", JSON.stringify(param));

  return _client.search( param,
    ( err, resp ) => {
      if ( err ) {
        console.log("getItems: err: ",err);
        callback1(err);
      } else if ( !resp  ) {
        console.log("getItems: err: ",err);
        callback1(err);
      } else {
        console.log("getItems: resp: ",resp);
        console.log("getItems: resp: ",resp.hits.hits.length);
        let result = {
                      total: resp.hits.total,
                      count: resp.hits.hits.length,
                      items: resp.hits.hits.map((item) => {
                        var returnItem = item._source;
                        // console.log("returnItem: ", returnItem);
                        returnItem['id'] = item._id;
                        // console.log("returnItem: later ", returnItem);
                        return item._source;
                      })
        };

        callback1(undefined, result);
      }
    });
}

/**
 * Function that return all unique values of a field
 * Can be used to list filter items in the GUI
 */
function getFilterItems(index, field1, callback1) {

  var data = {
    'index': index,
    'body': {
      'aggs': {
        'result': {
          'terms': {
            'field': field1,
            'order': {
              '_term': 'asc'
            }
          }
        }
      }
    }
  };

  _client.search(data, function(err, resp) {

    if (err == null) {
      // RESULT IS LIKE [ { key: 'critical', doc_count: 33 },   { key: 'ok', doc_count: 2 } ]

      var buckets = resp.aggregations.result.buckets;
      // var res1 = [];
      var res1 = [];

      for (var i in buckets) {
        console.log("each: ", JSON.stringify(buckets[i].key));
        res1.push(buckets[i].key);
        // res1.push({"status": buckets[i].key, "counts": buckets[i].doc_count});
      }

      callback1(res1);
    } else {
      console.log("_client.search : error = " + err);
      callback1(null);
    }

  });

}

function addItem(index, data, id, callback1) {
  console.log("addItem index: ", index);
  console.log("addItem data: ", data);
  console.log("addItem id: ", id);

  var indexDocument = {
    id: id,
    index: index,
    type: index,
    body: data
  };

  // if (!id) {
    _client.index(indexDocument, function (error, response) {
      console.log("addItem: error", error);
      console.log("addItem: response", response);
      callback1(error, response);
    });
  // }

}

function deleteItem(index, id, callback1) {
  console.log("deleteItem: id:", id);

  var indexDocument = {
    index: index,
    type: index,
    id: id
  };

  if (id) {
    console.log("deleteItem: before:");
    _client.delete(indexDocument, function (error, response) {
      console.log("addItem: error", error);
      console.log("addItem: response", response);
      callback1(error, response);
    });
  }

}


/**
 * Get the client instance of Elasticsearch
 * @param void
 */
function getESClient() {
  return _client;
}

function getIndexForCategory(category) {

  var index = "";

  if(category === "photos") {
    index = "sm_objectstoreindex_media1";
  }
  else if(category === "digitallibrary") {
    index = "sm_objectstoreindex_docs";
  }
  else if(category === "financials") {
    index = "financials";
  }
  else if(category === "cards") {
    index = "cards";
  }
  else if(category === "settings") {
    index = "settings";
  }
  else {
    index = category;
  }

  return index;
}
