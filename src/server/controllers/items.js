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

    //query to db( item, receipt, group);

    let startConfirmationQuery = (req, res) => {
        console.log('HUGE QUERY CONTROLLER');
        console.log('receipt ID', req.params.id);
        //get items
        const items = (err, items) => {

            // console.log('Done with getting ITEMS',items)
            //get group members
            const group = (err, groupId) => {

                // console.log('Done with getting Group members', groupId.rows)
                let obj = {
                    receiptId: req.params.id,
                    items: items.allItems,
                    groupMembers: groupId.rows,
                }

                res.send(obj)
            }
            db.groups.getGroupMembers(req.params.id, group)
        }
        db.items.getItems(req.params.id, items)
    }


    return {
        getItems,
        updateItems,
        startConfirmationQuery,
    };
};