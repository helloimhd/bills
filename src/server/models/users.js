const sha256 = require('js-sha256');
const SALT = sha256("boss");
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

    const createUser = (data, callback) => {
        let shaPw = sha256(data.password + SALT);
        const insertQuery = `INSERT INTO users (username, password, email)
                             VALUES ($1, $2, $3) RETURNING ID`;

        const values = [data.username, shaPw, data.email];

        dbPI.query(insertQuery, values, (err, results) => {
            callback(err, results);
        })

    }
  return {
    findByUsername,
    createUser
  };
};