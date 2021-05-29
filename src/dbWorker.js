const { parentPort } = require('worker_threads');


const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert(require('../keys/admin.json')),
  databaseURL: "https://webhosting-demo.firebaseio.com"
});
let db = admin.firestore();

// get current data in DD-MM-YYYY format
let date = new Date();
let currDate = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

// recieve crawled data from main thread
parentPort.once("message", (message) => {
    console.log("Recieved data from mainWorker...");

    // store data gotten from main thread in database
    db.collection("Rates").doc(currDate).set({
        rates: JSON.stringify(message)
    }).then(() => {
        // send data back to main thread if operation was successful
        parentPort.postMessage("Data saved successfully");
    })
    .catch((err) => console.log(err))    
});