const Firestore = require('@google-cloud/firestore');

const firestore = new Firestore({
    projectId: 'local-mohara-test',
    keyFilename: 'local-mohara-test-firebase-adminsdk-bzgin-1d8a30a045.json',
});



const csvFilePath = 'row1.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        //console.log(jsonObj);
        jsonObj.forEach((jsonObj2) => {
            
            // console.log(Object.keys(jsonObj2)[0]);
            
           // console.log(jsonObj2);
            //console.log('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            const document = firestore.doc('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            delete jsonObj2.ID;
            document.set( jsonObj2 ).then(() => {
                console.log("Document created successfully");
            });

        })

    })
