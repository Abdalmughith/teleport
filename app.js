const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
require('dotenv').config()
// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Require our routes into the application.
require('./routes')(app);

// Setup a default catch-all route that sends back a welcome message in JSON format.
app.get('*', (req, res) => res.status(404).send({
    message: 'NotFound'
}));

module.exports = app;