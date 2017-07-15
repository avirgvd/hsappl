/**
 * Created by govind on 7/23/16.
 */

var express = require("express");
var restlayer = require('./RESTLayer');
var homeServer = require('./homeserver/homeserver');
var esclient = require('./elasticsearch/esclient');
var bodyParser = require('body-parser');
var child_process = require("./childprocess/childprocess");

//var upload = multer().array('file');

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


// File-server implementation using this below line
// app.use( express.static('/home/govind/HomeServer/storage/staging'));

//app.post('/rest/hsfileupload', upload.array('file'), function(req,res){
app.post('/rest/hsfileupload', function(req,res){

  console.log("#############$$$$$$$$$$$FILES", req.files);

  restlayer.fileUploadHandler(req, res, function (err, req, res) {

    console.log("#$$$$$$ RESP: ", req.files);
    //console.log("#$$$$$$ RESP: ", resp);

    res.end("File uploaded.");
  });
});

/*
* handler for http get requests for the files.
* The GET request should be typically like http://hostname:3000/<filename>
* The request param 'file' has the file name to fetch
* */
app.get('/:file', function(req, resp){
  console.log("get params: ", req.params);
  console.log("get file: ", req.params.file);

});

app.get('/rest/photos', function(req, resp){
  console.log("get /rest/photos: req: ", req.params);
  console.log("get /rest/photos: req: ", req.query);

  esclient.getItems('photos', {}, function(err, items) {
    // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
    if (err) {
      resp.json({error: err});
    } else {
      console.log("server: /rest/photos items[0]: ", items[0]);
      resp.json({items: items});
    }
  });
});

app.get('/rest/photo', function(req, resp){
  console.log("get /rest/photo: req: ", req.params);
  console.log("get /rest/photo: req: ", req.query);

  resp.json({photo: {}});


});

app.post('/rest/index/items', function(req, resp){
  console.log("post /rest/index/items: req: ", req.body);

  var index = esclient.getIndexForCategory(req.body.category);
  console.log("post /rest/index/items: index: ", index);

  if(index == "financials") {

    console.log("post /rest/index/items financials");

    // if(req.body.params.hasOwnProperty("from"))
    //   return;


    var result = {"total": 10, "currentEnd": 5, "items": [
        {"id": "0AF49C3444","bankname": "Citibank N.A.", "type": "saving", "accountnum": "1234567890", "statements": [], "otherdocs": [], "balance": "4343", "currency": "INR", "address": {}},
        {"id": "0AF49C3445","bankname": "ICICI Bank", "type": "current", "accountnum": "5545547770", "statements": [], "otherdocs": [], "balance": "1500", "currency": "INR", "address": {}},
        {"id": "0AF49C3446","bankname": "State Bank of India", "type": "saving", "accountnum": "0003332020", "statements": [], "otherdocs": [], "balance": "5000", "currency": "INR", "address": {}},
        {"id": "0AF49C3448","bankname": "State Bank of India", "type": "credit", "accountnum": "0003332020", "statements": [], "otherdocs": [], "balance": "0", "currency": "INR", "address": {}},
        {"id": "0AF49C3449","bankname": "ICICI Platinum Credit Card", "type": "credit", "accountnum": "0003332020", "statements": [], "otherdocs": [], "balance": "50000", "currency": "INR", "address": {}}
      ]
    };

    resp.json({"result": result});
    return;
  }

  esclient.getItems(index, req.body.params, req.body.query, function(err, result) {
    // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
    if (err) {
      resp.json({error: err, result: {items: []}});
    } else {
      console.log("server: /rest/photos items[0]: ", result);
      resp.json({result: result});
    }
  });
});

app.post('/rest/index/items/filters', function(req, resp){
  console.log("post /rest/index/items/filters: req: ", req.body);

  var index = esclient.getIndexForCategory(req.body.category);

  // esclient.getFilterItems("photos", "exif.Exif IFD0.Model", function(result) {
  esclient.getFilterItems(index, "exif.Exif IFD0.Model", function(result) {
    // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
    console.log("server: /rest/photos items[0]: ", result);
    resp.json({camera: result});
  });
});


app.post('/rest/contacts', function(req, resp){
  console.log("post /rest/contacts: req: ", req.body);

  esclient.getItems(req.body.category, req.body.params, req.body.query, function(err, result) {
    // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
    if (err) {
      resp.json({error: err});
    } else {
      console.log("server: /rest/contacts items[0]: ", result);
      resp.json({result: result});
    }
  });
});

// app.post('/rest/index/items', function(req, resp){
//   console.log("post /rest/index/items: req: ", req.body);
//
//   esclient.getItems(req.body.category, req.body.params, req.body.query, function(err, result) {
//     // resp.json({items: [{key: 1, desc: "desc1"}, {key: 2, desc: "desc2"}, {key: 3, desc: "desc3"}]});
//     if (err) {
//       resp.json({error: err});
//     } else {
//       console.log("/rest/index/items items[0]: ", result);
//       resp.json({result: result});
//     }
//   });
// });

app.post('/rest/add', function(req, resp){
  console.log("/rest/add req ", req.body);


  let body = req.body;

  esclient.addItem(body.category, body.item, null, function(err, result){
    console.log("/rest/add result ", result);
    resp.json({status: 'added', result: result});
  });
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

app.post('/rest/deleteitem', function(req, resp){
  console.log("/rest/deleteitem req ", req.body);

  let body = req.body;

  esclient.deleteItem(body.category, body.id, function(err, result){
    resp.json({id: body.id, status: 'deleted', result: result});
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

// esclient.getFilterItems("photos", "exif.Exif IFD0.Model", function(res){
//   console.log("getFilterItems", JSON.stringify(res));
// });

// child_process.triggerFileDigest();

app.listen(3000,function(){
  console.log("Working on port 3000");
});