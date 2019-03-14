const express = require('express');
var app = express();
const bp = require('body-parser');
const port = 8000;
const path = require('path');
const mongoose = require('mongoose');

app.use(express.static(path.join(__dirname, './static')));
app.use(bp.urlencoded({extended: true}));
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.Promise = global.Promise;

app.listen(port, function() {});

require('./server/config/routes.js')(app);