const transactionUtils = require('../utils/transaction');

const transactionController = {
	getAllTransactions: async (req, res, next) => {
		try {
			let response = await transactionUtils.getData();
			res.set('Content-Type', 'application/json');
			res.status(200).send(response);
		} catch (e) {
			next(e);
		}
	},
	createATransaction: async (req, res, next) => {
		try {
			const newTransaction = await transactionUtils.createItem(req.body);
			delete newTransaction._id;
			delete newTransaction.__v;
			res.set('Content-Type', 'application/json');
			res.status(201).send(newTransaction);
		} catch (e) {
			next(e);
		}
	},
};

module.exports = transactionController;
