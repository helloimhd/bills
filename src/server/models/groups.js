/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {

  let getUsersData = (data, callback) => {
        let query = `SELECT * FROM users WHERE username ILIKE '%${data}%';`
        dbPoolInstance.query(query, (err, r) => {
            if(err){
                callback( err, null)
            } else {
                callback(null, r.rows);
            }
        })
    }



  return {
    getUsersData,
  };
};