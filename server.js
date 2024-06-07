'use strict';
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const port = process.env.PORT || 3500;

const helmet = require('helmet');
app.use(helmet.referrerPolicy({ policy: 'strict-origin-when-cross-origin' }));
//This sets the 'connect-src' policy to allow connections to the same origin('self') and 'http://localhost:3500'.
// Add 'http://localhost:3500' to the connect-src directive in the Content-Security-Policy header
app.use((req, res, next) => {
    if (!res.getHeader("Content-Security-Policy")) {
        res.setHeader("Content-Security-Policy", "connect-src 'self' http://localhost:3500");
        next();
    }
    else {
        next();
    }
});

// customed middleware logger
app.use(logger);

// Cross origin resource sharing and Enable All CORS Requests
app.use(cors(corsOptions));
// build-in middleware to handle urlencoded from data
app.use(express.urlencoded({ extended: false }));
// build-in middleware from json data
app.use(express.json());
// Serve static files
app.use('/', express.static(path.join(__dirname, '/public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/employees', require('./routes/api/employees'));

app.all(`*`, (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, `views`, `404.html`));
    } else if (req.accepts('json')) {
        res.json({ error: `404 Not Found` });
    }
    else {
        res.type('txt').send(`404 Not Found`);
    }
});

app.use(errorHandler);

app.listen(port, () => {
    console.log('Server started on http://localhost:' + port);
});


