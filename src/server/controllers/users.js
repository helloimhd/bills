module.exports = (db) => {

    // let login = (request, response) => {
    //     response.send(request.body)
    // }

    let userByUsername = (request, response) => {
        console.log(request.params);
        let username = request.params.username;
        db.users.findByUsername(username, (err, results) => {
            if (err) {
                console.log(err.message)
                response.status(500).send("Query ERROR getting user.");
            } else {
                response.send(results)
            }
        })

    }

  return {
    //login,
    userByUsername
  };
};