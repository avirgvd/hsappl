/**
 * Created by govind on 8/6/17.
 */

var esclient = require('../elasticsearch/esclient');

var Cards = {

  init: function(){

  },
  
  getitems: function(params, query1, fields, callback) {

    console.log("Cards: getitems: ", query1);

    esclient.getItems('cards', params, {'query': {'match': query1}}, fields, function(err, result) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {items: []}});
      } else {
        console.log("Cards: getitems: ", result);
        callback(undefined, result);
      }
    });
    
  }



};

module.exports = Cards;
