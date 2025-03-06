    var express = require('express');
    var path = require('path');
    var cookieParser = require('cookie-parser');
    var logger = require('morgan');

    var indexRouter = require('./src/routes/index');
    var usersRouter = require('./src/routes/users');
    var loginRouter = require('./src/routes/login');
    var flatsRouter = require('./src/routes/flats');
    var houseRouter = require('./src/routes/house');
    var userRouter = require('./src/routes/user');
    var appointmentsRouter = require('./src/routes/appointment');

    const { initMongoConnect } = require('./src/db/util.service.db');

    var app = express();

    const cors = require('cors');

    app.use(cors({
        origin: '*', // Erlaubt alle Ursprünge
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
    app.use('/appointments', appointmentsRouter);

    initMongoConnect()

    module.exports = app;
