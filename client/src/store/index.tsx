import { applyMiddleware, createStore, Reducer } from "redux";
import createSagaMiddleware from "redux-saga";
import TransactionAppReducer from "./reducer";
import sagas from "./saga";
import { TransactionAppState } from "./types";
import appDefaults from './constants';

const initialState: TransactionAppState = {
    paymentList: appDefaults.paymentList,
    userList: appDefaults.userList,
    transactionList: [],
};

const sagaMiddleware = createSagaMiddleware();
const store = createStore((TransactionAppReducer as Reducer<TransactionAppState>), initialState, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas);
export default store;
