import { TransactionData, TransactionActionTypes, TransactionAppState } from "./types";

interface Action {
  type: string;
  payload: any;
}

export default function TransactionAppReducer(currState: TransactionAppState, action: Action) {
  switch (action.type) {
    case TransactionActionTypes.SET_TRANSACTION_LIST:
      return {...currState, ...{transactionList: action.payload}};
    case TransactionActionTypes.ADD_TRANSACTION:
      return {...currState, ...{transactionList: [...currState.transactionList, action.payload]}};
    default:
      return currState;
  }
}
