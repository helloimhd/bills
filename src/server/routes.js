// MULTER
const multer = require('multer')
var upload = multer({ dest: 'uploads/' })
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function(req, file, cb) {
    console.log(file)
    cb(null, file.originalname)
  }
})

module.exports = (app, db) => {

    const users = require('./controllers/users')(db);
    const receipts = require('./controllers/receipts')(db);
    const items = require('./controllers/items')(db);
    const groups = require('./controllers/groups')(db);


    // app.get('/', receipts.test);

    app.get('/test/:id', receipts.giveMeReceipt);

    app.get('/testmore/:id', items.getItems);
    // app.get('/products', products.getAll);


    ////////  RECEIPTS  ////////////
    //app.get('/takePhoto', receipts.takePhoto);
    app.post('/uploadPhoto', upload.single('img'), receipts.uploadPhoto)


};