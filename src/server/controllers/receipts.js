module.exports = (db) => {

    let giveMeReceipt = ( req, res ) =>{

        //can use http path or ajax put in body
        // edit argument as necessary
        console.log('hello give receipt', req.params.id);
        let input = req.params.id;

        db.receipts.getReceipt( input, (err, receipts) =>{
            if(err){
                console.error('error getting receipt(s)', err);
                res.status(500).send("Error getting receipt");
            } else {
                console.log( 'AT CONTROLLER RESULTS', receipts );
                if(receipts.receipt.length === 0){
                    res.send('No entry');
                }else{
                    res.send( receipts.receipt );
                }
            }
        })
    }

  return {
    giveMeReceipt,
  };
};