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


    ////////  USERS  //////////
   // app.post('/login', users.login);
    app.get('/users/:username', users.userByUsername)


    ////////  RECEIPTS  ////////////
    //app.get('/takePhoto', receipts.takePhoto);
    app.post('/uploadPhoto', upload.single('img'), receipts.uploadPhoto);
    app.get('/testItemName', receipts.testItemName);

    app.get('/receipt/:id', receipts.giveMeReceipt);

    // Id is the receipt id
    app.get('/summary/:id', receipts.summaryReceipt);

    app.get('/receipt/:id/items', receipts.giveMeReceipt);

    app.get('/items/:id', items.getItems);





};