const http = require('http');
const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const db = require('./db');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
process.env.PORT = process.env.PORT || 80;

function onUnhandledError(err) {
  console.log('ERROR:', err);
  process.exit(1);
}

process.on('unhandledRejection', onUnhandledError);
process.on('uncaughtException', onUnhandledError);

const setupAppRoutes =
  process.env.NODE_ENV === 'development' ? require('./middlewares/development') : require('./middlewares/production');

const app = express();

app.set('env', process.env.NODE_ENV);


// Set up middleware
app.use(methodOverride('_method'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use(cookieParser());

// app.use(bodyParser.json({limit: '10mb', extended: true}))
// app.use(
//   express.urlencoded({
//     extended: true
//   })
// );

// Set react-views to be the default view engine
const reactEngine = require('express-react-views').createEngine();
app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', reactEngine);

require('./routes')(app, db);

// application routes (this goes last)
setupAppRoutes(app);

http.createServer(app).listen(process.env.PORT, () => {
  console.log(`HTTP server is now running on http://localhost:${process.env.PORT}`);
});