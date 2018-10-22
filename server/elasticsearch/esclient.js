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
exports.getItem = getItem;
exports.updateItem = updateItem;
exports.getIndexForCategory = getIndexForCategory;
exports.getListFieldsForCategory = getListFieldsForCategory;

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
        console.log("ESClient: initIndices creating the index: ", indexSetting);
        return _client.indices.create(indexSetting);
      }
      return undefined;
    });
  });


  Promise.all(promises).then((result) => {
    console.log("ESClient: initIndices promise all: ", result);
  }).catch((err) => {
    log.error('failed to create inices', err);
    callback(err);
  });
}

function stageNewFiles( id, filedata, callback1) {

  console.log("ESClient: esclient::stageNewFiles filedata: ", filedata);

  let data = esIndicesConfig.hsIndices.stagedFiles;
  data.id = id;
  data.body = filedata;
  data.body.status = "unstaged";

  console.log("ESClient: esclient::stageNewFiles data: ", data);

  _client.index(data, callback1);
}


// function getItems( index, id, callback1) {
//   console.log("ESClient: esclient:getItem: index: ", index);
//   console.log("ESClient: esclient:getItem: id: ", id);

//   let param = {
//     index: index,
//     type: index,
//     id: id
//   };

//   return _client.get(param, callback);
  
// }

function getItems( index, params, body, fields, callback1) {
  console.log("ESClient: getItems: index: ", index);
  console.log("ESClient: getItems: params: ", params);
  console.log("ESClient: getItems: body: ", JSON.stringify(body));
  // console.log("ESClient: getItems: query: ", query);
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
  // let body = {
  //   query: {
  //     match: query
  //   }
  //
  // };

  let param = {
    index: indexName,
    from: params.from,
    size: params.size,
    body: body,
    _sourceInclude: fields
  };

  console.log("ESClient: getItems param: ", JSON.stringify(param));

  return _client.search( param,
    ( err, resp ) => {
      if ( err ) {
        console.log("ESClient: getItems: err: ",err);
        callback1(err);
      } else if ( !resp  ) {
        console.log("ESClient: getItems: err: ",err);
        callback1(err);
      } else {
        // console.log("ESClient: getItems: resp: ",resp);
        console.log("ESClient: getItems: resp: ",resp.hits.hits.length);
        let result = {
                      total: resp.hits.total,
                      count: resp.hits.hits.length,
                      items: resp.hits.hits.map((item) => {
                        // console.log("ESClient: getItems item: ", item);
                        // When the query specifies 'fields' the return items will have data 
                        // under 'fields' instead of "_source"
                        var returnItem = item._source;
                        // var returnItem = item.fields;
                        // console.log("returnItem: ", returnItem);
                        returnItem['id'] = item._id;
                        // console.log("returnItem: later ", returnItem);
                        // When the query specifies 'fields' the return items will have data 
                        // under 'fields' instead of "_source"
                        return item._source;
                        // return item.fields;
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
        console.log("ESClient: each: ", JSON.stringify(buckets[i].key));
        res1.push(buckets[i].key);
        // res1.push({"status": buckets[i].key, "counts": buckets[i].doc_count});
      }

      callback1(res1);
    } else {
      console.log("ESClient: _client.search : error = " + err);
      callback1(null);
    }

  });

}

function addItem(index, data, id, callback1) {
  console.log("ESClient: addItem index: ", index);
  console.log("ESClient: addItem data: ", data);
  console.log("ESClient: addItem id: ", id);

  var indexDocument = {
    id: id,
    index: index,
    type: index,
    body: data
  };

  // if (!id) {
    _client.index(indexDocument, function (error, response) {
      console.log("ESClient: addItem: error", error);
      console.log("ESClient: addItem: response", response);
      callback1(error, response);
    });
  // }

}

function getItem(index, id, callback1) {
  console.log("ESClient: getItem index: ", index);
  console.log("ESClient: getItem id: ", id);

  var indexDocument = {
    id: id,
    index: index,
    type: index
  };

  // if (!id) {
    _client.get(indexDocument, function (error, response) {
      console.log("ESClient: getItem: error", error);
      console.log("ESClient: getItem: response", response._source);
      callback1(error, response._source);
    });
  // }

}


function updateItem(index, data, id, callback1) {
  console.log("ESClient: updateItem index: ", index);
  console.log("ESClient: updateItem data: ", data);
  console.log("ESClient: updateItem id: ", id);

  var indexDocument = {
    id: id,
    index: index,
    type: index,
    body: {
      doc: data
    }
  };

  // if (!id) {
    _client.update(indexDocument, function (error, response) {
      console.log("ESClient: updateItem: error", error);
      console.log("ESClient: updateItem: response", response);
      callback1(error, response);
    });
  // }

}

function deleteItem(index, id, callback1) {
  console.log("ESClient: deleteItem: id:", id);

  var indexDocument = {
    index: index,
    type: index,
    id: id
  };

  if (id) {
    console.log("ESClient: deleteItem: before:");
    _client.delete(indexDocument, function (error, response) {
      console.log("ESClient: addItem: error", error);
      console.log("ESClient: addItem: response", response);
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
  else if(category === "documents") {
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

// Return fields that should be returned by server for each item in getItems
// This is required to reduce data size for items list sent to the client
// Client can fetch additional details on need basis using seperate calls to server
function getListFieldsForCategory(category) {
  console.log("ESClient: getListFieldsForCategory: ", category);

  if(category === "photos") {
    return ["_id","id","container","file_date","orgfilename","mimetype"];
  }
  else if(category === "directories") {
    return ["show_order","default_caption","_id","disp_imageid", "name", "category"];
  }
  else if(category === "digitallibrary") {
    return ["_id","id","container","file_date","orgfilename","mimetype","metadata*"];
  }
  else if(category === "medical") {
    return ["_id","id","container","file_date","orgfilename","mimetype","metadata*"];
  }
  else if(category === "travel") {
    return ["_id","id","container","file_date","orgfilename","mimetype","metadata*"];
  }
  else if(category === "assets") {
    return ["_id","id","container","file_date","orgfilename","mimetype","metadata*"];
  }
  else if(category === "messages") {
    return ["_id","id","date","subject","from","to"];
  }
  else {
    return ["_all"];
  }


}
