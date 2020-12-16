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
//const { RATE_LIMIT } = require('./config/config');
const session = require('express-session');
const { ISDEV } = require('./config/config');
const SessionMemory = require('memorystore')(session);
//const checkResType = require('./middleware/checkResType');
const xss = require('xss-clean');

/**
 * @desc INITIALIZE APP
 */

const app = express();
connectDB();

module.exports = app;