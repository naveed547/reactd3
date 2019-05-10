const mongoose = require('mongoose');


const transactionSchema = mongoose.Schema({
	userName: {type: String, enum: ['USER - A', 'USER - B', 'USER - C']},
	transactionId: { type: String, unique: true },
	amount: String,
	createdAt: Date,
	paymentMode: {type: String, enum: ['American Express', 'VISA', 'DBS PayLa']},
});

const transactionModel = mongoose.model('transaction', transactionSchema, 'transaction');

module.exports = transactionModel;
