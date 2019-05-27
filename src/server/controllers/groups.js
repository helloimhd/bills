module.exports = (db) => {

  let getUsersData = (req, res) => {
        // var dataIn = req.query.search;
        // console.log(dataIn)
        // if (dataIn === undefined) {
        //   dataIn = ""
        // }

        db.groups.getUsersData((err, data) =>{
            if(err){
                res.status(500).send("Error getting users");
            } else {
                if(data.length === 0){
                    res.send('No entry');
                }else{
                    res.send( {users: data} );
                }
            }
        })
    }



  let updateGroupData = (req, res) => {
        var dataIn = req.query.search;
        console.log(req.body.group)

        // db.groups.getUsersData( dataIn, (err, data) =>{
        //     if(err){
        //         res.status(500).send("Error getting users");
        //     } else {
        //         if(data.length === 0){
        //             res.send('No entry');
        //         }else{
        //             res.send( {users: data} );
        //         }
        //     }
        // })
    }

  return {
    getUsersData,
    updateGroupData,
  };
};