import { TransactionData } from '../../store/types';
export interface TransactionContainerProps {
    transactionList?: TransactionData[];
    retriveTransactionsList?: any;
    addTransactionToList?: any;
    addTransactionToDB?: any;
    userList: string[];
    paymentList: string[];
}
