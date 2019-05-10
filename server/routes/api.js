const express = require('express');
const transactionController = require('../controllers/transaction');

const router = express.Router();
router.route('/')
	.get(transactionController.getAllTransactions) // Get all transactions
	.post(transactionController.createATransaction); // Create a transaction


module.exports = router;
