/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPI) => {
  // `dbPI` is accessible within this function scope

  // create receipt entry
    let createReceipt = ( dataIn, callback ) => {

        let queryInsert =   `INSERT INTO receipts
                            (user_id, group_id, img_token, subtotal)
                            VALUES ($1, $2, $3, $4)
                            RETURNING *`;

        let valuesInsert = [ dataIn.user_id, dataIn.group_id, dataIn.img_token, dataIn.subtotal ];

        dbPI.query( queryInsert, valuesInsert, (err, r) =>{
            // if(err){
            //     callback(err, null);
            // } else {
            //     callback(null, r);
            // };
            callback( err, r );
        });
    };

  // get specific receipt with token
    let getReceipt = (dataIn, callback) =>{

        // console.log( 'INSIDE MODELS', dataIn );
        let query = `SELECT * FROM receipts WHERE img_token = '${dataIn}'`;

        dbPI.query( query, (err,r)=>{
            if(err){
                // console.log('Error here?');
                callback( err, null)
            }else{
                // console.log('Something here?');
                const result = {
                                receipt : r.rows,
                                };
                callback( null, result );
            }
        })
    };

  // update

  // destroy




  return {
    createReceipt,
    getReceipt,
  };
};