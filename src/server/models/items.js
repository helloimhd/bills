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
                            (receipt_id, item_name, price, users_id)
                            VALUES ($1, $2, $3, $4)
                            RETURNING *`;
        let valuesInsert = [ dataIn.receipt_id, dataIn.item_name, dataIn.price, dataIn.users_id ];

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

     let updateItems = (dataIn, callback)=>{

        let query = `UPDATE items set item_name = ($1), price = ($2), users_id = ($3) where id = ${dataIn.id}`

        //let valuesUpdate = [ dataIn.item_name, dataIn.price, dataIn.quantity, dataIn.users_id]
        let valuesUpdate = [ dataIn.item_name, dataIn.price, dataIn.users_id]

        dbPI.query( query, valuesUpdate, (err,r)=>{
            if(err){
                callback( err, null)
            } else {
                callback(null, 'SUCCESS');
            }
        });
    }


    let bidDaddyUpdateItem = (dataIn, callback)=>{

        // console.log('ITEMS INSIDE MODEL', dataIn)
        // console.log('NUMBER OF ITEMS', dataIn.length)
        for(let i = 0 ; i < dataIn.length ; i ++){

            let query = `UPDATE items set item_name = ($1), price = ($2), users_id = ($3) where id = ${dataIn[i].id}`

            //let valuesUpdate = [ dataIn.item_name, dataIn.price, dataIn.quantity, dataIn.users_id]
            let valuesUpdate = [ dataIn[i].item_name, dataIn[i].price, dataIn[i].users_id]

            dbPI.query( query, valuesUpdate, (err,r)=>{
               callback(err,r)
            });
        }
    }

  return {
    createItems,
    getItems,
    updateItems,
    bidDaddyUpdateItem,
  };
};