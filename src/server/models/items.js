/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPI) => {
    // `dbPI` is accessible within this function scope

    //create items for a receipt entry
    let createItems = ( dataIn, callback ) => {

        let queryInsert =   `INSERT INTO items
                            (receipt_id, item_name, price, quantity, users_id)
                            VALUES ($1, $2, $3, $4, $5)
                            RETURNING *`;
        let valuesInsert = [ dataIn.receipt_id, dataIn.item_name, dataIn.price, dataIn.quantity, dataIn.users_id ];

        dbPI.query( queryInsert, valuesInsert, (err,r) =>{
            callback( err, r );
        })
    }

    //get all items from specifc receipt
    let getItems = ( dataIn, callback ) =>{

        // edit dataIn from controller or here as required.
        let query = `SELECT * FROM items WHERE receipt_id = ${dataIn}`;

        dbPI.query( query, (err,r)=>{
            if(err){
                callback(err,null)
            }else{
                const result =  {
                                allItems : r.rows,
                                }
                callback( null, result );
            }
        })
    }


  return {
    createItems,
    getItems,
  };
};