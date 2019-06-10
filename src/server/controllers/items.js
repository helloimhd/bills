module.exports = (db) => {

    let getItems = (req, res) => {
        //currently searching by receipt_id
        console.log('hello give me items from receipt', req.params.id);
        let input = req.params.id;

        db.items.getItems(input, (err, items) => {
            if (err) {
                console.error('error getting item(s)', err);
                res.status(500).send("Error getting item(s)");
            } else {
                if (items.allItems.length === 0) {
                    res.send('No Such ITEMS FROM RECEIPT ID');
                } else {
                    console.log(items.allItems)
                    res.send(items.allItems);
                }
            }
        })
    }

    let updateItems = (req, res) => {

        let input = req.body.obj;

        input.forEach((item) => {

            db.items.updateItems(item, (err, data) => {
                if (err) {
                    console.error('error updating items ', err);
                    res.status(500).send("Error updating items!");
                } else {
                    console.log('okay', data);
                }
            })
        })
    }

    //query to db( item, receipt, group,users);

    let startConfirmationQuery = (req, res) => {
        console.log('HUGE QUERY CONTROLLER');
        console.log('receipt ID', req.params.id);
        //get items
        const receipt = (err, receipt) => {

            const items = (err, items) => {

                // console.log('Done with getting ITEMS',items)
                //get group members
                const group = (err, groupId) => {

                    let groupMembers = groupId.rows;
                    let dataArray = [];
                    let completed = 0;
                    for (let i = 0; i < groupMembers.length; i++) {
                        let userId = parseInt(groupMembers[i].friend_id)
                        db.users.findUserById(userId, (err, userResults) => {
                            if (err) {
                                console.error('error getting group member(s)', err);
                                res.status(500).send("Error getting group stuff");
                            } else {
                                dataArray.push(userResults.rows[0]);
                            }
                            completed++;
                            if (groupMembers.length === completed) {
                                let obj = {
                                    receiptId: receipt.rows[0],
                                    items: items.allItems,
                                    groupMembers: groupId.rows,
                                    usersDetails: dataArray,
                                }
                                console.log('ready to send', completed);
                                res.send(obj);
                            }
                        })
                    }
                }
                db.groups.getGroupMembers(req.params.id, group)
            }
            db.items.getItems(req.params.id, items)
        }
        db.receipts.getReceiptById(req.params.id, receipt)
    }


    //  let groupMembers = groupId.rows;
    // let dataArray = [];
    // let completed = 0;
    // for (let i=0; i<groupMembers.length; i++) {
    //     let userId = parseInt(groupMembers[i].friend_id)
    //     db.users.findUserById(userId, (err, userResults) => {
    //         if (err) {
    //             console.error('error getting group member(s)', err);
    //             res.status(500).send("Error getting group stuff");
    //         } else {
    //             dataArray.push(userResults.rows[0]);
    //         }
    //         completed++;
    //         if (groupMembers.length === completed){
    //             res.send(dataArray)

    //         }
    //     })
    // }

    return {
        getItems,
        updateItems,
        startConfirmationQuery,
    };
};