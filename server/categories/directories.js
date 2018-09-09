/**
 * Created by govind on 8/6/17.
 */

var esclient = require('../elasticsearch/esclient');

var Directories = {

  init: function(){

  },
  
  getitems: function(params, query1, fields, callback) {

    console.log("Directories: getitems: ", query1);

    esclient.getItems('directories', params, {'query': {'match': query1}}, fields, function(err, itemsData) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {itemsData:{}}});
      } else {
        console.log("Cards: getitems: ", itemsData);
        callback(undefined, {itemsData: itemsData});
      }
    });
    
  },

  addItem(data) {

    let storage_container = '';

    if(data.type==='photos') {
      storage_container = 'media1'
    }
    else if(data.type==='Unprocessed') {
      storage_container = 'staging'
    }


    let finaldata = {
      category: data.type,
      name: data.name,
      default_caption: data.name,
      disp_imageid:'system/photos.png',
      desc: "",
      container: storage_container
    };
    
    esclient.addItem('directories', finaldata, undefined, function(err, result){

      console.log("Directories: addItem: err: ", err);
      console.log("Directories: addItem: result: ", result);

    });
  }



};

module.exports = Directories;
