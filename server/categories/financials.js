/**
 * Created by govind on 9/9/18.
 */


var esclient = require('../elasticsearch/esclient');

var Financials = {

  init: function(){

  },

  getAccounts: function(params, query1, fields, callback) {

    console.log("Financials: getAccounts query1: ", query1);

    // Get Saving Bankg accounts

    // Get Credit Card Accounts

    // Get Load Accounts

    // Get Investments

    esclient.getItems('financialaccounts', params, {}, fields, function(err, result) {
      // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
      if (err) {
        callback(err, {error: err, result: {}});
      } else {
        console.log("Financials: getAccounts: result: ", result);
        callback(undefined, {result});
      }
    });

  },

  addAccount(data, callback) {

    console.log("Financials: addAccount: data: ", data);
    let storage_container = '';


    esclient.addItem('financialaccounts', data, undefined, function(err, result){

      console.log("Financials: addItem: err: ", err);
      console.log("Financials: addItem: result: ", result);
      callback(err, result);

    });
  }

};

module.exports = Financials;