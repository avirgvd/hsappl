/**
 * Created by govind on 9/9/18.
 */


var esclient = require('../elasticsearch/esclient');

var Financials = {

  init: function(){

  },

  getData: function(callback) {

    console.log("Financials: getData");

    // Get Saving Bankg accounts

    // Get Credit Card Accounts

    // Get Load Accounts

    // Get Investments



    callback(undefined, undefined);

  },

  addAccount(data) {

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

module.exports = Financials;