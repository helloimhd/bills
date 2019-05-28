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
    let getUsersDetails = ( dataIn, callback )=>{

        let idArr = dataIn;
        let startQuery =    "SELECT groups.friend_id, users. * from groups inner join users on (groups.friend_id = users.id) where users.id = ";
        let queryString = "";

        let query = dataIn.forEach((item)=>{

            let makeString = startQuery + item + "; ";
            queryString = queryString + makeString;
        })

        queryString = queryString + ";";

        dbPI.query( queryString, (err,r)=>{

            let callbackArr = [];

            let returnCallback = r.forEach((result)=>{
                callbackArr.push(result.rows);

            })
            callback(err, callbackArr);
        })
    }

    let findUserById = (userId, callback) => {
        let findQuery = `SELECT * FROM users WHERE id = '${userId}'`;

        dbPI.query(findQuery, (err, results) => {
            callback(err, results);
        })
    }


    return {
      findByUsername,
      createUser,
      getUsersDetails,
      findUserById
    };
};