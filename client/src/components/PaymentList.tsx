import * as React from 'react';
interface PaymentListProps {
    paymentList: string[];
}
const PaymentList = (props: PaymentListProps) => {
    return props.paymentList.map((payment, index) => {
        return (
            <div key={payment} className="form-check">
                <input type="radio" className="form-check-input" name="paymentMode" value={payment} id={'paymentid' + index} required={true} />
                <label className="form-check-label" htmlFor={'paymentid' + index}>
                    {payment}
                </label>
            </div>
        );
    });
};

export default PaymentList;
