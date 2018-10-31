var firebase = require("firebase-admin");
var path = require('path');

var serviceAccount = require(path.join(__dirname,'..','firebase','admin','MarqetWiFi-0a4e4b68bafd.json'));

firebase.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://marqetwifi.firebaseio.com"
});