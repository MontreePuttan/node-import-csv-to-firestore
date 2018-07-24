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
        // jsonObj.forEach((jsonObj2) => {
        //     //console.log(jsonObj2);

        //     const arr_influencer = jsonObj2.arr_influencer.split(',');
        //     console.log(arr_influencer);

        //     arr_influencer.forEach((key) => {
        //         console.log(key + ' = ' + jsonObj2.ID)

        //         const document = firestore.doc('questionnaires/questionnaire_0002/influencers/' + key);

        //         jsonObj2.arr_formula = [jsonObj2.ID];

        //         document.update(jsonObj2).then(() => {
        //             console.log("Document created successfully");
        //         });
        //     })
        // })

        const arrFormula = jsonObj.map((obj) => obj.ID);
        const arrArrInfluencer = jsonObj.map((obj) => obj.arr_influencer.split(','));
        let finalObj = [];

        arrArrInfluencer.forEach((arrInfluencer, index) => {
            arrInfluencer.forEach((influencer) => {
                if (finalObj.hasOwnProperty(influencer)) {
                    if (!finalObj[influencer].includes(arrFormula[index])) {
                        finalObj[influencer].push(arrFormula[index]);
                        finalObj[influencer].sort();
                    }
                } else {
                    finalObj[influencer] = [arrFormula[index]];
                }
            })


        })




        const arrInfluencer = Object.keys(finalObj);

        arrInfluencer.forEach((influencer_id) => {

            const document = firestore.doc('questionnaires/questionnaire_0002/influencers/' + influencer_id);
            //console.log('questionnaires/questionnaire_0002/influencers/' + index);

            const modifyObj = {
                arr_formula: finalObj[influencer_id]
            };

            //console.log(arrInfluencer);

            document.update(modifyObj).then(() => {
                console.log("Document created successfully");
            });
        })


        console.log(finalObj);


    })
