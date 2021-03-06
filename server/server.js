/**
 * Created by govind on 7/23/16.
 */

var express = require("express");
var restlayer = require('./RESTLayer');
var homeServer = require('./homeserver/homeserver');
var esclient = require('./elasticsearch/esclient');
var bodyParser = require('body-parser');
var child_process = require("./childprocess/childprocess");
var directories = require('./categories/directories');
var photos = require('./categories/photos');
var digitallibrary = require('./categories/digitallibrary');
var documents = require('./categories/documents');
var financials = require('./categories/financials');
var google = require('./cloud/google');
var messages = require('./categories/messages');
var financials = require('./categories/financials');
var contacts = require('./categories/contacts');

var hssettings = require("./settings/settings");

var app = express();

// The below code is required to enable Cross Origin REST Calls
// This is required as REST server listens on 3010 port
// where as the front-end's server listens on 3000
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// parse application/json
// To parse body coming with POST requests
// Without this body will not be accessible in POST request handlers
app.use(bodyParser.json());


/************************ GET FUNCTIONS  *************************************/

//TODO: need to get rid of this function and use a generic function instead
app.get('/rest/photos', function(req, resp){
  console.log("get /rest/photos: req: ", req.params);
  console.log("get /rest/photos: req: ", req.query);

  var query = {"sort": [
    {"import_date" : "desc"},
    {"file_date" : "desc"}
  ]};

  esclient.getItems('photos', query, function(err, items) {
    // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
    if (err) {
      resp.json({error: err});
    } else {
      console.log("server: /rest/photos items[0]: ", items[0]);
      resp.json({items: items});
    }
  });
});

// TODO: To be deleted 4/21/2018
app.get('/rest/photo', function(req, resp){
  console.log("get /rest/photo: req: ", req.params);
  console.log("get /rest/photo: req: ", req.query);

  resp.json({photo: {}});


});

// TODO: To be deleted 4/21/2018
// For files like photos that come with the application
app.get('/rest/system', function(req, resp){
  console.log("get /rest/system: req.params: ", req.params);
  console.log("get /rest/system: req.query: ", req.query);

  resp.json({settings: {}});


});

app.get('/rest/googleauthcallback', function(req, resp){

  var code = req.query.code;
  console.log("/rest/googleauthcallback: code: ", code);
  // google.authorize2(code);


});

app.get('/oauthCallback', function(req, resp){
  console.log("app.get /oauthCallback ", req.query.code);

  google.authorize(req.query.code, function(profiledata){

    console.log("profiledata: ", profiledata);

    esclient.addItem("accounts", {"network": "google", "access_data": profiledata.accessdata, "contact_data": profiledata.details, "scopes": ["email", "drive", "photos", "videos"]}, profiledata.id, function(err, result){
      console.log("/oauthCallback result ", result);
      resp.json({status: 'added', result: result});
    });



  });

});

/************************ POST FUNCTIONS *************************************/

// File-server implementation using this below line
// app.use( express.static('/home/govind/HomeServer/storage/staging'));

//app.post('/rest/hsfileupload', upload.array('file'), function(req,res){
app.post('/rest/hsfileupload', function(req,res){

  console.log("#############$$$$$$$$$$$FILES", req.files);

  return;
  
  restlayer.fileUploadHandler(req, res, function (err, req, res) {

    console.log("#$$$$$$ RESP: ", req.files);
    //console.log("#$$$$$$ RESP: ", resp);

    res.end("File uploaded.");
  });
});



// Get collection of items from any specified index
// Items can be photos, contacts, documents etc
// TODO: restructure the flow for reducing repeated code 4/21/2018
// list of items for photos should include id, file_date, orgfilename, mimetype, container
// list of items for other category should include?
app.post('/rest/index/items', function(req, resp){

  //TODO: There is a bug in this function. To reproduce go to Phase2->System Settings and server.js crashes. dt: 9Jun2018
  console.log("post /rest/index/items: req: ", req.body);
  console.log("post /rest/index/items: req.body.query: ", req.body.query);

  var index = esclient.getIndexForCategory(req.body.category);
  console.log("post /rest/index/items: index: ", index);

  var fields = esclient.getListFieldsForCategory(req.body.category);

  if(req.body.category === 'directories') {

    directories.getitems(req.body.params, req.body.query, fields, function(err, result) {
      if (err) {
        resp.json({error: err, result: {items: []}});
      } else {
        console.log("server: /rest/index/items: cards", result);
        resp.json({result: result});
      }
    });

    return;
  }
  else if (req.body.category === 'photos') {

    photos.getitems(req.body.params, req.body.query, fields, function(err, result) {
      if (err) {
        resp.json({error: err, result: {items: []}});
      } else {
        console.log("server: /rest/index/items: photos", result);
        resp.json({result: result});
      }
    });

    return;
  }
  else if (req.body.category === 'digitallibrary') {

    digitallibrary.getitems(req.body.params, req.body.query, fields, function(err, result) {
      if (err) {
        resp.json({error: err, result: {itemsData: []}});
      } else {
        console.log("server: /rest/index/items: digitallibrary", result);
        resp.json({result: result});
      }
    });

    return;

  } else if (req.body.category === 'settings') {
    
    hssettings.getSettings(index, req.body.params, req.body.query, fields, function(err, result){

      console.log("server: loadSettings returned: ",result);
      resp.json({"result": result});
    });
    
    return;
  }
  else if(index == "financials") {

    console.log("post /rest/index/items financials");

    financials.getAccounts(req.body.params, req.body.query, fields, function(err, result){
      console.log("server: loadSettings returned: ",result);
      resp.json({"result": result});
    });

    return;
  }
  else if(index == "contacts") {

    console.log("post /rest/index/items contacts");

    contacts.getContacts(req.body.params, req.body.query, fields, function(err, result){
      console.log("server: contacts.getContacts: returned: ",JSON.stringify(result));
      resp.json({"result": result});
    });

    return;
  }

  // esclient.getItems(index, req.body.params, req.body.query, fields, function(err, result) {
  //   if (err) {
  //     resp.json({error: err, result: {items: []}});
  //   } else {
  //     console.log("server: /rest/index/items: ", result);
  //     resp.json({result: {itemsData: result}});
  //   }
  // });
});


// Get collection of items from any specified index
// Items can be photos, contacts, documents etc
// TODO: restructure the flow for reducing repeated code 4/21/2018
// list of items for photos should include id, file_date, orgfilename, mimetype, container
// list of items for other category should include?
app.post('/rest/documents/items', function(req, resp){

  console.log("post /rest/documents/items: req: ", req.body);
  console.log("post /rest/documents/items: req.body.query: ", req.body.query);

  // var index = esclient.getIndexForCategory(req.body.category);
  // console.log("post /rest/documents/items: index: ", index);

  var fields = esclient.getListFieldsForCategory(req.body.category);

  if (req.body.category === 'photos') {

    photos.getitems(req.body.params, req.body.query, fields, function(err, result) {
      if (err) {
        resp.json({error: err, result: {items: []}});
      } else {
        console.log("server: /rest/documents/items: photos", JSON.stringify(result));
        resp.json({result: result});
      }
    });

  }
  else {
    documents.getitems(req.body.params, req.body.query, fields, function(err, result) {
      if (err) {
        resp.json({error: err, result: {items: []}});
      } else {
        console.log("server: /rest/documents/items: documents", JSON.stringify(result));
        resp.json({result: result});
      }
    });
  }




  // esclient.getItems(index, req.body.params, req.body.query, fields, function(err, result) {
  //   if (err) {
  //     resp.json({error: err, result: {items: []}});
  //   } else {
  //     console.log("server: /rest/index/items: ", result);
  //     resp.json({result: {itemsData: result}});
  //   }
  // });
});

// Get filter parameters for a given category type
// TODO: Try another approach for querying filters 4/21/2018
// app.post('/rest/index/items/filters', function(req, resp){
//
//   // TODO: temporarily commenting this function code
//   return;
//
//   console.log("post /rest/index/items/filters: req: ", req.body);
//
//   var index = esclient.getIndexForCategory(req.body.category);
//
//   // esclient.getFilterItems("photos", "exif.Exif IFD0.Model", function(result) {
//   esclient.getFilterItems(index, "exif.Exif IFD0.Model", function(result) {
//     // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
//     console.log("server: /rest/photos items[0]: ", result);
//     resp.json({camera: result});
//   });
// });

// Get item of category specified by :category
app.post('/rest/category/:category', function(req, resp){
  console.log("post /rest/category/:category: req.params.category: ", req.params.category);
  console.log("post /rest/category/:category: req: ", req.body);
  

  if(req.params.category === 'messages') {
    
  }
  console.log("post /rest/category/:category: FUNCTION NOT IMPLEMENTED!!!");

  // resp.json({error: "Function not implemented!!!"});
  //
  // // TODO: Need to complete the implementation for this function
  let index = esclient.getIndexForCategory(req.params.category);
  esclient.getItem(index, req.body.id, function(err, result){
      if (err) {
        resp.json({error: err});
      } else {
        console.log("result: ", result);
        resp.json({result: result});
      }

  });
  // esclient.getItems(req.body.category, req.body.params, req.body.query, function(err, result) {
  //   // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
  //   if (err) {
  //     resp.json({error: err});
  //   } else {
  //     console.log("server: /rest/contacts items[0]: ", result);
  //     resp.json({result: result});
  //   }
  // });
});



app.post('/rest/add', function(req, resp){
  console.log("/rest/add req ", req.body);

  google.authorize(req.body.item, function(profiledata){

    console.log("profiledata: ", profiledata);

    let body = req.body;

    esclient.addItem(body.category, {"network": "google", "access_data": profiledata.accessdata, "contact_data": profiledata.details, "scopes": ["email", "drive", "photos", "videos"]}, profiledata.id, function(err, result){
      console.log("/rest/add result ", result);
      resp.json({status: 'added', result: result});
    });

  });
});

// TODO: The rest URL /rest/add_1 should soon to be moved to /rest/add
app.post('/rest/add_1', function(req, resp){
  console.log("/rest/add_1 req ", req.body);

  const {category, data} = req.body;

  console.log('/rest/add_1 category: ', category);
  console.log('/rest/add_1 data: ', data);

  if(category==='directories') {
    directories.addItem(data, function(err, result){
      resp.json({});
    });
  }
  else if(category==='financials') {
    financials.addAccount(data, function(err, result){
      resp.json({});
    });
  }
  else if(category==='contacts') {
    contacts.addContact(data, function(err, result){
      resp.json({});
    });
  }

});



app.post('/rest/updateitem', function(req, resp){
  console.log("/rest/updateitem req ", req.body);

  let body = req.body;
  let data = body.data;

  console.log("/rest/updateitem data: ", JSON.stringify(data));

  // esclient.deleteItem(body.category, body.id, function(err, result){
  //   resp.json({id: body.id, status: 'deleted', result: result});
  // });


});

app.post('/rest/processitem', function(req, resp){
  console.log("/rest/processitem req ", req.body);

  let body = req.body;
  let action = body.action;

  console.log("/rest/processitem data: ", JSON.stringify(action));



  if(req.body.category === "messages") {
    // TODO: Act on the specified item based on the specified action and return the result
    messages.processMessage(req.body.id, req.body.action, function(err, result){
      console.log("/rest/processitem messages.processMessage returned result: ", result);
      console.log("/rest/processitem messages.processMessage returned err: ", err);

    });
    
  }



});

app.post('/rest/deleteitem', function(req, resp){
  console.log("/rest/deleteitem req ", req.body);

  let body = req.body;

  esclient.deleteItem(body.category, body.id, function(err, result){
    resp.json({id: body.id, status: 'deleted', result: result});
  });


});

// This below function is not being used
app.post('/oauthCallback', function(req, resp){
  console.log("app.post /oauthCallback ", req.query.code);

  google.authorize(req.query.code, function(profiledata){

    console.log("profiledata: ", profiledata);

    let body = req.body;

    esclient.addItem(body.category, {"network": "google", "access_data": profiledata.accessdata, "contact_data": profiledata.details, "scopes": ["email", "drive", "photos", "videos"]}, profiledata.id, function(err, result){
      console.log("/oauthCallback result ", result);
      resp.json({status: 'added', result: result});
    });



  });


});

//Financials
app.post('/rest/accounts/list', function(req, resp){

  console.log("post /rest/accounts/list: req: ", req.body);
  console.log("post /rest/accounts/list: req.body.query: ", req.body.query);

  var fields = esclient.getListFieldsForCategory("financials");


  financials.getAccounts(req.body.params, req.body.query, fields, function(err, result) {
    if (err) {
      resp.json({error: err, result: {items: []}});
    } else {
      console.log("server: /rest/accounts/list: accounts", JSON.stringify(result));
      resp.json(result);
    }
  });

});



//app.post('/rest/hsfileupload', function(req,res){
//  console.log(req);
//  console.log(req.file);
//  console.log(req.files);
//
//  upload(req,res,function(err){
//    console.log("########################", err);
//    res.end("File uploaded.");
//  })
//});

homeServer.init();
restlayer.init();

var urls = hssettings.getNetworkConnectionURLs();

console.log("############## ", urls);
// esclient.getFilterItems("photos", "exif.Exif IFD0.Model", function(res){
//   console.log("getFilterItems", JSON.stringify(res));
// });

// child_process.triggerFileDigest();

app.listen(3000,function(){
  console.log("Working on port 3000");
});