const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
const handleError = require('./middleware/handleError');
const helmet = require('helmet');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const hpp = require('hpp');
const methodOverride = require('method-override');
const mongoSanitize = require('express-mongo-sanitize');
const path = require('path');
const rateLimit = require('express-rate-limit');
const { RATE_LIMIT } = require('./config/config');
const session = require('express-session');
const { SESSION_EXP, SESSION_SECRET, ISDEV } = require('./config/config');
const SessionMemory = require('memorystore')(session);
const xss = require('xss-clean');

/**
 * @desc INITIALIZE APP
 */

const app = express();
connectDB();

/** 
 * @desc  SECURITY
 */
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());
app.use(mongoSanitize());
const limiter = rateLimit({
  //windowMs: 10 * 60 * 10000, // 10 mins
  windowMs: 10 * 60 * 10,
  max: RATE_LIMIT
});
app.use(limiter);

/**
 * @desc VIEW ENGINE
 */

const {
  truncate,
  stripTags,
  formatDate,
  select
} = require('./utils/hbs');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.engine('hbs', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
  helpers: { truncate, stripTags, formatDate, select },
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

/** 
 * @desc EXPRESS MIDDLEWARE
 */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(flash());
app.use(methodOverride('_method'));
//app.use(checkResType);
app.use(session({
 secret: SESSION_SECRET,
 resave: true,
 saveUninitialized: true,
 store: new SessionMemory({
   checkPeriod: SESSION_EXP
 })
}));

/** 
 * @desc GLOBAL VARIABLES
 */

app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.user = req.user || null;
  res.locals.username = null;
  next();
}); 

if (ISDEV) {
  const logger = require('morgan');
  app.use(logger('dev'));
}

/**
 * @desc LOAD ROUTES
 */

// client
//app.use('/', require('./routes/client/indexRoutes'));

/**
 * @desc ERROR HANDLING
 */

app.use(function(req, res, next) {
  next(createError(404, 'Resource not found'))
})

app.use((error, req, res, next) => {

  return res
    .status(200)
    .render('pages/error', {
      success: false,
      title: 'error',
      status: error.status,
      msg: error.message
    });

});


/**
 * @desc EXPORT
 */

module.exports = app;