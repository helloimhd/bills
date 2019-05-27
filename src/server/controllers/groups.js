module.exports = (db) => {

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

    let involvedInReceipt = ( req, res ) =>{
        // console.log('hello group controllers')
        let input = req.params.id;
        console.log(input)
        console.log("MERMMBEMMMERRERERERSSS")
        db.groups.getGroupMembers( input, (err, grpMembersId) =>{
            if(err){
                console.error('error getting group member(s)', err);
                res.status(500).send("Error getting group stuff");
            } else {
                if(grpMembersId.rows.length === 0 ){
                    res.send('No group members here');
                } else {
                    // console.log(grpMembersId.rows)
                    // console.log('BEFORE RESPONSENENENE')
                    res.send(grpMembersId.rows)
                }
            }
        })
    }

    return {
        giveMeGroupMembers,
        involvedInReceipt,
    };
};