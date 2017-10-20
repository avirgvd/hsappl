
var google = require('googleapis');
var googleAuth = require('google-auth-library');
// var fs = require('fs');

// If modifying these scopes, delete your previously saved credentials
// at ~/.credentials/gmail-nodejs-quickstart.json
// var SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
// var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH ||
//   process.env.USERPROFILE) + '/.credentials/';
// var TOKEN_PATH = TOKEN_DIR + 'gmail-nodejs-quickstart.json';

exports.authorize = authorize;

// var client_secret_path="../../config/client_secret_971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com.json";
import client_secret from "../../../../../server/cloud/client_secret_971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com.json";


function authorize(code, callback){


  console.log(JSON.parse(client_secret))

  // Authorize a client with the loaded credentials, then call the
  // Gmail API.
  var clientSecret = client_secret.web.client_secret;
  var clientId = client_secret.web.client_id;
  var redirectUrl = client_secret.web.redirect_uris[0];
  var auth = new googleAuth();
  var oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  oauth2Client.getToken(code, function (err, token) {
    console.log("Token from google: ", token);
  });

}

