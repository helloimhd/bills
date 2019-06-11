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
                let obj = {
                    receiptId: receipt.rows[0],
                    items: items.allItems,
                    // groupMembers: groupId.rows,
                    // usersDetails: dataArray,
                }
                console.log('ready to send', obj);
                res.send(obj);
            }
            // })
            db.items.getItems(req.params.id, items)
        }
        db.receipts.getReceiptById(req.params.id, receipt)
    }

    let endConfirmationQuery = (req, res) => {
        console.log('In the controller', req.body);
        const receipt = (err, receipt) => {
            const items = (err, items) => {
                console.log('UPDATED ITEMS!');
                const group = (err, group) => {
                    console.log('UPDATED GROUP AMOUNTS!');
                }
                db.groups.bigDaddyGroupUpdate(req.body.group, group)
            }
            db.items.bidDaddyUpdateItem(req.body.items, items)
        }
        db.receipts.updateReceipt(req.body, receipt);
    }

    return {
        getItems,
        updateItems,
        startConfirmationQuery,
        endConfirmationQuery,
    };
};