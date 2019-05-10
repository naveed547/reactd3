import * as React from 'react';
import { scaleOrdinal, scaleLinear } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';
import { line as d3Line, curveBasis } from 'd3-shape';
import { min, max, extent } from 'd3-array';
import { axisBottom, axisLeft } from 'd3-axis';
import { select } from 'd3-selection';

import appDefaults from 'Store/constants';

import {TransactionChartProps} from './TransactionChart.props';
// import {TransactionChartState} from './TransactionChart.state';

import './TransactionChart.scss';

class TransactionChart extends React.PureComponent<TransactionChartProps, any> {
	private svgWidth = 960;
	private svgHeight = 500;

	// Note: getting width and height from a variable rather than the elements attribute e.g. svg.attr("width")
	private margin = { top: 20, right: 80, bottom: 30, left: 50 };
	private width;
	private height;

	private x;
	private y;
	private z;
	private line;

	constructor(props) {
		super(props);
		this.width = this.svgWidth - this.margin.left - this.margin.right;
		this.height = this.svgHeight - this.margin.top - this.margin.bottom;

		this.x = scaleLinear().range([0, this.width]);
		this.y = scaleLinear().range([this.height, 0]);
		this.z = scaleOrdinal(schemeCategory10);
		this.line = d3Line()
		.curve(curveBasis)
		.x((d) => this.x(d.noOfTransaction))
		.y((d) => this.y(d.amount));
	}
	public render() {
		const payments = appDefaults.paymentList.map((payment) => {
			return {
				id: payment,
				values: [{amount: 0, noOfTransaction: 0}, ...this.props.transactionList
					.filter((tran) => tran.paymentMode === payment)
					.map((tran, index) => ({amount: tran.amount, noOfTransaction: (index + 1)}))],
			};
		});
		const data = [{noOfTransaction: 0}];
		appDefaults.paymentList.forEach((payment) => {
			data[0][payment] = 0;
		});
		payments.forEach((record) => {
			record.values.forEach((r, index) => {
				if (data[index + 1]) {
					data[index + 1][record.id] = r.amount;
				} else {
					data.push({
						noOfTransaction: (index + 1),
						[record.id]: r.amount,
					});
				}
			});
		});
		this.x.domain(extent(data, (d) => d.noOfTransaction));

		this.y.domain([
			min(payments, (c) => min(c.values, (d) => d.amount)),
			max(payments, (c) => max(c.values, (d) => d.amount)),
		]);

		this.z.domain(payments.map((c) => c.id));
		return (
			<svg width={this.svgWidth} height={this.svgHeight}>
				<g transform={`translate(${this.margin.left}, ${this.margin.top})`}>
					<g
						className="axis axis--x"
						transform={`translate(0, ${this.height})`}
						ref={(node) => select(node).call(axisBottom(this.x))}
					>
						<text x={this.svgWidth / 2} y="20" dy="0.71em" fill="#000">
							No of Transaction
						</text>
					</g>
					<g className="axis axis--y" ref={(node) => select(node).call(axisLeft(this.y))}>
						<text transform="rotate(-90)" x={-(this.svgHeight / 2)} y="-50" dy="0.71em" fill="#000">
							Amount
						</text>
					</g>
					{payments.map((payment) => {
						const [lastD] = payment.values.slice(-1);
						return (
							<g className="payment" key={payment.id}>
								<path
									className="line"
									d={this.line(payment.values)}
									style={{ stroke: this.z(payment.id) }}
								/>
								<text
									transform={`translate(${this.x(lastD.noOfTransaction)}, ${this.y(lastD.amount)})`}
									x={3}
									dy="0.35em"
									style={{ font: '10px sans-serif' }}
								>
									{payment.id}
								</text>
							</g>
						);
					})}
				</g>
			</svg>
		);
	}
}

export default TransactionChart;
