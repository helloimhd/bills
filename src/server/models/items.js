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

        // select receipts.id, items.*
        // from receipts inner join items
        // on (receipts.id = items.receipt_id)
        // where items.receipt_id = 1;
        // THIS RETURNS ITEMS TABLE WITH RESPECTIVE RECEIPT ID
        // CHANGE "where items.receipt.id" to be dynamic

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

     let updateItems = (dataIn, callback)=>{

        let query = `UPDATE items set item_name = ($1), price = ($2), quantity = ($3), users_id = ($4) where id = ${dataIn.id}`

        let valuesUpdate = [ dataIn.item_name, dataIn.price, dataIn.quantity, dataIn.users_id]

        dbPI.query( query, valuesUpdate, (err,r)=>{
            if(err){
                callback( err, null)
            } else {
                callback(null, 'SUCCESS');
            }
        });
    }

  return {
    createItems,
    getItems,
    updateItems,
  };
};