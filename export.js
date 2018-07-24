var admin = require("firebase-admin");
var fs = require('fs');
var serviceAccount = require("./local-mohara-test-firebase-adminsdk-bzgin-1d8a30a045.json");

var fileName = process.argv[2];

// You should replae databaseURL with your own
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://local-mohara-test.firebaseio.com"
});

var db = admin.firestore();

fs.readFile(fileName, 'utf8', function(err, data){
  if(err){
    return console.log(err);
  }

  // Turn string from file to an Array
  dataArray = JSON.parse(data);

  udpateCollection(dataArray).then(() => {
    console.log('Successfully import collection!');
  })

})

async function udpateCollection(dataArray){
  for(var index in dataArray){
    var collectionName = index;
    for(var doc in dataArray[index]){
      if(dataArray[index].hasOwnProperty(doc)){
        await startUpading(collectionName, doc, dataArray[index][doc])
      }
    }
  }
}

function startUpading(collectionName, doc, data){
  return new Promise(resolve => {
    db.collection(collectionName).doc(doc)
    .set(data)
    .then(() => {
      console.log(`${doc} is successed adding to firestore!`);
      resolve('Data wrote!');
    })
    .catch(error => {
      console.log(error);
    });
  })
}