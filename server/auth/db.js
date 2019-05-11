const mongoose = require('mongoose');

const config = require(`../config/config.production.js`); // eslint-disable-line import/no-dynamic-require

module.exports = () => {
	mongoose.connect(config.mongodburi, (err) => {
		if (err) {
			throw err;
		} else {
			console.log('connected to db');
		}
	});
};
