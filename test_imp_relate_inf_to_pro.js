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


const csvFilePath = 'data_relate_inf_to_pro.csv'
const csv = require('csvtojson')
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {

        jsonObj.forEach((jsonObj2) => {

            let arrProductId = jsonObj2.pro_ori.filter((pro_pri_id) => pro_pri_id !== '');
            if (0 < arrProductId.length) {
                let arrModifyProductId = arrProductId.map((productId) => {
                    const [alphabetKey, numberKey] = productId.split('_');
                    return `${alphabetKey}_${String(numberKey).padStart(3, '0')}`
                })
                arrProductId = arrModifyProductId;
            }
            jsonObj2.pro_ori = arrProductId;

            let arrProductDupId = jsonObj2.pro_dup.filter((pro_dup_id) => pro_dup_id !== '');
            if (0 < arrProductDupId.length) {
                let arrModifyProductDupId = arrProductDupId.map((productId) => {
                    const [alphabetKey, numberKey] = productId.split('_');
                    return `${alphabetKey}_${String(numberKey).padStart(3, '0')}`
                })
                arrProductDupId = arrModifyProductDupId;
            }
            jsonObj2.pro_dup = arrProductDupId;



        })

       

        const arrInfluencer = jsonObj.map((obj) => obj.ID);
        const arrArrInProduct = jsonObj.map((obj) => [...obj.pro_dup, ...obj.pro_ori]);
        let finalObj = [];

        arrArrInProduct.forEach((arrInProduct, index) => {
            arrInProduct.forEach((product_id) => {
                if (finalObj.hasOwnProperty(product_id)) {
                    if (!finalObj[product_id].includes(arrInfluencer[index])) {
                        finalObj[product_id].push(arrInfluencer[index]);
                        finalObj[product_id].sort();
                    }
                } else {
                    finalObj[product_id] = [arrInfluencer[index]];
                }
            })
        })

        //console.log(finalObj);

        const arrInProduct = Object.keys(finalObj);
        arrInProduct.forEach((product_id) => {

            const document = firestore.doc('questionnaires/questionnaire_0002/products/' + product_id);
            const modifyObj = {
                arr_influencer: finalObj[product_id]
            };

            document.update(modifyObj).then(() => {
                console.log("Document created successfully");
            });
        })
      
    })
