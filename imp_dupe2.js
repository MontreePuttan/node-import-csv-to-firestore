const Firestore = require('@google-cloud/firestore');

// Localhost
const firestore = new Firestore({
    projectId: 'local-mohara-test',
    keyFilename: 'local-mohara-test-firebase-adminsdk-bzgin-1d8a30a045.json',
});

// NYC
// const firestore = new Firestore({
//     projectId: 'nyc-colour',
//     keyFilename: 'nyc-colour-firebase-adminsdk.json',
// });



const csvFilePath = 'prd_dupe2.csv'
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
            jsonObj2.tms_create = new Date();
            jsonObj2.arr_influencer = [];
            jsonObj2.str_prd_img = 'questionnaires/questionnaire_0002/products/' + jsonObj2.str_prd_key + '/product_image.png';
            document.set( jsonObj2 ).then(() => {
                console.log("Document created successfully");
            });

        })

    })
