const sha256 = require('js-sha256');
const SALT = sha256("boss");

module.exports = (db) => {

    let checkUser = (request, response) => {
        console.log(request.body);
        let username = request.body.username;
        let password = request.body.password;

        // find user by username
        db.users.findByUsername(username, (err, results) => {
            if (err) {
                console.log(err.message);
                response.status(500).send("Query ERROR getting user.");

            } else {
                //console.log(results)
                // check if user is valid
                if (results.rowCount === 0) {
                    response.send({data: null})

                // if user is valid, check if password is correct
                } else {
                    let shaPw = sha256(password + SALT);
                    if (results.rows[0].password === shaPw) {
                        // set cookie
                        response.cookie("userId", results.rows[0].id)
                        response.cookie("username", sha256(results.rows[0].username + SALT))
                        response.send({data: true})

                    // password is wrong
                    } else {
                        response.send({data: false})
                    }
                }
            }  // end of query check
        })  // end of finding user with db
    }  // end of check user


    let register = (request, response) => {
        console.log(request.body)
        let username = request.body.username;

        // check if user already in database
        db.users.findByUsername(username, (err, results) => {
            if (err) {
                console.error(err);
                response.status(500).send("Query ERROR getting user.");

            } else {
                if (results.rowCount !== 0) {
                    response.send({status: "duplicate"})

                } else {
                    // insert into database
                    db.users.createUser(request.body, (err, createResults) => {
                        if (err) {
                            console.error(err);
                            response.status(500).send("Query ERROR inserting users.");

                        } else {
                            response.send({status: "created"})
                        }
                    })  // end of creating user
                }
            }
        })  // end of find by username

    }

  return {
    checkUser,
    register
  };
};