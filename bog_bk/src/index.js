const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override');
const sortMiddleware = require('./app/middlewares/sortMiddleware');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

const route = require('./routes');
const db = require('./config/db');

// connect to db
db.connect();

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

//user cookie-parser middle
app.use(cookieParser());

// override method api
app.use(methodOverride('_method'));

//custom middleware
app.use(sortMiddleware);

// http logger
app.use(morgan('combined'));

// template engine
// config
app.engine(
    'handlebars',
    handlebars.engine({
        helpers: require('./helpers/handlebars'),
    }),
);

app.set('view engine', 'handlebars');

app.set('views', path.join(__dirname, 'resources', 'views'));
console.log(__dirname);

// route init
route(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
