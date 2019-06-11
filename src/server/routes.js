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


    ////////  USERS  /////////
   // app.post('/login', users.login);
    app.post('/checkUser', users.checkUser);
    app.post('/register', users.register);


    ////////  RECEIPTS  ////////////
    //app.get('/takePhoto', receipts.takePhoto);
    app.post('/uploadPhoto', upload.single('img'), receipts.uploadPhoto);
    app.get('/getUserReceipts', receipts.getUserReceipts);

    app.get('/receipt/:id', receipts.giveMeReceipt);
    app.get('/items/:id', items.getItems);
    // app.get('/group/:id', groups.giveMeGroupMembers);

    app.post('/update/receipt', receipts.updateReceipt);
    app.post('/update/items', items.updateItems);

    // Splitting items path
    app.get('/group/:id', groups.involvedInReceipt)
    app.get('/groupSummary/:id', groups.userIdSummaryReceipt)

    // Id is the receipt id
    app.get('/summary/:id', receipts.summaryReceipt);

    app.get('/summary/user/:id', receipts.usersSummaryReceipt);
    // app.get('/foobar/:id', receipts.getUsername);
    app.get('/receipt/:id/items', receipts.giveMeReceipt);
    app.get('/search/group', groups.getUsersData);
    app.post('/selected/group', groups.updateGroupData);

    ////SAVE AMOUNT FOR EACH PERSON
    app.post(`/save/group`, groups.updateIndvPay);


    //******************//
    //******************//
    //******************//

    //get items, receipt and group
    //using items controller....because its the least cluttered...
    app.get(`/massiveLoad/:id`, items.startConfirmationQuery);

    // SAVE EVERYTHING
    app.post(`/end`, items.endConfirmationQuery);



};