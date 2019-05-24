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

const token = "";

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

    // upload photo to cloudinary > send to tabscanner > get token > send to get data
    let uploadPhoto = (request, response) => {
        console.log("Uploading up to cloudinary")
        let file = request.file.path;

        let url = "";
        let publicId = "";

        // uploading to cloudinary
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

                // send photo to tab scanner
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

                            // successful
                            if (data.code === 202) {
                                // put data into receipt table
                                let receiptData = {
                                    token: token,
                                    subtotal: parseFloat(data.result.subTotal)
                                }
                                db.receipts.addReceipt(receiptData, (err, results) => {
                                    if (err) {
                                        console.error(err);
                                        response.status(500).send("Query ERROR for adding receipt details.")

                                    } else {
                                        // means its successful > get receipt id that was uploaded to put inside the items table
                                        db.receipts.getReceipt((err, results) => {
                                            if (err) {
                                                console.error(err);
                                                response.status(500).send("Query ERROR for getting receipt info.")

                                            } else {
                                                // now add items into table

                                            }
                                        })

                                    }
                                })
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


    const testData = (request, response) => {
        let testToken = 'gj3QhsVlE6093LmB';

        var req = new XMLHttpRequest();
        req.open("GET", `${tabUrl}/result/${testToken}`, false);
        req.send();

        const data = JSON.parse(req.responseText);
        const dataResult = data.result;

        let receiptData = {
            user_id: 1,
            group_id: 1,
            img_token: testToken,
            subtotal: parseFloat(dataResult.subTotal)
        }
        db.receipts.createReceipt(receiptData, (err, createRecResults) => {
            if (err) {
                console.error(err);
                response.status(500).send("Query ERROR for adding receipt details.")

            } else {
                // means its successful > get receipt id that was uploaded to put inside the items table
                db.receipts.getReceipt(testToken, (err, getReceiptResults) => {
                    //console.log(testToken)
                    if (err) {
                        console.error(err);
                        response.status(500).send("Query ERROR for getting receipt info.")

                    } else {
                        console.log("get receipt is successful")
                        let lineItems = dataResult.lineItems;
                        for (i=0; i<lineItems.length; i++) {
                            console.log("entered for loop")
                            let receiptId = getReceiptResults.receipt[0].id;

                            // items
                            let itemData = {
                                receipt_id: receiptId,
                                item_name: lineItems[i].descClean,
                                price: parseFloat(lineItems[i].lineTotal),
                                quantity: lineItems[i].qty,
                                users_id: null
                            }
                            // now add items into table
                            db.items.createItems(itemData, (err, createItemResults) => {
                                if (err) {
                                    console.error(err);
                                    response.status(500).send("Query ERROR for creating items.")
                                } else {
                                    // yey all successful
                                    response.send("ALL DONE")
                                }

                            })  //end of db createItems
                        }  // end of for loop

                    }  //end of checking for getReceipt query
                })  //end of db getReceipt
            }  //end of checking for createReceipt query
        })  //end of db createReceipt
    }

  return {
    giveMeReceipt,
    uploadPhoto,
    testData
  };
};