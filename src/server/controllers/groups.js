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

    let giveMeGroupMembers = ( req, res ) =>{
        // console.log('hello group controllers')
        let input = req.params.id;
        let userIdsArr = [];
        db.groups.getGroupMembers( input, (err, grpMembersId) =>{
            if(err){
                console.error('error getting group member(s)', err);
                res.status(500).send("Error getting group stuff");
            } else {
                if(grpMembersId.rows.length === 0 ){
                    res.send('No group members here');
                } else {

                    for(let i = 0; i < grpMembersId.rows.length; i++){
                        userIdsArr.push(grpMembersId.rows[i].friend_id);
                    }
                    //send  request to users model to get user details. Should i send onces and build an extend string in models? or keep sending depending on how many big my array is.
                    db.users.getUsersDetails(userIdsArr, (err, userInfo)=>{
                        if(err){
                            console.error('error getting group member(s)', err);
                            res.status(500).send("Error getting group stuff");
                        } else {
                            // console.log('HELLOOOOO RETURN INFOO!')
                            // console.log(userInfo);
                            res.send( userInfo );
                        }
                    })
                    // console.log('BACK at GROUP Controllers', userIdsArr); // get the group members id. need to get their user details;
                }
            }
        })
    }

  return {
    getUsersData,
    updateGroupData,
    giveMeGroupMembers,
  };