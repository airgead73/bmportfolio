const connectDB = require('./config/db');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const createError = require('http-errors');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const Handlebars = require('handlebars');
//const handleError = require('./middleware/handleError');
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
//const checkResType = require('./middleware/checkResType');
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
  windowMs: 10 * 60 * 1000, // 10 mins
  max: RATE_LIMIT
});
app.use(limiter);

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

module.exports = app;