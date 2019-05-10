/* eslint-disable no-console */

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const logger = require('morgan');


const dbConnection = require('./auth/db');
const index = require('./routes/index');
const apiRouter = require('./routes/api');


dbConnection();

const app = express();

app.use(logger('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../client/public')));
app.use(express.static(path.join(__dirname, '../client/distr')));
app.use('/', index);

/* app.use((req, res, next) => {
	if (['POST', 'PUT'].indexOf(req.method) !== -1 || Object.keys(req.body).length) {
		const result = true;
		if (result) {
			next();
		} else {
			const err = new Error('failed');
			err.status = 400;
			next(err);
		}
	} else {
		next();
	}
}); */

app.use('/api/trans', apiRouter);

/* app.use((err, req, res, next) => {
	if (err) {
		if (req.is('application/json')) {
			res.status(err.status || 500).send(err.message || 'Server Error, try again later');
		} else {
			res.render('500', {title: 'Internal Server Error | Capstone', error: err.message});
		}
	} else {
		next();
	}
}); */

/* app.use((req, res) => {
	
	if (req.is('application/json')) {
		res.status(404).send('Not Found');
	} else {
		res.render('404', {title: 'Page Not Found | Capstone', error: 'Sorry, an error has occured, Requested page not found!'});
	}
}); */

module.exports = app;
