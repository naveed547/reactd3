import { action } from 'typesafe-actions';
import { TransactionActionTypes, TransactionData } from './types';

export const addTransactionAction = (transactionData: TransactionData) => action(TransactionActionTypes.ADD_TRANSACTION, {...transactionData});

export const retriveTransactionsListAction = () => action(TransactionActionTypes.RETRIVE_TRANSACTIONS_LIST);
export const setTransactionListAction = (transactionList: TransactionData[]) => action(TransactionActionTypes.SET_TRANSACTION_LIST, transactionList);
export const addTransactionActionDB = (transactionData: TransactionData) => action(TransactionActionTypes.ADD_TRANSACTION_DB, {...transactionData});
