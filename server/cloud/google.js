
var google = require('googleapis');
// var googleAuth = require('google-auth-library');
var OAuth2 = google.auth.OAuth2;


const ClientId = "971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com";
const ClientSecret = "U1XBeR_Q-veTpWSxfVsl-8hH";
// const RedirectionUrl = "http://localhost:3000/oauthCallback";
const RedirectionUrl = "http://localhost:3000/oauthCallback";


exports.getAuthUrl = getAuthUrl;
exports.authorize = authorize;

function getOAuthClient () {
  return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
  var oauth2Client = getOAuthClient();
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    'profile',
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/drive',
    'https://mail.google.com/',
    'https://www.googleapis.com/auth/drive.photos.readonly',
    'https://www.googleapis.com/auth/contacts.readonly',
    'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/userinfo.profile'
  ];

  // approval_prompt: "force", is added to ensure refresh_token is always sent by Google
  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    approval_prompt: "force",
    scope: scopes // If you only need one scope you can pass it as string
  });

  return url;
}

function authorize(code, callback) {
  var oauth2Client = getOAuthClient();

  // The refresh_token is only sent when the user initially authorizes your app with their account.
  // So it the getToken function only returns it the first time (because you should store it).
  // Added approval_prompt: "force" to the generateAuthUrl options, and I can get it every time.
  // Without the approval_prompt you can go to the user google account security settings under
  // "Apps with access to your account and remove HSAppl from the list
  // Once you do that you will receive refresh token

  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    console.log("setAuthCode getToken callback: tokens: ", tokens);

    if(!err) {
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
    else{

    }
  });

}

// function authorize(token, callback){
function authorize1(code, callback){

  var client_secret = require("./client_secret.json");

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
