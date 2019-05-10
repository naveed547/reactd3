export enum TransactionActionTypes {
  ADD_TRANSACTION = '@@types/ADD_TRANSACTION',
  ADD_TRANSACTION_DB = '@@types/ADD_TRANSACTION_DB',
  RETRIVE_TRANSACTIONS_LIST = '@@types/RETRIVE_TRANSACTIONS_LIST',
  SET_TRANSACTION_LIST = '@@types/SET_TRANSACTION_LIST',
}

export interface TransactionData {
  amount: String;
  createdAt: Date;
  paymentMode: {type: String, enum: ['American Express', 'VISA', 'DBS PayLa']};
  transactionId: { type: String, unique: true };
  userName: {type: String, enum: ['USER - A', 'USER - B', 'USER - C']};
}

export interface TransactionAppState {
  paymentList: string[];
  userList: string[];
  transactionList: TransactionData[];
}
