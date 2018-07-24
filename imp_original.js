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



const csvFilePath = 'prd_original1.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        //console.log(jsonObj);
        const arr_product = [];

        
        jsonObj.forEach((jsonObj2) => {
            
            // console.log(Object.keys(jsonObj2)[0]);
            
           //console.log(jsonObj2.ID);
           
           //arr_product.push(jsonObj2.ID);
        //    const arr_product = jsonObj2.ID;

            
            
//  console.log(arr_product);
// console.log(arr_product.includes(jsonObj2.ID));

             if (arr_product.includes(jsonObj2.ID) === true) {
                 
                  arr_product.push(jsonObj2.ID);
                    console.log(arr_product);
                    
                } else {
                    
                    arr_product.push(jsonObj2.ID);
                    console.log(arr_product);

                    
                    const document = firestore.doc('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
                    delete jsonObj2.ID;
                    jsonObj2.tms_create = new Date();
                    jsonObj2.arr_influencer = [];
                    jsonObj2.str_prd_img = 'questionnaires/questionnaire_0002/products/' + jsonObj2.str_prd_key + '/product_image.png';
                    document.set( jsonObj2 ).then(() => {
                    console.log("Document created successfully");
            });

                }
            //console.log('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            // const document = firestore.doc('questionnaires/questionnaire_0002/influencers/' + jsonObj2.ID);
            // delete jsonObj2.ID;
            // jsonObj2.arr_formula = [];
            // jsonObj2.arr_product = [];
            // jsonObj2.tms_create = new Date();
            // jsonObj2.str_main_img = 'questionnaires/questionnaire_0002/influencers/' + jsonObj2.str_influencer_key + '/main_image.png';
            // document.set( jsonObj2 ).then(() => {
            //     console.log("Document created successfully");
            // });

        })

    })
