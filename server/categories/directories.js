/**
 * Created by govind on 8/6/17.
 */

var esclient = require('../elasticsearch/esclient');

var Directories = {

  init: function(){

  },
  
  getitems: function(params, query1, fields, callback) {

    console.log("Directories: getitems: ", query1);

    // IMP: Directory for travel can contain photos along with other content so get list of all directories
    // for category photos or travel. Use "Terms Query" as below
    // GET /_search
    // {
    //   "query": {
    //   "terms" : { "user" : ["kimchy", "elasticsearch"]}
    // }
    // }
    let termsquery = {"categories": []};
    termsquery.categories.push(query1.category);

    if(query1.category === "photos") {
      // Look for directories under travel categories also as they may contain photos
      termsquery.categories.push("travel");
    }

    // esclient.getItems('directories', params, {'query': {'match': query1}}, fields, function(err, itemsData) {
    esclient.getItems('directories', params, {'query': {'terms': termsquery}}, fields, function(err, itemsData) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData:{}}});
      } else {
        console.log("Cards: getitems: ", itemsData);
        callback(undefined, {itemsData: itemsData});
      }
    });
    
  },

  addItem(data, callback) {

    let storage_container = '';

    if(data.type==='photos') {
      storage_container = 'media1'
    }
    else if(data.type==='Unprocessed') {
      storage_container = 'staging'
    }


    let finaldata = {
      categories: data.type,
      name: data.name,
      default_caption: data.name,
      disp_imageid:'system/photos.png',
      desc: "",
      sequence: Date.now()
    };
    
    esclient.addItem('directories', finaldata, undefined, function(err, result){

      console.log("Directories: addItem: err: ", err);
      console.log("Directories: addItem: result: ", result);
      callback(err, result);

    });
  }



};

module.exports = Directories;
