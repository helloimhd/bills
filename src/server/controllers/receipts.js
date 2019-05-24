var cloudinary = require('cloudinary').v2;

const fetch = require('node-fetch');
const fs = require('fs');
const FormData = require('form-data');
var requestPackage = require('request');

cloudinary.config({
  cloud_name: 'difceofnn',
  api_key: '138163593634117',
  api_secret: 'UQBGNsgKzLZDlijgj-t1Tx6Sm84'
});

module.exports = (db) => {

    let giveMeReceipt = ( req, res ) =>{

        //can use http path or ajax put in body
        // edit argument as necessary
        // console.log('hello give receipt', req.params.id);
        let input = req.params.id;

        db.receipts.getReceipt( input, (err, receipts) =>{
            if(err){
                console.error('error getting receipt(s)', err);
                res.status(500).send("Error getting receipt");
            } else {
                // console.log( 'AT CONTROLLER RESULTS', receipts );
                if(receipts.receipt.length === 0){
                    res.send('No entry');
                }else{
                    res.send( receipts.receipt );
                }
            }
        })
    };

    // upload photo to cloudinary and send it to tabscanner
    let uploadPhoto = (request, response) => {
        //response.send("ajksdakjsd")
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

                fetch('https://api.tabscanner.com/VCB56Md7G1imsKz6Y3FKmcNiBXNmBaClTSpyT55ciRZLTdWDKRD06iBQx4JvoSpr/process', {
                    method: 'post',
                    body:    form,
                    headers: form.getHeaders(),
                })
                .then(res => res.json())
                .then(json => response.send(json))
                .catch(error => console.error(error));

            // if uploading on cloudinary fails
            } else {
                response.send("Failed to upload, try again")
            }
          }
        );  // end of cloudinary upload

    }  // end of upload photo

    let summaryReceipt = (req, res) => {
        console.log("HELLO in controller");
        var dataIn = req.params.id;

        db.receipts.yo( dataIn, (err, receipts) =>{
            if(err){
                console.log('in here?');
                console.error('error getting receipt(s)', err);
                res.status(500).send("Error getting receipt");
            } else {
                console.log('am i here????');
                console.log( 'AT CONTROLLER RESULTS', receipts );
                if(receipts.rows.length === 0){
                    res.send('No entry');
                }else{
                    res.send( receipts.rows );
                }
            }
        })
    }

  return {
    giveMeReceipt,
    uploadPhoto,
    summaryReceipt,

  };
};