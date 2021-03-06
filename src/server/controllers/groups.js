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
        console.log('UPDATE GROUP DATA CONTROLLER');
        console.log(req.body);
        let dataIn = req.body.obj;
        let receiptId = req.body.receipt_id;

        db.groups.updateGroupData( dataIn, receiptId, (err,data)=>{
            if(err){
                console.error('error updating group entry', err);
                res.status(500).send("Error updating groups");
            } else {
                res.send(data);
            }
        })
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

    let involvedInReceipt = ( req, res ) =>{
        console.log('hello group controllers')
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
                    //res.send(grpMembersId.rows)
                    console.log("group table", grpMembersId.rows);
                    let groupMembers = grpMembersId.rows;
                    let dataArray = [];
                    let completed = 0;
                    for (let i=0; i<groupMembers.length; i++) {
                        let userId = parseInt(groupMembers[i].friend_id)
                        db.users.findUserById(userId, (err, userResults) => {
                            if (err) {
                                console.error('error getting group member(s)', err);
                                res.status(500).send("Error getting group stuff");
                            } else {
                                dataArray.push(userResults.rows[0]);
                            }
                            completed++;
                            if (groupMembers.length === completed){
                                res.send(dataArray)

                            }
                        })
                    }
                }
            }
        })
    }

    let userIdSummaryReceipt = ( req, res ) =>{
        console.log('hello group controllers')
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

    let updateIndvPay = (req, res) => {

        let dataIn = req.body.obj;

        let completed = 0;
        console.log('LENGHT', dataIn.length);
        for(let i=0; i<dataIn.length; i++){
            let amount = dataIn[i].amount;
            let id = dataIn[i].userId;
            let receiptId = dataIn[i].receiptId;

            console.log(typeof amount);
            console.log(typeof id);
            console.log(typeof receiptId);
            db.groups.updateGroupAmount( amount, id, receiptId, (err,data)=>{
                if(err){
                    console.error('error updating amount entry', err);
                    res.status(500).send("Error updating groups");
                } else {
                    console.log('okay', data);
                }
            })
        }
    }


  return {
    getUsersData,
    updateGroupData,
    giveMeGroupMembers,
    involvedInReceipt,
    userIdSummaryReceipt,
    updateIndvPay,
  };
};