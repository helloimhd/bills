module.exports = (db) => {

    let test = ( req, res) =>{
        res.send('HELLO');
    }

  return {
    test,
  };
};