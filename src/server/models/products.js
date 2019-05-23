    /**
 * ===========================================
 * Export model functions as a module
 * ===========================================
 */
module.exports = (dbPoolInstance) => {
  // `dbPoolInstance` is accessible within this function scope

  let getAll = (callback) => {
    dbPoolInstance.query('SELECT * from products', (error, queryResult) => {
      if (error) {
        // invoke callback function with results after query has executed
        callback(error, null);
      } else {
        // invoke callback function with results after query has executed

        callback(null, queryResult.rows );
      }
    });
  };

  let indvProduct = (id, callback) => {
        //console.log(id);
        const indvProductQuery = `SELECT * FROM products WHERE id = ${id}`;

        dbPoolInstance.query(indvProductQuery, (err, results) => {
            callback(err, results);
        })
    }

  return {
    getAll,
    indvProduct
  };
};