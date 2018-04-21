// import { escape } from 'querystring';

/**
 * Created by govind on 12/3/17.
 */

var esclient = require('../elasticsearch/esclient');

var Messages = {

  init: function(){

  },

  // TODO: Act on the specified item based on the specified action and return the result
  processMessage: function(id, action, callback) {
    console.log("// TODO: Act on the specified item based on the specified action and return the result");

    if(action.action === "photos") {
      // For photos import, the message should have attachments with mime-type container images
      esclient.getItem("messages", id, function(err, response){
        console.log("processMessage: getItem response: ", response);
        console.log("processMessage: getItem response: ", response.attachment_ids.length);
        
        if(response.attachment_ids.length === 0) {
          // ERROR: no attachments found for importing photos
        }
        else{
          
        }

      });
    }

    esclient.updateItem("messages", action, id, function(err, response){

      console.log("updateItem response: err: ", err);
      console.log("updateItem response: response: ", response);
    });

  },



};

module.exports = Messages;
