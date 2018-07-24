const Firestore = require('@google-cloud/firestore');

// Localhost
// const firestore = new Firestore({
//     projectId: 'local-mohara-test',
//     keyFilename: 'local-mohara-test-firebase-adminsdk-bzgin-1d8a30a045.json',
// });

// NYC
// const firestore = new Firestore({
//     projectId: 'nyc-colour',
//     keyFilename: 'nyc-colour-firebase-adminsdk.json',
// });


const csvFilePath = 'data_formula2.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        //console.log(jsonObj);
        //const arr_formula = [];
        jsonObj.forEach((jsonObj2) => {
            //delete jsonObj2.ID;
            //console.log(Object.keys(jsonObj2));
            // const arrKey = Object.keys(jsonObj2);
            // arrKey.forEach((key) => {
            //     arr_formula.push(jsonObj2[key]);
            //         console.log(arr_formula);
            //     //console.log('TEST = ' + jsonObj2[key])
            // })
            //delete Object.keys(jsonObj2)[0];
            const arr_influencer = jsonObj2.arr_influencer.split(','); // split string on comma space

            const document = firestore.doc('questionnaires/questionnaire_0002/match_for_to_inf/' + jsonObj2.ID);
            delete jsonObj2.ID;
            //delete jsonObj2.arr_influencer;
            jsonObj2.arr_influencer = arr_influencer
            // console.log(jsonObj2);
            document.set( jsonObj2 ).then(() => {
                console.log("Document created successfully");
            });

            //console.log(ar);
            //console.log(jsonObj2.arr_influencer);

            //console.log('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            // const document = firestore.doc('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            // delete jsonObj2.ID;
            // jsonObj2.tms_create = new Date();
            // jsonObj2.arr_influencer = [];
            // jsonObj2.str_prd_img = 'questionnaires/questionnaire_0002/products/' + jsonObj2.str_prd_key + '/product_image.png';
            // document.set( jsonObj2 ).then(() => {
            //     console.log("Document created successfully");
            // });

        })

    })
