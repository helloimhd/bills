module.exports = (app, db) => {
  const users = require('./controllers/users')(db);
  const receipts = require('./controllers/receipts')(db);
  const items = require('./controllers/items')(db);
  const groups = require('./controllers/groups')(db);


  // app.get('/', receipts.test);


  // app.get('/products', products.getAll);
};