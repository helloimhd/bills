module.exports = (db) => {

    let getItems = ( req, res ) => {
        //currently searching by receipt_id
        console.log('hello give me items from receipt', req.params.id);
        let input = req.params.id;

        db.items.getItems( input, (err, items) =>{
            if(err){
                console.error('error getting item(s)', err);
                res.status(500).send("Error getting item(s)");
            }else{
                if(items.allItems.length === 0){
                    res.send('No Such ITEMS FROM RECEIPT ID');
                }else{
                  console.log(items.allItems)
                    res.send( items.allItems );
                }
            }
        })
    }

    let updateItems = ( req, res )=>{

        let input = req.body.obj;

        input.forEach((item)=>{

            db.items.updateItems(item, (err,data)=>{
                if(err){
                    console.error('error updating items ', err);
                    res.status(500).send("Error updating items!");
                } else {
                    console.log('okay', data);
                }
            })
        })
    }


  return {
    getItems,
    updateItems,
  };
};