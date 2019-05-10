import { takeLatest, call, put } from 'redux-saga/effects';
import { TransactionActionTypes, TransactionData } from './types';
import { AnyAction } from 'redux';
import { getTransactionList,
    createTransaction,
} from './api';
import { setTransactionListAction,
    addTransactionAction,
} from './actions';

function* retriveTransactionsList(action: AnyAction) {
    const transactionsList: TransactionData[] = yield call(getTransactionList);
    yield put(setTransactionListAction(transactionsList));
}

function* addTransaction(action: AnyAction) {
    const createATran = yield call(createTransaction, action.payload);
    yield put(addTransactionAction(createATran[0]));
}

export default function* saga() {
    yield takeLatest(TransactionActionTypes.RETRIVE_TRANSACTIONS_LIST, retriveTransactionsList);
    yield takeLatest(TransactionActionTypes.ADD_TRANSACTION_DB, addTransaction);
}
