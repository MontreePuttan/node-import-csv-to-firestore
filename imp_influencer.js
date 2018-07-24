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



// const csvFilePath = 'data_influencer.csv'
const csvFilePath = 'data_influencer-test.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        //console.log(jsonObj);
        jsonObj.forEach((jsonObj2) => {

            // console.log(Object.keys(jsonObj2)[0]);

            // console.log(jsonObj2);
            //console.log('questionnaires/questionnaire_0002/products/' + jsonObj2.ID);
            const document = firestore.doc('questionnaires/questionnaire_0002/influencers/' + jsonObj2.ID);
            delete jsonObj2.ID;
            jsonObj2.arr_formula = [];
            jsonObj2.arr_product = [];
            jsonObj2.tms_create = new Date();
            const text = jsonObj2.str_name;
            const chk_name_length = text.split(" ").length;
            const chk_name_split = text.split(" ");
            // console.log(text.split(" "));
            if (chk_name_length === 2) {
                const name = chk_name_split[0];
                const sname = chk_name_split[1];
                //const full_name = name + " / " + sname
                jsonObj2.str_name = name;
                jsonObj2.str_surname = sname;
            } else {
                //const full_name = text;
                jsonObj2.str_name = text;
                jsonObj2.str_surname = "";
                //console.log(full_name);
            }
            jsonObj2.str_main_img = 'questionnaires/questionnaire_0002/influencers/' + jsonObj2.str_influencer_key + '/main_image.png';
            document.set(jsonObj2).then(() => {
                console.log("Document created successfully");
            });

        })

    })
