

To start the client
>> npm run start

Access using http://localhost:3010

Async Redux code based on:
https://github.com/reactjs/redux/tree/master/examples/async

Installing Semantic-UI

`npm install gulp -g
npm install semantic-ui --save`

**Photos Implementation:**
----------------------
Photos should be similar to Flikr style

Video clips should have same cards style as Photos


**File Upload:**
------------


react-fileupload for front-end
https://www.npmjs.com/package/react-fileupload

or
https://www.npmjs.com/package/react-fileupload-progress
This one is not easy to getstarted so not the preferred one even though it has progress feature


multer for nodejs side rest api for file upload

REST Client:
-----------
```
npm install --save isomorphic-fetch es6-promise
```

**Reducers using Immutable:**
http://facebook.github.io/immutable-js/


PDF Viewer: (Need review of the information reg PDF viewer)
-----------------------------------------------------------
installed 'react-pdf'
Download PDF.js from http://mozilla.github.io/pdf.js/getting_started/#download 
And add to index.html 
```
 <script src="pdfjs-1.5.188-dist/build/pdf.js"></script>
```
 

```
$ npm install react-pdf --save
```
react-pdf depends on PDF.JS (http://mozilla.github.io/pdf.js/)

To install PDF.js:
```
$ git clone git://github.com/mozilla/pdf.js.git
$ cd pdf.js

$ gulp generic

```

Google API Client registration:
{
  "web": {
    "client_id": "971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com",
    "project_id": "hsappl-147905",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "U1XBeR_Q-veTpWSxfVsl-8hH",
    "javascript_origins": [
      "http://localhost:3010"
    ]
  }
}
Google API Console for changing anything is at:
https://console.developers.google.com/apis/credentials/oauthclient/971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com?proje


https://accounts.google.com/o/oauth2/auth?client_id=971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3010%2F&state={%22client_id%22%3A%22971270578758-mfmfamsug6d1iea5vad34ci767gprpgi.apps.googleusercontent.com%22%2C%22network%22%3A%22google%22%2C%22display%22%3A%22popup%22%2C%22callback%22%3A%22_hellojs_2guiudrb%22%2C%22state%22%3A%22%22%2C%22redirect_uri%22%3A%22http%3A%2F%2Flocalhost%3A3010%2F%22%2C%22scope%22%3A%22full%22}&scope=full






Check the following blog for implementation of google contacts fetch:
https://adodson.com/hello.js/#hellologout

Installed the hellojs module:
```
$ npm install hellojs
```


##Dropdown menus for filters:

The following code can be used for showing dropdown menu but the challenge is how to show the dropdown menu in the actual GUI
```
<div class="ui floating labeled icon dropdown button">
  <i class="filter icon"></i>
  <span class="text">Filter</span>
  <div class="menu">
    <div class="header">
      <i class="tags icon"></i>
      Filter by tag
    </div>
    <div class="item">
      Important
    </div>
    <div class="item">
      Announcement
    </div>
    <div class="item">
      Discussion
    </div>
  </div>
</div>
```

SOLVED: To make it work, I had to change "ui floating"  to "ui simple"

Date: Nov 19 2016
Moving from Semantic-ui to Grommet 1.0.
Grommet now looks more rich especially for charts in the financials module compared to Semantic-ui.
Semantic-ui doesnt have date picker too.

Date: Dec 25 2016
##Image Thumbnail generator for node.js
When displaying photos in the list view, the photos cannot be loaded to the browser using original resolution. This is causing severe performance issues.
To avoid this problem, the image thubnails should be generated for showing in the list view.
 
Options exploring for node.js module for thumbnail generator:
Light Weight Image Processor for NodeJS https://github.com/EyalAr/lwip
Sharp http://sharp.dimens.io/en/stable/



