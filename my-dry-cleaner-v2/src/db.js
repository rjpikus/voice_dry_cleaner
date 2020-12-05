//FIREBASE INITIALIZATION
var admin = require("firebase-admin");

var serviceAccount = require("./mydrycleaner-be879-firebase-adminsdk-kwjo8-9fab6daf6f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://mydrycleaner-be879.firebaseio.com"
});

var db = admin.firestore();

module.exports = {
    db,
    admin
}
