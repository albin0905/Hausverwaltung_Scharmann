var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var flatsRouter = require('./routes/flats');
var houseRouter = require('./routes/house');
var userRouter = require('./routes/user');

const { initMongoConnect } = require('./db/login');

var app = express();

const cors = require('cors');

app.use(cors({
    origin: '*', // Erlaubt alle Urspr�nge
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/flats', flatsRouter);
app.use('/houses',houseRouter);
app.use('/user',userRouter);

initMongoConnect()
    .then(() => console.log('Erfolgreich mit der Datenbank verbunden'))
    .catch(err => console.error('Fehler bei der Datenbankverbindung:', err));

module.exports = app;
