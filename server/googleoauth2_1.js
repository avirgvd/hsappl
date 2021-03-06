/**
 * Created by govind on 10/29/17.
 */
var express = require('express');
var Session = require('express-session');
var http = require('http');
var google = require('googleapis');
var plus = google.plus('v1');
var OAuth2 = google.auth.OAuth2;
const ClientId = "971270578758-v7155pjr0sbrvbu3u8qsnj7l6j5fmbtr.apps.googleusercontent.com";
const ClientSecret = "Tw9oaflqUDkdoluT5hsRlkpA";
const RedirectionUrl = "http://localhost:1234/oauthCallback";

var app = express();
app.use(Session({
  secret: 'govind-0312312',
  resave: true,
  saveUninitialized: true
}));

function getOAuthClient () {
  return new OAuth2(ClientId ,  ClientSecret, RedirectionUrl);
}

function getAuthUrl () {
  var oauth2Client = getOAuthClient();
  // generate a url that asks permissions for Google+ and Google Calendar scopes
  var scopes = [
    'https://www.googleapis.com/auth/plus.me'
  ];

  var url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes // If you only need one scope you can pass it as string
  });

  return url;
}

app.use("/oauthCallback", function (req, res) {
  var oauth2Client = getOAuthClient();
  var session = req.session;
  var code = req.query.code;
  oauth2Client.getToken(code, function(err, tokens) {
    // Now tokens contains an access_token and an optional refresh_token. Save them.
    console.log("oauthCallback: tokens: ", tokens);

    if(!err) {
      oauth2Client.setCredentials(tokens);
      session["tokens"]=tokens;
      res.send(`
            &lt;h3&gt;Login successful!!&lt;/h3&gt;
            &lt;a href="/details"&gt;Go to details page&lt;/a&gt;
        `);
    }
    else{
      res.send(`
            &lt;h3&gt;Login failed!!&lt;/h3&gt;
        `);
    }
  });
});

app.use("/details", function (req, res) {
  var oauth2Client = getOAuthClient();
  oauth2Client.setCredentials(req.session["tokens"]);

  var p = new Promise(function (resolve, reject) {
    plus.people.get({ userId: 'me', auth: oauth2Client }, function(err, response) {
      resolve(response || err);
    });
  }).then(function (data) {
    res.send(`
            &lt;img src=${data.image.url} /&gt;
            &lt;h3&gt;Hello ${data.displayName}&lt;/h3&gt;
        `);
  })
});

app.use("/", function (req, res) {
  var url = getAuthUrl();

  console.log("URL: ", url);

  res.setHeader('Content-Type', 'text/html')
  res.write('<h1>Authentication using google oAuth</h1>')
  res.write('<a href=' + url + '>Login'+'</a>')
  res.end()
  // res.send(`
  //       &lt;h1&gt;Authentication using google oAuth&lt;/h1&gt;
  //       &lt;a href=${url}&gt;Login&lt;/a&gt;
  //   `)
});


var port = 1234;
var server = http.createServer(app);
server.listen(port);
server.on('listening', function () {
  console.log(`listening to ${port}`);
});
