
var google = require('googleapis');
// var googleAuth = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;

exports.authorize = authorize;

// function authorize(token, callback){
function authorize(code, callback){

  var client_secret = require("./client_secret_971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com.json");

  console.log(client_secret);

  console.log("authorize: code: ", code);

  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  var clientSecret = client_secret.web.client_secret;
  var clientId = client_secret.web.client_id;

  //IMP: for server side authorization, use 'postmessage' for redirect_uri
  var oauth2Client = new OAuth2(clientId, clientSecret, 'postmessage');

  oauth2Client.getToken(code, function(err, tokens){
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    console.log("authorize: getToken tokens: ", tokens);
    console.log("authorize: getToken err: ", err);
    if (!err) {
      tokens.refresh_token = code;
      oauth2Client.setCredentials(tokens);

      // Now get the contact information available in Google
      var plus = google.plus('v1');

      plus.people.get({
        userId: 'me',
        auth: oauth2Client
      }, function (err, response) {
        console.log("people: ", response);
        console.log("people: err: ", err);
        callback({"id": response.id, "accessdata": tokens, "details": response});

      });
      
    }
  });

}
