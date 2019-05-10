
import { Loader } from "Components/Loader";
import TransactionForm from "Components/TransactionForm";
import TransactionTable from "Components/TransactionTable";
import TransactionChart from "Components/TransactionChart";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  addTransactionActionDB,
  addTransactionAction,
  retriveTransactionsListAction,
} from "../../store/actions";

import { TransactionAppState, TransactionData } from "../../store/types";

import "./style.scss";

import { TransactionContainerProps } from './TransactionContainer.props';
import { TransactionContainerState } from './TransactionContainer.state';

export class TransactionContainer extends React.Component<TransactionContainerProps, TransactionContainerState> {
  constructor(props) {
    super(props);
    this.state = {
      showLoader: false,
    };
    this.addATransaction = this.addATransaction.bind(this);
  }
  public async addATransaction(transactionData: TransactionData) {
    await this.props.addTransactionToList(transactionData);
    this.props.addTransactionToDB(transactionData);
  }
  public async componentDidMount() {
    if (!this.props.transactionList.length) {
      this.setState({
        showLoader: true,
      });
      await this.props.retriveTransactionsList();
      this.setState({
        showLoader: false,
      });
    }
  }
  public render() {
    return (
      <div className="container">
        <section className="boards-container">
          {this.props.userList && this.props.userList.length && this.props.paymentList.length && (
            <TransactionForm userList={this.props.userList} paymentList={this.props.paymentList} addToList={this.addATransaction} />
          )}
          {this.props.transactionList && this.props.transactionList.length && !this.state.showLoader ? (
            <div className="transaction-container">
              <TransactionTable transactionList={this.props.transactionList} />
              <TransactionChart transactionList={this.props.transactionList} />
            </div>
          ) : <Loader />}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state: TransactionAppState) => ({
  transactionList: state.transactionList,
  userList: state.userList,
  paymentList: state.paymentList,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  retriveTransactionsList: () => dispatch(retriveTransactionsListAction()),
  addTransactionToDB: (transactionData: TransactionData) => dispatch(addTransactionActionDB(transactionData)),
  addTransactionToList: (transactionData: TransactionData) => dispatch(addTransactionAction(transactionData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TransactionContainer);
