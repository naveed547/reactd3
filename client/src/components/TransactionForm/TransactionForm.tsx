import * as React from 'react';

import { v4 as uuid } from 'uuid';

import {TransactionFormProps} from './TransactionForm.props';
// import {TransactionFormState} from './TransactionForm.state';
import PaymentList from 'Components/PaymentList';
import UserList from 'Components/UserList';
import './TransactionForm.scss';
import appDefaults from 'Store/constants';
import { element } from 'prop-types';

class TransactionForm extends React.PureComponent<TransactionFormProps, any> {
	constructor(props) {
		super(props);
		this.formSubmitCallback = this.formSubmitCallback.bind(this);
	}
	public formSubmitCallback(event) {
			event.preventDefault();
			const element = (event.target as HTMLFormElement);
			if (element.amount.value > 0 && element.amount.value <= appDefaults.maxTransAmount) {
				this.props.addToList({
					userName: element.userName.value,
					transactionId: `trans${uuid()}`.replace(/-/g, ''),
					paymentMode: element.paymentMode.value,
					amount: element.amount.value,
				});
				this.formReset(element);
			} else {
				alert(`Amount should be less than ${appDefaults.maxTransAmount}`);
			}
	}
	public render() {
		return (
			<React.Fragment>
				<div className="transaction-form">
					<form onSubmit={this.formSubmitCallback}>
						{this.props.userList && (
							<div className="userlist-container">
								<UserList userList={this.props.userList} />
							</div>
						)}
						{this.props.paymentList && (
							<div className="paymentlist-container">
								<PaymentList paymentList={this.props.paymentList} />
							</div>
						)}
						<div className="amount-container">
							<input type="text" id="amount" maxLength={5} className="form-control" required={true} name="amount" pattern="^[0-9\s]+$" />
							<small className="form-text text-muted">
								***Maximum Allowed amount is {appDefaults.maxTransAmount} INR
							</small>
						</div>
						<div className="btn-container">
							<input type="submit" className="btn btn-primary" value="Transfer" />
						</div>
					</form>
				</div>
			</React.Fragment>
		);
	}
	public formReset(ele) {
		ele.reset();
		jQuery(".userlist-container .btn").removeClass('active');
		window.scrollTo(0, jQuery(".transaction-container").offset().top - 40);
	}
}

export default TransactionForm;
