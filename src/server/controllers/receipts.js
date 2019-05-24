const cloudinary = require('cloudinary').v2;

const fetch = require('node-fetch');
//const fs = require('fs');
const FormData = require('form-data');
const requestPackage = require('request');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

cloudinary.config({
  cloud_name: 'difceofnn',
  api_key: '138163593634117',
  api_secret: 'UQBGNsgKzLZDlijgj-t1Tx6Sm84'
});

const tabUrl = 'https://api.tabscanner.com/VCB56Md7G1imsKz6Y3FKmcNiBXNmBaClTSpyT55ciRZLTdWDKRD06iBQx4JvoSpr';

module.exports = (db) => {

    let giveMeReceipt = ( req, res ) =>{

        //can use http path or ajax put in body
        // edit argument as necessary
        console.log('hello give receipt', req.params.id);
        let input = req.params.id;

        db.receipts.getReceipt( input, (err, receipts) =>{
            if(err){
                console.error('error getting receipt(s)', err);
                res.status(500).send("Error getting receipt");
            } else {
                console.log( 'AT CONTROLLER RESULTS', receipts );
                if(receipts.receipt.length === 0){
                    res.send('No entry');
                }else{
                    res.send( receipts.receipt );
                }
            }
        })
    }

    // upload photo to cloudinary and send it to tabscanner
    let uploadPhoto = (request, response) => {
        console.log("Uploading up to cloudinary")
        let file = request.file.path;

        let url = "";
        let publicId = "";

        cloudinary.uploader.upload(
          file,
          function(error, result) {
            console.log("upload to cloudinary successful")
            url = result.url;
            publicId = result.public_id

            if (url !== "" && publicId !== "") {
                console.log(url)
                console.log(publicId)
                console.log("entering to fetch and post")

                const form = new FormData();

                form.append(publicId, requestPackage(url));

                fetch(`${tabUrl}/process`, {
                    method: 'post',
                    body:    form,
                    headers: form.getHeaders(),
                })
                .then(res => res.json())
                .then(json => {
                    console.log(json)
                    if (json.status === "failed") {
                        response.send(json.message)

                    } else if (json.status === "success") {
                        //return json.token;
                        token = json.token;
                        let counter = 0;
                        while (true) {
                            var req = new XMLHttpRequest();
                            req.open("GET", `${tabUrl}/result/${token}`, false);
                            req.send();


                            const data = JSON.parse(req.responseText);
                            counter++;
                            if (data.code === 202) {
                                response.send(data);
                                console.log(counter)
                                break;
                            } else if (counter === 10) {
                                response.send(`Connection lost. This is your token: ${token}! Please search for it later.`);
                            }
                        }  // end of while loop
                    }  // end of if statement for status
                })
                .catch(error => console.error(error));

            // if uploading on cloudinary fails
            } else {
                response.send("Failed to upload, try again")
            }
          }
        );  // end of cloudinary upload
    }  // end of upload photo

    let testData = (request, response) => {
        // take token
        if (token !== "") {
            //do ajax request
            var req = new XMLHttpRequest();
            req.open("GET", `${tabUrl}/result/${token}`, false);
            req.send();
            response.send(req.responseText);

            // db.receipts.getToken(token, (err, results) => {
            //     if (err) {
            //         console.error(err.message);
            //         response.status(500).send("Error getting token")
            //     } else {
            //         // do ajax request
            //         var req = new XMLHttpRequest();
            //         req.open("GET", `${tabUrl}/result/${token}`, false);
            //         req.send();

            //         response.send(req.responseText);
            //     }
            // })
        }
    }


  return {
    giveMeReceipt,
    uploadPhoto,
    testData
  };
};