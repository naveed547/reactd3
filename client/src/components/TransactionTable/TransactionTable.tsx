import * as React from 'react';
import { v4 as uuid } from 'uuid';
import Pagination from '../Pagination';

import {TransactionTableProps} from './TransactionTable.props';
import {TransactionTableState} from './TransactionTable.state';

import './TransactionTable.scss';

class TransactionTable extends React.PureComponent<TransactionTableProps, TransactionTableState> {
	constructor(props) {
		super(props);
		this.state = {
            pageOfItems: [],
        };
		this.onChangePage = this.onChangePage.bind(this);
	}
	public onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems });
	}
	public render() {
		return (
			<React.Fragment>
				<div className="table">
					<div className="table-header">
						<div className="table-row">
							<div>Transaction ID</div>
							<div>User Name</div>
							<div>Payment Mode</div>
							<div>Amount</div>
						</div>
					</div>
					<div className="table-body">
						{this.state.pageOfItems.map((transaction, index) => {
								return transaction.transactionId && (
									<div key={`trans${uuid()}`.replace(/-/g, '')} className="table-row">
										<div className="row-cell transaction-id">
											{transaction.transactionId}
										</div>
										<div className="row-cell user-name">
											{transaction.userName}
										</div>
										<div className="row-cell payment-mode">
											{transaction.paymentMode}
										</div>
										<div className="row-cell amount">
											{transaction.amount}
										</div>
									</div>
								);
						})}
					</div>
				</div>
				<Pagination items={this.props.transactionList} onChangePage={this.onChangePage} />
			</React.Fragment>
		);
	}
}

export default TransactionTable;
