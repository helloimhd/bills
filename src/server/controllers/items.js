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
                    res.send( items.allItems );
                }
            }
        })
    }

  return {
    getItems,
  };
};