/**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPI) => {
    // `dbPI` is accessible within this function scope
    const findByUsername = (username, callback) => {
        const userQuery = `SELECT * FROM users WHERE username = '${username}'`;

        dbPI.query(userQuery, (err, results) => {
            callback(err, results);
        })
    }

  return {
    findByUsername
  };
};