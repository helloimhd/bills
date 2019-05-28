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

    app.get('/checkCookie', users.checkCookie);


    ////////  USERS  /////////
   // app.post('/login', users.login);
    app.post('/checkUser', users.checkUser);
    app.post('/register', users.register);


    ////////  RECEIPTS  ////////////
    //app.get('/takePhoto', receipts.takePhoto);
    app.post('/uploadPhoto', upload.single('img'), receipts.uploadPhoto);
    app.get('/testItemName', receipts.testItemName);
    app.get('/getUserReceipts', receipts.getUserReceipts);

    app.get('/receipt/:id', receipts.giveMeReceipt);
    app.get('/items/:id', items.getItems);
    // app.get('/group/:id', groups.giveMeGroupMembers);

    app.post('/update/receipt', receipts.updateReceipt);

    // Splitting items path
    app.get('/group/:id', groups.involvedInReceipt)

    // Id is the receipt id
    app.get('/summary/:id', receipts.summaryReceipt);

    app.get('/summary/user/:id', receipts.usersSummaryReceipt);

    app.get('/receipt/:id/items', receipts.giveMeReceipt);

    app.get('/search/group', groups.getUsersData); // gets all users
    app.post('/selected/group', groups.updateGroupData); // add new group & create new receipt
};