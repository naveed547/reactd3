const uuid = require('uuid');

const moment = require('moment');
const TransactionSchema = require('../modal/transaction.js');

const transactionUtils = {
	getData: () => TransactionSchema.find({}, {
		__id: 0,
	}),
	getById: paramId => TransactionSchema.find({ transactionId: paramId }),
	createItem: (reqBody) => {
		const newTransaction = {
			transactionId: `trans${uuid.v4()}`.replace(/-/g, ''),
			createdAt: new Date().toISOString(),
			...reqBody,
		};
		return TransactionSchema.create(newTransaction);
	},
};

module.exports = transactionUtils;
