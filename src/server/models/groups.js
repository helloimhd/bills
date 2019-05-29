/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */

module.exports = (dbPI) => {

  let getUsersData = (callback) => {
        // let query = `SELECT * FROM users WHERE username ILIKE '%${data}%';`
        let query = `SELECT * FROM users;`
        dbPI.query(query, (err, r) => {
            if(err){
                callback( err, null)
            } else {
                callback(null, r.rows);
            }
        })
    }

    let updateGroupData = (data, receiptId, callback) => {

        console.log('INSIDE MODELS', data)

        let query = `INSERT INTO groups (receipt_id, friend_id, amount) VALUES `;
        //////NEED RECEIPT INFO SOMEHWERWE
        ////GIVING DEFAULT VALUE FIRST
        let values="";

        for (i=0; i<data.length; i++) {
          values = values + `(${receiptId}, ${data[i]}, 0),` // can add more column variables here
        }

        query = query + values.slice(0,values.length-1);
        console.log('QUERYYYYY', query);
        dbPI.query(query,(err, r) => {
            if(err){
                callback( err, null)
            } else {
                callback(null, r.rows);
            }
        })
    }


    let getGroupMembers = ( dataIn, callback ) =>{
        //take in receipt ID
        let query = `SELECT * from groups where receipt_id = ${dataIn}`;

        dbPI.query( query, (err, r)=>{
            callback(err, r );
        })
    }

    let getUserGroups = (userId, callback) => {
        let getQuery = `SELECT receipt_id, friend_id, SUM(amount)
                        FROM groups
                        WHERE friend_id = '${userId}'
                        GROUP BY receipt_id, friend_id`;

        dbPI.query(getQuery, (err, results) => {
            callback(err, results);
        })
    }

    let indvGroupInfo = (info, callback) => {
        const receiptId = info.receiptId;
        const userId = info.userId;
        let getQuery = `SELECT SUM(amount) from groups WHERE receipt_id = '${receiptId}' AND friend_id = '${userId}'`

        dbPI.query(getQuery, (err, results) => {
            callback(err, results);
        })
    }

    let updateGroupAmount = (data, friend_id, receipt_id, callback) => {

        console.log('INSIDE MODELS', data)

        let query = `UPDATE groups set amount = ${data} where friend_id = ${friend_id} AND receipt_id = ${receipt_id} `;
        dbPI.query(query,(err, r) => {
            callback(err, r);
        })
    }

  return {
    getUsersData,
    updateGroupData,
    getGroupMembers,
    indvGroupInfo,
    getUserGroups,
    updateGroupAmount,
  };
};