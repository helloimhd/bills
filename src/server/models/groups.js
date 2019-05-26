/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPI) => {
    // `dbPI` is accessible within this function scope
    let getGroupMembers = ( dataIn, callback ) =>{
        //take in receipt ID
        let query = `SELECT * from groups where receipt_id = ${dataIn}`;

        dbPI.query( query, (err, r)=>{
            callback(err, r );
        })
    }
    return {
        getGroupMembers,
    };
};