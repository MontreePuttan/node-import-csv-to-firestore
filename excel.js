// var csvjson = require('csvjson');
// var data ='row1.csv'
// var options = {
//     delimiter : ',', // optional
//     quote     : '"' // optional
//   };
//   csvjson.toObject(data, options)
//   console.log(csvjson);

/** csv file
a,b,c
1,2,3
4,5,6
*/
const csvFilePath='row1.csv'
const csv=require('csvtojson')
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    // const arrPromise = jsonObj.map((result) => {
    //     //return String(result);
    //     return JSON.stringify(result);
    //   })
    //   console.log(arrPromise);

})
