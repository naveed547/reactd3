import * as React from 'react';
import { v4 as uuid } from 'uuid';

import {TransactionTableProps} from './TransactionTable.props';
// import {TransactionTableState} from './TransactionTable.state';

import './TransactionTable.scss';

const TransactionTable = (props: TransactionTableProps) => {
    return (
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
				{props.transactionList.map((transaction, index) => {
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
		);
};

export default TransactionTable;
