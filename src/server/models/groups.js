/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let getUsersData = (callback) => {
        // let query = `SELECT * FROM users WHERE username ILIKE '%${data}%';`
        let query = `SELECT * FROM users;`
        dbPoolInstance.query(query, (err, r) => {
            if(err){
                callback( err, null)
            } else {
                callback(null, r.rows);
            }
        })
    }

  let updateGroupData = (data, callback) => {

        // let query = `INSERT INTO groups
        //             (receipt_id, friend_id, amount)
        //             VALUES
        //             ($1, $2, $3);`

        // let values;

        // for (i=0; i<data.length; i++) {
        //   values = values + `(${data.receiptId}, ${data.friendId}, null)`
        // }

        // dbPoolInstance.query(query, values, (err, r) => {
        //     if(err){
        //         callback( err, null)
        //     } else {
        //         callback(null, r.rows);
        //     }
        // })
    }


    let getGroupMembers = ( dataIn, callback ) =>{
        //take in receipt ID
        let query = `SELECT * from groups where receipt_id = ${dataIn}`;

        dbPI.query( query, (err, r)=>{
            callback(err, r );
        })
    }

  return {
    getUsersData,
    updateGroupData,
    getGroupMembers,
  };